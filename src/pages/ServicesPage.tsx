import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import { useData } from '../context/DataContext';

const ServicesPage = () => {
  const { services } = useData();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-black text-white py-16">
        <div className="absolute inset-0 bg-black">
          <img
            src="https://www.siaauto.ca/wp-content/uploads/2023/04/Cambridge-auto-mechanic-working-on-car-maintenance.jpg"
            alt="Vehicle service background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl max-w-2xl">
            Professional vehicle maintenance and repair services at your location. Choose from our range of services below.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-16 bg-black text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Emergency Assistance?</h2>
          <p className="mb-6">
            Get immediate help from our nearest available mechanic.
          </p>
          <Link
            to="/book?emergency=true"
            className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors inline-block"
          >
            Request Emergency Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;