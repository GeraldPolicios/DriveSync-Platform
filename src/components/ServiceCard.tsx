import { Link } from 'react-router-dom';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const { id, name, description, price, requiresWorkshop, vehicleType, image } = service;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      {image && (
        <div className="h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{name}</h3>
          <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
            ₱{price.toLocaleString()}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {vehicleType !== 'both' ? (
            <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs">
              {vehicleType === 'motorcycle' ? 'Motorcycle Only' : '4-Wheel Only'}
            </span>
          ) : (
            <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs">
              All Vehicles
            </span>
          )}
          {requiresWorkshop && (
            <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs">
              Workshop Required
            </span>
          )}
        </div>
        <Link
          to={`/book?service=${id}`}
          className="block w-full bg-black text-white text-center py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;