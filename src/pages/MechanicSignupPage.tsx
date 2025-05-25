import { useState } from 'react';
import { Check } from 'lucide-react';

const MechanicSignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    specialties: [] as string[],
    vehicleExpertise: [] as string[],
    serviceAreas: '',
    hasOwnTools: false,
    idUpload: '',
    certificationUpload: '',
    agreeToTerms: false
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
  
  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData({
      ...formData,
      specialties: checked
        ? [...formData.specialties, value]
        : formData.specialties.filter(specialty => specialty !== value)
    });
  };
  
  const handleVehicleExpertiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData({
      ...formData,
      vehicleExpertise: checked
        ? [...formData.vehicleExpertise, value]
        : formData.vehicleExpertise.filter(type => type !== value)
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // In a real app, this would send data to a server
    // For demo, just show success message
    setIsSubmitted(true);
    
    // Store application in localStorage
    const applications = JSON.parse(localStorage.getItem('mechanicApplications') || '[]');
    applications.push({
      ...formData,
      id: `app-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    });
    localStorage.setItem('mechanicApplications', JSON.stringify(applications));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Join DriveSync as a Mechanic</h1>
          <p className="text-xl max-w-2xl">
            Use your skills to earn money on your own schedule. No platform fees, direct client connections.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Benefits Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Why Join DriveSync?</h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-black flex items-center justify-center">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">No Platform Fees</h3>
                    <p className="text-gray-600">Keep 100% of what you earn for your services.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-black flex items-center justify-center">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Flexible Schedule</h3>
                    <p className="text-gray-600">Work when you want. Accept only the jobs that fit your schedule.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-black flex items-center justify-center">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Build Your Reputation</h3>
                    <p className="text-gray-600">Gain ratings and reviews to stand out and attract more clients.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-black flex items-center justify-center">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Steady Work</h3>
                    <p className="text-gray-600">Access a growing customer base needing regular vehicle services.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Average Earnings</h3>
                <p className="text-gray-600 mb-1">Mechanics on DriveSync earn:</p>
                <p className="text-lg font-bold">₱2,000 - ₱3,500 per service</p>
              </div>
            </div>
          </div>
          
          {/* Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="mt-6 text-2xl font-bold text-gray-900">Application Submitted!</h2>
                  <p className="mt-2 text-gray-600">
                    Thank you for applying to join DriveSync as a mechanic. We'll review your application and contact you within 2-3 business days.
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
                <>
                  <h2 className="text-2xl font-bold mb-6">Mechanic Application Form</h2>
                  
                  <form onSubmit={handleSubmit}>
                    {/* Personal Information */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Professional Experience */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4">Professional Experience</h3>
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                          <select
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                          >
                            <option value="">Select Experience</option>
                            <option value="1-2">1-2 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="5-10">5-10 years</option>
                            <option value="10+">10+ years</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Specialties</label>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="engine"
                                name="specialties"
                                value="engine"
                                checked={formData.specialties.includes('engine')}
                                onChange={handleSpecialtyChange}
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                              />
                              <label htmlFor="engine" className="ml-2 text-sm text-gray-700">Engine Repair</label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="electrical"
                                name="specialties"
                                value="electrical"
                                checked={formData.specialties.includes('electrical')}
                                onChange={handleSpecialtyChange}
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                              />
                              <label htmlFor="electrical" className="ml-2 text-sm text-gray-700">Electrical Systems</label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="brakes"
                                name="specialties"
                                value="brakes"
                                checked={formData.specialties.includes('brakes')}
                                onChange={handleSpecialtyChange}
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                              />
                              <label htmlFor="brakes" className="ml-2 text-sm text-gray-700">Brake Systems</label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="tires"
                                name="specialties"
                                value="tires"
                                checked={formData.specialties.includes('tires')}
                                onChange={handleSpecialtyChange}
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                              />
                              <label htmlFor="tires" className="ml-2 text-sm text-gray-700">Tire Replacement</label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="diagnostics"
                                name="specialties"
                                value="diagnostics"
                                checked={formData.specialties.includes('diagnostics')}
                                onChange={handleSpecialtyChange}
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                              />
                              <label htmlFor="diagnostics" className="ml-2 text-sm text-gray-700">Diagnostics</label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="suspension"
                                name="specialties"
                                value="suspension"
                                checked={formData.specialties.includes('suspension')}
                                onChange={handleSpecialtyChange}
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                              />
                              <label htmlFor="suspension" className="ml-2 text-sm text-gray-700">Suspension</label>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Expertise</label>
                          <div className="flex space-x-6">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="motorcycle"
                                name="vehicleExpertise"
                                value="motorcycle"
                                checked={formData.vehicleExpertise.includes('motorcycle')}
                                onChange={handleVehicleExpertiseChange}
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                              />
                              <label htmlFor="motorcycle" className="ml-2 text-sm text-gray-700">Motorcycle</label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="4-wheel"
                                name="vehicleExpertise"
                                value="4-wheel"
                                checked={formData.vehicleExpertise.includes('4-wheel')}
                                onChange={handleVehicleExpertiseChange}
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                              />
                              <label htmlFor="4-wheel" className="ml-2 text-sm text-gray-700">4-Wheel Vehicles</label>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Service Areas</label>
                          <textarea
                            name="serviceAreas"
                            value={formData.serviceAreas}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                            placeholder="Enter areas where you can provide service (e.g., Makati, Quezon City, etc.)"
                            rows={3}
                          ></textarea>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="hasOwnTools"
                            name="hasOwnTools"
                            checked={formData.hasOwnTools}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                          />
                          <label htmlFor="hasOwnTools" className="ml-2 text-sm text-gray-700">
                            I have my own tools and equipment for mobile repairs
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    {/* Document Upload */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4">Document Upload</h3>
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ID (Driver's License or Government ID)
                          </label>
                          <input
                            type="file"
                            name="idUpload"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                            accept="image/*,application/pdf"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Accepted formats: JPG, PNG, PDF (Max size: 5MB)
                          </p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Certifications or Training Documents
                          </label>
                          <input
                            type="file"
                            name="certificationUpload"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                            accept="image/*,application/pdf"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Accepted formats: JPG, PNG, PDF (Max size: 5MB)
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Terms and Conditions */}
                    <div className="mb-8">
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
                            I agree to the <a href="#" className="text-black underline">Terms and Conditions</a> and <a href="#" className="text-black underline">Privacy Policy</a>. I certify that all information provided is accurate and complete.
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                      disabled={!formData.agreeToTerms}
                    >
                      Submit Application
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MechanicSignupPage;