export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  requiresWorkshop: boolean;
  vehicleType: 'motorcycle' | '4-wheel' | 'both';
  image?: string;
}

export interface Mechanic {
  id: string;
  name: string;
  image: string;
  specialty: string;
  rating: number;
  available: boolean;
  location: [number, number];
  servicesOffered: string[];
  vehicleExpertise: ('motorcycle' | '4-wheel')[];
  experience: number;
}

export interface Booking {
  id: string;
  serviceId: string;
  mechanicId?: string;
  date: string;
  time: string;
  location: [number, number];
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  urgent: boolean;
  vehicleType: 'motorcycle' | '4-wheel';
  totalCost: number;
  createdAt: string;
}

export interface Workshop {
  id: string;
  name: string;
  location: string;
  contact: string;
  services: string[];
  verified: boolean;
}

export interface Review {
  id: string;
  mechanicId: string;
  bookingId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}