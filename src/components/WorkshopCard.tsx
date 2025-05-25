import { Workshop } from '../types';
import { CheckCircle, MapPin, Phone } from 'lucide-react';

interface WorkshopCardProps {
  workshop: Workshop;
}

const WorkshopCard = ({ workshop }: WorkshopCardProps) => {
  const { name, location, contact, verified } = workshop;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{name}</h3>
          {verified && (
            <div className="flex items-center text-green-600">
              <CheckCircle size={16} className="mr-1" />
              <span className="text-xs">Verified Partner</span>
            </div>
          )}
        </div>
        
        <div className="flex items-start space-x-2 mb-2">
          <MapPin size={18} className="text-gray-500 mt-1 flex-shrink-0" />
          <p className="text-gray-600">{location}</p>
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          <Phone size={18} className="text-gray-500 flex-shrink-0" />
          <p className="text-gray-600">{contact}</p>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <button className="flex-1 bg-black text-white text-center py-2 rounded-lg hover:bg-gray-800 transition-colors">
            Get Directions
          </button>
          <button className="flex-1 bg-gray-200 text-gray-800 text-center py-2 rounded-lg hover:bg-gray-300 transition-colors">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkshopCard;