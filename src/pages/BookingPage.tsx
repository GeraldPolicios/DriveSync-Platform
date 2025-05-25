import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, MapPin, AlertTriangle } from 'lucide-react';
import Map from '../components/Map';
import { useData } from '../context/DataContext';
import { Service, Mechanic } from '../types';

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const preSelectedServiceId = queryParams.get('service');
  const preSelectedMechanicId = queryParams.get('mechanic');
  const isEmergency = queryParams.get('emergency') === 'true';

  const { services, mechanics, addBooking, userLocation, setUserLocation } = useData();

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(null);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');
  const [vehicleType, setVehicleType] = useState<'motorcycle' | '4-wheel'>('4-wheel');
  const [urgent, setUrgent] = useState<boolean>(isEmergency);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // Filter services based on selected vehicle type
  const filteredServices = services.filter(service => 
    service.vehicleType === 'both' || service.vehicleType === vehicleType
  );

  // Filter mechanics based on selected service and vehicle type
  const filteredMechanics = mechanics.filter(mechanic => 
    mechanic.available && 
    mechanic.vehicleExpertise.includes(vehicleType) &&
    (!selectedService || mechanic.servicesOffered.includes(selectedService.id))
  );

  // Set default date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setBookingDate(today);

    // Set default time to next hour
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setBookingTime(`${hours}:${minutes}`);

    // Set pre-selected service if provided
    if (preSelectedServiceId) {
      const service = services.find(s => s.id === preSelectedServiceId);
      if (service) {
        setSelectedService(service);
        // Set vehicle type based on service
        if (service.vehicleType !== 'both') {
          setVehicleType(service.vehicleType);
        }
      }
    }

    // Set pre-selected mechanic if provided
    if (preSelectedMechanicId) {
      const mechanic = mechanics.find(m => m.id === preSelectedMechanicId);
      if (mechanic) {
        setSelectedMechanic(mechanic);
      }
    }

  }, [preSelectedServiceId, preSelectedMechanicId, services, mechanics]);

  // Get location
  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please enable location services.');
      }
    );
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !userLocation) {
      alert('Please select a service and provide your location.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Create booking object
    const newBooking = {
      id: `booking-${Date.now()}`,
      serviceId: selectedService.id,
      mechanicId: selectedMechanic?.id,
      date: bookingDate,
      time: bookingTime,
      location: userLocation,
      status: 'pending',
      urgent,
      vehicleType,
      totalCost: selectedService.price,
      createdAt: new Date().toISOString()
    };
    
    // Add booking to context/localStorage
    addBooking(newBooking);
    
    // Show success message
    setShowSuccess(true);
    
    // Reset form after 3 seconds and redirect to history
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(false);
      navigate('/history');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Book a Mechanic</h1>
          <p className="text-xl max-w-2xl">
            {urgent ? 
              'Request emergency assistance from our nearest available mechanic.' :
              'Schedule a service appointment at your preferred time and location.'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {showSuccess ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  <p className="font-bold">Booking Successful!</p>
                  <p>Your service has been booked successfully. Redirecting to your booking history...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {urgent && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-start">
                      <AlertTriangle className="mr-2 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-bold">Emergency Request</p>
                        <p>A mechanic will be dispatched to your location as soon as possible.</p>
                      </div>
                    </div>
                  )}

                  {/* Vehicle Type */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Type
                    </label>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setVehicleType('motorcycle')}
                        className={`px-6 py-3 rounded-md ${
                          vehicleType === 'motorcycle' 
                            ? 'bg-black text-white' 
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                      >
                        Motorcycle
                      </button>
                      <button
                        type="button"
                        onClick={() => setVehicleType('4-wheel')}
                        className={`px-6 py-3 rounded-md ${
                          vehicleType === '4-wheel' 
                            ? 'bg-black text-white' 
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                      >
                        4-Wheel Vehicle
                      </button>
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Service
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {filteredServices.map(service => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => setSelectedService(service)}
                          className={`p-4 border rounded-md text-left ${
                            selectedService?.id === service.id
                              ? 'border-black bg-gray-100'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-gray-600 mt-1">₱{service.price.toLocaleString()}</p>
                          {service.requiresWorkshop && (
                            <p className="text-xs text-red-600 mt-1">Requires workshop visit</p>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Your Location
                      </label>
                      <button
                        type="button"
                        onClick={handleGetLocation}
                        className="text-sm text-black hover:underline flex items-center"
                      >
                        <MapPin size={16} className="mr-1" />
                        Get Current Location
                      </button>
                    </div>
                    <div className="h-[200px] bg-gray-100 rounded-md mb-2 overflow-hidden">
                      <Map />
                    </div>
                    {userLocation ? (
                      <p className="text-sm text-green-600">
                        Location detected: {userLocation[0].toFixed(6)}, {userLocation[1].toFixed(6)}
                      </p>
                    ) : (
                      <p className="text-sm text-red-600">
                        Please enable location services to continue.
                      </p>
                    )}
                  </div>

                  {/* Date and Time Selection (only for non-urgent) */}
                  {!urgent && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <Calendar size={16} className="mr-1" />
                          Date
                        </label>
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <Clock size={16} className="mr-1" />
                          Time
                        </label>
                        <input
                          type="time"
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Mechanic Selection (optional) */}
                  {!urgent && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Mechanic (Optional)
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {filteredMechanics.length > 0 ? (
                          filteredMechanics.map(mechanic => (
                            <button
                              key={mechanic.id}
                              type="button"
                              onClick={() => setSelectedMechanic(mechanic)}
                              className={`p-4 border rounded-md text-left flex items-center ${
                                selectedMechanic?.id === mechanic.id
                                  ? 'border-black bg-gray-100'
                                  : 'border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              <img 
                                src={mechanic.image} 
                                alt={mechanic.name} 
                                className="w-12 h-12 rounded-full object-cover mr-3"
                              />
                              <div>
                                <p className="font-medium">{mechanic.name}</p>
                                <p className="text-sm text-gray-600">{mechanic.specialty}</p>
                                <p className="text-xs text-yellow-600">★ {mechanic.rating}</p>
                              </div>
                            </button>
                          ))
                        ) : (
                          <p className="text-sm text-gray-600 col-span-2">
                            No mechanics available for the selected service and vehicle type.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!selectedService || !userLocation || isSubmitting}
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Processing...' : urgent ? 'Request Emergency Assistance' : 'Book Service'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
              
              {selectedService ? (
                <div className="border-b pb-4 mb-4">
                  <p className="font-medium">{selectedService.name}</p>
                  <p className="text-gray-600 text-sm">{selectedService.description}</p>
                  <p className="font-bold mt-2">₱{selectedService.price.toLocaleString()}</p>
                </div>
              ) : (
                <p className="text-gray-600 mb-4">Please select a service</p>
              )}
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle Type:</span>
                  <span className="font-medium">{vehicleType === 'motorcycle' ? 'Motorcycle' : '4-Wheel Vehicle'}</span>
                </div>
                
                {selectedMechanic && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mechanic:</span>
                    <span className="font-medium">{selectedMechanic.name}</span>
                  </div>
                )}
                
                {!urgent && bookingDate && bookingTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Schedule:</span>
                    <span className="font-medium">{bookingDate} at {bookingTime}</span>
                  </div>
                )}
                
                {urgent && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Request Type:</span>
                    <span className="font-medium text-red-600">Emergency</span>
                  </div>
                )}
              </div>
              
              {selectedService && (
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>₱{selectedService.price.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Payment will be collected after service completion
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;