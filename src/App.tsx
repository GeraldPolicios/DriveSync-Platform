import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import MechanicSignupPage from './pages/MechanicSignupPage';
import MechanicsPage from './pages/MechanicsPage';
import PartnersPage from './pages/PartnersPage';
import HistoryPage from './pages/HistoryPage';
import ContactPage from './pages/ContactPage';
import MapViewPage from './pages/MapViewPage';
import { useEffect } from 'react';
import { initializeData } from './utils/dataUtils';

function App() {
  useEffect(() => {
    // Initialize local storage data if not present
    initializeData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/become-mechanic" element={<MechanicSignupPage />} />
          <Route path="/mechanics" element={<MechanicsPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/map" element={<MapViewPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;