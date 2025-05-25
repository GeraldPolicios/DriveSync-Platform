import { Star } from 'lucide-react';
import { Mechanic } from '../types';
import { Link } from 'react-router-dom';

interface MechanicCardProps {
  mechanic: Mechanic;
}

const MechanicCard = ({ mechanic }: MechanicCardProps) => {
  const { id, name, image, specialty, rating, available, vehicleExpertise, experience } = mechanic;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {available ? 'Available' : 'Busy'}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-gray-600 mb-2">{specialty}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {vehicleExpertise.map((type) => (
            <span key={type} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs">
              {type === 'motorcycle' ? 'Motorcycle' : '4-Wheel'}
            </span>
          ))}
          <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs">
            {experience} years exp
          </span>
        </div>
        
        <div className="flex space-x-2">
          <Link
            to={`/book?mechanic=${id}`}
            className="flex-1 bg-black text-white text-center py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Book
          </Link>
          <Link
            to={`/map?mechanic=${id}`}
            className="flex-1 bg-gray-200 text-gray-800 text-center py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            View on Map
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MechanicCard;