import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Shield, Wrench, Calendar } from 'lucide-react';
import Map from '../components/Map';
import { useData } from '../context/DataContext';

const HomePage = () => {
  const { services } = useData();
  const featuredServices = services.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="absolute inset-0 bg-gray-900 opacity-80">
          <img
            src="https://www.siaauto.ca/wp-content/uploads/2023/04/Cambridge-auto-mechanic-working-on-car-maintenance.jpg"
            alt="Mechanic working on car"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mobile Mechanics at Your Location
            </h1>
            <p className="text-xl mb-8">
              Professional vehicle repair and maintenance services that come to you. Fast, reliable, and transparent.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/book"
                className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
              >
                Book Now
              </Link>
              <Link
                to="/book?emergency=true"
                className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-colors"
              >
                Emergency Help
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose DriveSync?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg text-center transition-transform hover:scale-105">
              <div className="flex justify-center mb-4">
                <Map size={48} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2">GPS-Based Matching</h3>
              <p className="text-gray-600">
                Find the nearest available mechanic in real-time with our location-based system.
              </p>
            </div>
            <div className="p-6 bg-blue-100 rounded-lg text-center transition-transform hover:scale-105">
              <div className="flex justify-center mb-4">
                <Clock size={48} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2">On-Demand Service</h3>
              <p className="text-gray-600">
                Get help when and where you need it. Mechanics come to your location.
              </p>
            </div>
            <div className="p-6 bg-blue-100 rounded-lg text-center transition-transform hover:scale-105">
              <div className="flex justify-center mb-4">
                <Shield size={50} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
              <p className="text-gray-200">
                
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Our Services</h2>
            <Link
              to="/services"
              className="flex items-center text-black font-semibold hover:underline"
            >
              View All Services <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                {service.image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">₱{service.price.toLocaleString()}</span>
                    <Link
                      to={`/book?service=${service.id}`}
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Find Nearby Mechanics</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            Our interactive map shows you available mechanics near your location. Get connected with the right professional for your vehicle needs.
          </p>
          <Map />
          <div className="text-center mt-8">
            <Link
              to="/map"
              className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
            >
              Explore Full Map
            </Link>
          </div>
        </div>
      </section>

      {/* Join As Mechanic */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-black text-white rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-10">
                <h2 className="text-3xl font-bold mb-4">Join DriveSync as a Mechanic</h2>
                <p className="mb-6">
                  Are you a skilled mechanic looking for flexible work opportunities? Join our platform and connect with customers in your area.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Wrench size={20} className="mr-2" />
                    <span>No platform fees to join</span>
                  </li>
                  <li className="flex items-center">
                    <Calendar size={20} className="mr-2" />
                    <span>Flexible work schedule</span>
                  </li>
                  <li className="flex items-center">
                    <Star size={20} className="mr-2" />
                    <span>Build your reputation through reviews</span>
                  </li>
                </ul>
                <Link
                  to="/become-mechanic"
                  className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors inline-block"
                >
                  Apply Now
                </Link>
              </div>
              <div className="md:w-1/2 relative min-h-[300px]">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/814/814406.png"
                  alt="Mechanic working"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The mechanic arrived within 30 minutes of my request and fixed my car battery issue on the spot. Excellent service!"
              </p>
              <p className="font-bold">- Maria Garcia</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "I was stranded with a flat tire, and DriveSync sent a mechanic to my location quickly. Professional and affordable."
              </p>
              <p className="font-bold">- John Santos</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex mb-4">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-500 fill-yellow-500" />
                ))}
                <Star size={20} className="text-gray-300" />
              </div>
              <p className="text-gray-600 mb-4">
                "The app is so convenient. I scheduled regular maintenance for my motorcycle, and the mechanic came to my workplace."
              </p>
              <p className="font-bold">- Anna Reyes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book a mobile mechanic today and experience hassle-free vehicle maintenance and repair.
          </p>
          <Link
            to="/book"
            className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors inline-block"
          >
            Book a Service Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;