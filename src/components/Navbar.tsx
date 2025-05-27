import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../../logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          {/* <Plant className="h-8 w-8 text-green-600"  */}
          <img src={logo} alt="Logo Yura Vision" className="h-8 w-8 object-contain" />

          <span className={`font-bold text-xl ${isScrolled ? 'text-green-700' : 'text-green-700'}`}>Yura Vision</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#como-funciona" className="font-medium hover:text-green-600 transition-colors">¿Cómo Funciona?</a>
          <a href="#tratamientos" className="font-medium hover:text-green-600 transition-colors">Tratamientos</a>
          <a href="#beta" className="btn btn-primary">Acceso Beta</a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-green-700" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-white shadow-md transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-60' : 'max-h-0'}`}>
        <div className="container py-4 flex flex-col gap-4">
          <a href="#como-funciona" className="py-2 hover:text-green-600 transition-colors" onClick={toggleMenu}>¿Cómo Funciona?</a>
          <a href="#tratamientos" className="py-2 hover:text-green-600 transition-colors" onClick={toggleMenu}>Tratamientos</a>
          <a href="#beta" className="btn btn-primary w-full text-center" onClick={toggleMenu}>Acceso Beta</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;