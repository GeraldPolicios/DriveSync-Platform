import { useState } from 'react';
import MechanicCard from '../components/MechanicCard';
import { useData } from '../context/DataContext';
import { Search, Filter } from 'lucide-react';

const MechanicsPage = () => {
  const { mechanics } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState<'all' | 'motorcycle' | '4-wheel'>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'busy'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'experience'>('rating');
  
  // Filter and sort mechanics based on selected filters
  const filteredMechanics = mechanics
    .filter(mechanic => {
      // Search filter
      if (searchTerm && !mechanic.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !mechanic.specialty.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Vehicle type filter
      if (vehicleFilter !== 'all' && !mechanic.vehicleExpertise.includes(vehicleFilter)) {
        return false;
      }
      
      // Availability filter
      if (availabilityFilter === 'available' && !mechanic.available) {
        return false;
      } else if (availabilityFilter === 'busy' && mechanic.available) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by selected criteria
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else {
        return b.experience - a.experience;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Mechanics</h1>
          <p className="text-xl max-w-2xl">
            Meet our certified mechanics ready to help with your vehicle needs. Browse, filter, and book directly.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or specialty"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 md:w-2/3">
              {/* Filters */}
              <div className="flex items-center space-x-2 w-full md:w-auto">
                <Filter size={18} className="text-gray-400" />
                <select
                  value={vehicleFilter}
                  onChange={(e) => setVehicleFilter(e.target.value as 'all' | 'motorcycle' | '4-wheel')}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                >
                  <option value="all">All Vehicles</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="4-wheel">4-Wheel</option>
                </select>
              </div>
              
              <div className="w-full md:w-auto">
                <select
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value as 'all' | 'available' | 'busy')}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                >
                  <option value="all">All Availability</option>
                  <option value="available">Available Now</option>
                  <option value="busy">Busy</option>
                </select>
              </div>
              
              <div className="w-full md:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'rating' | 'experience')}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="experience">Sort by Experience</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Mechanics Grid */}
        {filteredMechanics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMechanics.map(mechanic => (
              <MechanicCard key={mechanic.id} mechanic={mechanic} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No mechanics match your current filters.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setVehicleFilter('all');
                setAvailabilityFilter('all');
              }}
              className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Become a Mechanic CTA */}
      <div className="bg-black text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mechanic Network</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Are you a skilled mechanic? Join DriveSync and connect with customers in your area.
          </p>
          <a
            href="/become-mechanic"
            className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors inline-block"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default MechanicsPage;