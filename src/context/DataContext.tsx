import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Booking, Mechanic, Service, Review, Workshop } from '../types';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/localStorage';

interface DataContextType {
  services: Service[];
  mechanics: Mechanic[];
  bookings: Booking[];
  workshops: Workshop[];
  reviews: Review[];
  userLocation: [number, number] | null;
  addBooking: (booking: Booking) => void;
  addReview: (review: Review) => void;
  setUserLocation: (location: [number, number] | null) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Load data from localStorage
    setServices(getLocalStorageItem('services') || []);
    setMechanics(getLocalStorageItem('mechanics') || []);
    setBookings(getLocalStorageItem('bookings') || []);
    setWorkshops(getLocalStorageItem('workshops') || []);
    setReviews(getLocalStorageItem('reviews') || []);
  }, []);

  const addBooking = (booking: Booking) => {
    const updatedBookings = [...bookings, booking];
    setBookings(updatedBookings);
    setLocalStorageItem('bookings', updatedBookings);
  };

  const addReview = (review: Review) => {
    const updatedReviews = [...reviews, review];
    setReviews(updatedReviews);
    setLocalStorageItem('reviews', updatedReviews);
  };

  const value = {
    services,
    mechanics,
    bookings,
    workshops,
    reviews,
    userLocation,
    addBooking,
    addReview,
    setUserLocation,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};