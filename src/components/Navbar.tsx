import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="flex items-center space-x-2 text-xl font-bold">
            <img 
              src="https://i.imgur.com/2LMVjap.png" 
              alt="DriveSync Logo" 
              className="w-16 h-16"
            />
            <span>DriveSync</span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" className="hover:text-gray-300 transition-colors">
              Home
            </NavLink>
            <NavLink to="/services" className="hover:text-gray-300 transition-colors">
              Services
            </NavLink>
            <NavLink to="/book" className="hover:text-gray-300 transition-colors">
              Book Now
            </NavLink>
            <NavLink to="/mechanics" className="hover:text-gray-300 transition-colors">
              Mechanics
            </NavLink>
            <NavLink to="/partners" className="hover:text-gray-300 transition-colors">
              Partners
            </NavLink>
            <NavLink to="/history" className="hover:text-gray-300 transition-colors">
              History
            </NavLink>
            <NavLink to="/contact" className="hover:text-gray-300 transition-colors">
              Contact
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col space-y-4">
            <NavLink to="/" className="hover:text-gray-300 transition-colors" onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/services" className="hover:text-gray-300 transition-colors" onClick={closeMenu}>
              Services
            </NavLink>
            <NavLink to="/book" className="hover:text-gray-300 transition-colors" onClick={closeMenu}>
              Book Now
            </NavLink>
            <NavLink to="/mechanics" className="hover:text-gray-300 transition-colors" onClick={closeMenu}>
              Mechanics
            </NavLink>
            <NavLink to="/partners" className="hover:text-gray-300 transition-colors" onClick={closeMenu}>
              Partners
            </NavLink>
            <NavLink to="/history" className="hover:text-gray-300 transition-colors" onClick={closeMenu}>
              History
            </NavLink>
            <NavLink to="/contact" className="hover:text-gray-300 transition-colors" onClick={closeMenu}>
              Contact
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;