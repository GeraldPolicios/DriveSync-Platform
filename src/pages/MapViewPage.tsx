import { useState } from 'react';
import Map from '../components/Map';
import { Filter } from 'lucide-react';

const MapViewPage = () => {
  const [vehicleType, setVehicleType] = useState<'motorcycle' | '4-wheel' | undefined>();
  const [serviceFilter, setServiceFilter] = useState<string>('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-black text-white py-16">
        <div className="absolute inset-0 bg-black">
          <img
            src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg"
            alt="Vehicle service background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold mb-4">Find Nearby Mechanics</h1>
          <p className="text-xl max-w-2xl">
            Locate available mechanics in your area and book services directly from the map.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-gray-400" />
              <span className="text-gray-700 font-medium">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <select
                value={vehicleType || ''}
                onChange={(e) => setVehicleType(e.target.value as 'motorcycle' | '4-wheel' | undefined)}
                className="p-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              >
                <option value="">All Vehicles</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="4-wheel">4-Wheel Vehicle</option>
              </select>
              
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              >
                <option value="">All Services</option>
                <option value="oil-change">Oil Change</option>
                <option value="tire-repair">Tire Repair</option>
                <option value="battery">Battery Service</option>
                <option value="emergency">Emergency Repair</option>
              </select>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="sticky top-24 h-[600px] bg-white rounded-lg shadow-md overflow-hidden">
          <Map
            selectedVehicleType={vehicleType}
            serviceFilter={serviceFilter}
            className="z-20"
          />
        </div>

        {/* Legend */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Map Legend</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              <span>Your Location</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full"></div>
              <span>Available Mechanics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapViewPage;