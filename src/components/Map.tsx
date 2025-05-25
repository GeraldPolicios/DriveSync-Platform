import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useData } from '../context/DataContext';
import { Mechanic } from '../types';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

// Create custom icons
const userIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const mechanicIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to recenter map when user location changes
const MapController = () => {
  const { userLocation } = useData();
  const map = useMap();
  
  useEffect(() => {
    if (userLocation) {
      map.flyTo(userLocation, 14);
    }
  }, [userLocation, map]);
  
  return null;
};

interface MapProps {
  highlightedMechanicId?: string;
  selectedVehicleType?: 'motorcycle' | '4-wheel';
  serviceFilter?: string;
  className?: string;
}

const Map = ({ highlightedMechanicId, selectedVehicleType, serviceFilter, className = '' }: MapProps) => {
  const navigate = useNavigate();
  const { mechanics, userLocation, setUserLocation } = useData();
  const [filteredMechanics, setFilteredMechanics] = useState<Mechanic[]>([]);
  const defaultLocation: [number, number] = [14.55027, 121.03269]; // Manila, Philippines
  
  useEffect(() => {
    // Request user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, [setUserLocation]);
  
  useEffect(() => {
    let filtered = [...mechanics];
    
    // Filter by vehicle type
    if (selectedVehicleType) {
      filtered = filtered.filter(mechanic => 
        mechanic.vehicleExpertise.includes(selectedVehicleType)
      );
    }
    
    // Filter by service
    if (serviceFilter) {
      filtered = filtered.filter(mechanic => 
        mechanic.servicesOffered.includes(serviceFilter)
      );
    }
    
    setFilteredMechanics(filtered);
  }, [mechanics, selectedVehicleType, serviceFilter]);

  const handleBookNow = (mechanicId: string) => {
    navigate(`/book?mechanic=${mechanicId}`);
  };

  return (
    <div className={`relative w-full h-full rounded-lg overflow-hidden shadow-md ${className}`}>
      <MapContainer 
        center={userLocation || defaultLocation} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        className="z-10"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapController />
        
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <div className="text-center">
                <strong>Your Location</strong>
              </div>
            </Popup>
          </Marker>
        )}
        
        {filteredMechanics.map(mechanic => (
          <Marker 
            key={mechanic.id} 
            position={mechanic.location} 
            icon={mechanicIcon}
          >
            <Popup>
              <div className="text-center">
                <strong>{mechanic.name}</strong>
                <p>{mechanic.specialty}</p>
                <p>Rating: {mechanic.rating}/5</p>
                <p className={mechanic.available ? 'text-green-600' : 'text-red-600'}>
                  {mechanic.available ? 'Available' : 'Busy'}
                </p>
                <button 
                  className="mt-2 bg-black text-white px-3 py-1 rounded-md text-sm"
                  onClick={() => handleBookNow(mechanic.id)}
                >
                  Book Now
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;