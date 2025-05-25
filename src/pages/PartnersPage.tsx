import { useState } from 'react';
import WorkshopCard from '../components/WorkshopCard';
import { useData } from '../context/DataContext';
import { MapPin, Phone, Mail, Check } from 'lucide-react';

const PartnersPage = () => {
  const { workshops } = useData();
  const [formData, setFormData] = useState({
    shopName: '',
    location: '',
    contact: '',
    email: '',
    services: [] as string[],
    agreeToTerms: false
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };
  
  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData({
      ...formData,
      services: checked
        ? [...formData.services, value]
        : formData.services.filter(service => service !== value)
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // In a real app, this would send data to a server
    // For demo, just show success message
    setIsSubmitted(true);
    
    // Store application in localStorage
    const applications = JSON.parse(localStorage.getItem('partnerApplications') || '[]');
    applications.push({
      ...formData,
      id: `app-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    });
    localStorage.setItem('partnerApplications', JSON.stringify(applications));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Partner Workshops</h1>
          <p className="text-xl max-w-2xl">
            Our network of certified partner workshops for services that require specialized equipment.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Partner Workshops */}
        <h2 className="text-3xl font-bold mb-8">Certified Partner Workshops</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {workshops.map(workshop => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>

        {/* Partner Program Info */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-10">
              <h2 className="text-3xl font-bold mb-4">Partner Subscription Program</h2>
              <p className="mb-6 text-gray-600">
                Join our network of verified workshops and get direct referrals from DriveSync customers needing specialized repairs.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-black flex items-center justify-center mt-1">
                    <Check size={14} className="text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">Direct customer referrals for complex repairs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-black flex items-center justify-center mt-1">
                    <Check size={14} className="text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">Verified partner badge on your listing</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-black flex items-center justify-center mt-1">
                    <Check size={14} className="text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">Priority placement in workshop search results</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg inline-block">
                <p className="text-lg font-bold">₱3,500/month subscription</p>
              </div>
            </div>
            <div className="md:w-1/2 relative min-h-[300px]">
              <img
                src="https://media.istockphoto.com/id/1031459078/vector/automobile-repair-and-mechanics-vector-illustration.jpg?s=612x612&w=0&k=20&c=_kxCblSl8qJknZvMf3HZSpNlRgpT9Qh_yrqKuhNX9kE="
                alt="Auto repair shop"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Workshop Application Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Subscribe Your Workshop</h2>
          
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-gray-900">Application Submitted!</h2>
              <p className="mt-2 text-gray-600">
                Thank you for applying to join our partner network. We'll review your application and contact you within 2-3 business days.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-8 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Workshop Name
                  </label>
                  <input
                    type="text"
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin size={18} className="text-gray-400" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Workshop Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                      placeholder="Full address"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Phone size={18} className="text-gray-400" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services Offered
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="engine"
                      name="services"
                      value="engine"
                      checked={formData.services.includes('engine')}
                      onChange={handleServiceChange}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="engine" className="ml-2 text-sm text-gray-700">Engine Repair</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="electrical"
                      name="services"
                      value="electrical"
                      checked={formData.services.includes('electrical')}
                      onChange={handleServiceChange}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="electrical" className="ml-2 text-sm text-gray-700">Electrical Systems</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="brakes"
                      name="services"
                      value="brakes"
                      checked={formData.services.includes('brakes')}
                      onChange={handleServiceChange}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="brakes" className="ml-2 text-sm text-gray-700">Brake Systems</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="tires"
                      name="services"
                      value="tires"
                      checked={formData.services.includes('tires')}
                      onChange={handleServiceChange}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="tires" className="ml-2 text-sm text-gray-700">Tire Replacement</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="diagnostics"
                      name="services"
                      value="diagnostics"
                      checked={formData.services.includes('diagnostics')}
                      onChange={handleServiceChange}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="diagnostics" className="ml-2 text-sm text-gray-700">Diagnostics</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="suspension"
                      name="services"
                      value="suspension"
                      checked={formData.services.includes('suspension')}
                      onChange={handleServiceChange}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="suspension" className="ml-2 text-sm text-gray-700">Suspension</label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={handleCheckboxChange}
                      required
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeToTerms" className="text-gray-700">
                      I agree to the <a href="#" className="text-black underline">Terms and Conditions</a>. I understand there is a ₱3,500/month subscription fee for this program.
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                  disabled={!formData.agreeToTerms}
                >
                  Submit Application
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;