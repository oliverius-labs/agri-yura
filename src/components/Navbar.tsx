import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import logo from '../../logo.webp';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 20);
    
    // Active section detection
    const sections = ['como-funciona', 'tratamientos', 'beta'];
    const current = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    setActiveSection(current || '');
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  // Handle escape and click outside to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !menuButtonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scroll on mobile
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
    setFocusedIndex(-1);
  }, []);

  const handleMobileMenuClick = useCallback(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
  }, []);

  // Keyboard navigation for mobile menu
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) return;

    const menuItems = 3; // number of menu items
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev + 1) % menuItems);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => prev <= 0 ? menuItems - 1 : prev - 1);
        break;
      case 'Enter':
      case ' ':
        if (focusedIndex >= 0) {
          e.preventDefault();
          const links = mobileMenuRef.current?.querySelectorAll('a');
          links?.[focusedIndex]?.click();
        }
        break;
    }
  }, [isOpen, focusedIndex]);

  const navLinks = [
    { href: '#como-funciona', label: '¿Cómo Funciona?', id: 'como-funciona' },
    { href: '#tratamientos', label: 'Tratamientos', id: 'tratamientos' },
  ];

  return (
    <>
      {/* Backdrop for mobile menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'backdrop-blur-xl shadow-2xl border-b py-3' 
            : 'backdrop-blur-md py-4'
        }`}
        style={{
          backgroundColor: isScrolled 
            ? 'rgba(19, 172, 107, 0.95)' // #13ac6b with opacity
            : 'rgba(19, 172, 107, 0.9)', // Always visible
          borderBottomColor: isScrolled ? 'rgba(116, 216, 58, 0.3)' : 'rgba(19, 172, 107, 0.2)',
          boxShadow: isScrolled 
            ? '0 25px 50px -12px rgba(19, 172, 107, 0.2)' 
            : '0 10px 25px -5px rgba(19, 172, 107, 0.1)'
        }}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Premium Logo */}
            <a 
              href="#" 
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600 rounded-xl p-2 transition-all duration-500"
              aria-label="Yura Vision - Plataforma de diagnóstico médico"
            >
              <div className="relative">
                <div 
                  className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-all duration-500 scale-110"
                  style={{ 
                    background: 'linear-gradient(135deg, #ffffff, #f0fdf4)'
                  }}
                ></div>
                <div 
                  className="relative p-2 rounded-xl border shadow-lg transition-all duration-500 group-hover:shadow-xl bg-white/90 backdrop-blur-sm"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 10px 25px -5px rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <img 
                    src={logo} 
                    alt="Yura Vision" 
                    className="h-8 w-8 object-contain transition-transform duration-500 group-hover:scale-110" 
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white transition-all duration-500 group-hover:text-emerald-50">
                  Yura Vision
                </span>
                <span className="text-xs font-medium tracking-wide text-emerald-100 opacity-90">
                  AI Medical Platform
                </span>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-semibold transition-all duration-300 relative group px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600 ${
                    activeSection === link.id
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-emerald-50 hover:text-white hover:bg-white/10'
                  }`}
                  style={{
                    boxShadow: activeSection === link.id 
                      ? '0 10px 25px -5px rgba(255, 255, 255, 0.2)' 
                      : undefined
                  }}
                >
                  {link.label}
                  <span 
                    className={`absolute inset-x-2 -bottom-1 h-0.5 bg-white rounded-full transition-all duration-300 ${
                      activeSection === link.id ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70'
                    }`}
                  ></span>
                </a>
              ))}
              
              {/* Premium CTA Button */}
              <div className="relative ml-4">
                <div 
                  className="absolute inset-0 rounded-xl blur-lg opacity-50 animate-pulse"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff, #f0fdf4)'
                  }}
                ></div>
                <a
                  href="#beta"
                  className="relative bg-white text-emerald-600 px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600 flex items-center gap-2 shadow-xl hover:shadow-2xl border border-white/20"
                >
                  <Sparkles size={16} className="animate-pulse" />
                  Acceso Beta
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              className="lg:hidden relative p-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600 bg-white/20 backdrop-blur-sm border border-white/20 hover:bg-white/30"
              onClick={toggleMenu}
              onKeyDown={handleKeyDown}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-haspopup="true"
            >
              <div className="relative w-6 h-6">
                <Menu 
                  size={24} 
                  className={`absolute text-white transition-all duration-300 ${
                    isOpen 
                      ? 'rotate-180 opacity-0 scale-50' 
                      : 'rotate-0 opacity-100 scale-100'
                  }`} 
                />
                <X 
                  size={24} 
                  className={`absolute text-white transition-all duration-300 ${
                    isOpen 
                      ? 'rotate-0 opacity-100 scale-100' 
                      : 'rotate-180 opacity-0 scale-50'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[90vw] z-50 transition-all duration-500 ease-out ${
          isOpen 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-full opacity-0'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(19, 172, 107, 0.98), rgba(19, 172, 107, 0.95))',
          backdropFilter: 'blur(20px)',
          boxShadow: '-25px 0 50px -12px rgba(19, 172, 107, 0.3)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.2)'
        }}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación móvil"
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/20 shadow-lg">
                  <img 
                    src={logo} 
                    alt="Yura Vision" 
                    className="h-8 w-8 object-contain" 
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div>
                <span className="font-bold text-lg text-white">
                  Yura Vision
                </span>
                <div className="text-xs font-medium text-emerald-100 opacity-90">
                  AI Medical Platform
                </div>
              </div>
            </div>
            <button
              className="p-2 rounded-xl text-white hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 px-6 py-8">
            <nav className="space-y-4" role="menu" aria-orientation="vertical">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`block text-lg font-semibold transition-all duration-300 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600 ${
                    activeSection === link.id 
                      ? 'bg-white/30 text-white shadow-lg' 
                      : focusedIndex === index
                        ? 'bg-white/20 text-white'
                        : 'text-emerald-50 hover:text-white hover:bg-white/20'
                  }`}
                  onClick={handleMobileMenuClick}
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                >
                  <div className="flex items-center justify-between">
                    {link.label}
                    <ChevronDown 
                      size={16} 
                      className="text-emerald-100 group-hover:rotate-90 transition-transform duration-300"
                    />
                  </div>
                </a>
              ))}
            </nav>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-white/20">
            <div className="relative">
              <div 
                className="absolute inset-0 rounded-xl blur-lg opacity-50 animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, #ffffff, #f0fdf4)'
                }}
              ></div>
              <a
                href="#beta"
                className={`relative block w-full bg-white text-emerald-600 text-center px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600 shadow-xl flex items-center justify-center gap-3 ${
                  focusedIndex === 2 ? 'ring-2 ring-white ring-offset-2 ring-offset-emerald-600' : ''
                }`}
                onClick={handleMobileMenuClick}
                role="menuitem"
                tabIndex={isOpen ? 0 : -1}
              >
                <Sparkles size={18} className="animate-pulse" />
                Acceso Beta
                <ChevronDown size={16} className="animate-bounce" />
              </a>
            </div>
            <p className="text-center text-sm mt-4 font-medium text-emerald-100 opacity-90">
              Únete a la revolución médica
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;