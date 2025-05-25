import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactMessage } from '../types';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      ...formData,
      date: new Date().toISOString()
    };
    
    // Store message in localStorage
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));
    
    // Show success message
    setIsSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-black text-white py-16">
        <div className="absolute inset-0 bg-black">
          <img
            src="https://images.pexels.com/photos/3807811/pexels-photo-3807811.jpeg"
            alt="Vehicle service background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-2xl">
            Have questions or feedback? We're here to help. Reach out to our team.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin size={24} className="text-black mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="font-semibold">Office Address</h3>
                  <p className="text-gray-600">2232 Roxas Boulevard, Barangay 13, Zone 4, Pasay City, Metro Manila.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone size={24} className="text-black mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">+63 912 345 6789</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail size={24} className="text-black mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">support@drivesync.com</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Business Hours</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-semibold">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-semibold">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-semibold">Closed</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  * Emergency services available 24/7
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
                  Your message has been sent successfully! We'll get back to you soon.
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;