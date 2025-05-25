import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Star, Calendar, Clock, MapPin } from 'lucide-react';

const HistoryPage = () => {
  const { bookings, services, mechanics, addReview } = useData();
  const [sortBy, setSortBy] = useState<'date' | 'service'>('date');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // Sort bookings based on selected criteria
  const sortedBookings = [...bookings].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      const serviceA = services.find(s => s.id === a.serviceId)?.name || '';
      const serviceB = services.find(s => s.id === b.serviceId)?.name || '';
      return serviceA.localeCompare(serviceB);
    }
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBooking) {
      const newReview = {
        id: `review-${Date.now()}`,
        bookingId: selectedBooking,
        mechanicId: bookings.find(b => b.id === selectedBooking)?.mechanicId || '',
        rating,
        comment,
        date: new Date().toISOString()
      };
      addReview(newReview);
      setShowReviewModal(false);
      setSelectedBooking(null);
      setRating(5);
      setComment('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-black text-white py-16">
        <div className="absolute inset-0 bg-black">
          <img
            src="https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg"
            alt="Vehicle service background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold mb-4">Service History</h1>
          <p className="text-xl max-w-2xl">
            View your past bookings and manage your vehicle maintenance records.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Sort Controls */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'service')}
              className="p-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
            >
              <option value="date">Date</option>
              <option value="service">Service Type</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        {sortedBookings.length > 0 ? (
          <div className="space-y-6">
            {sortedBookings.map(booking => {
              const service = services.find(s => s.id === booking.serviceId);
              const mechanic = mechanics.find(m => m.id === booking.mechanicId);

              return (
                <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{service?.name}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <Calendar size={16} className="mr-2" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                          <Clock size={16} className="ml-4 mr-2" />
                          <span>{booking.time}</span>
                        </div>
                        {mechanic && (
                          <p className="text-gray-600">Mechanic: {mechanic.name}</p>
                        )}
                        <div className="flex items-center text-gray-600">
                          <MapPin size={16} className="mr-2" />
                          <span>
                            Location: {booking.location[0].toFixed(6)}, {booking.location[1].toFixed(6)}
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Vehicle Type: {booking.vehicleType === 'motorcycle' ? 'Motorcycle' : '4-Wheel Vehicle'}
                        </p>
                        <p className="font-semibold">
                          Total Cost: ₱{booking.totalCost.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      {booking.status === 'completed' && !booking.mechanicId && (
                        <button
                          onClick={() => {
                            setSelectedBooking(booking.id);
                            setShowReviewModal(true);
                          }}
                          className="mt-2 block w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                        >
                          Leave Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">No service history found.</p>
            <p className="text-gray-500 mb-8">Book your first service to start building your maintenance history.</p>
            <a
              href="/book"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Book a Service
            </a>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        size={24}
                        className={star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  rows={4}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;