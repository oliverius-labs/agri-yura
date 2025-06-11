import React, { useState, useEffect } from 'react';
import { ArrowDown, Smartphone, Zap, Users } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  // Usando tu paleta de colores específica
  const brandColors = {
    verdeLimaClaro: '#8ddc33',
    verdeHoja: '#74d83a', 
    verdeProfundo: '#13ac6b',
    negro: '#000000',
    cremaClaro: '#f5f1e9'
  };

  const features = [
    { 
      icon: Smartphone, 
      title: "Cámara inteligente",
      description: "Toma una foto y obtén el diagnóstico",
      color: brandColors.verdeProfundo,
      bgColor: `${brandColors.verdeProfundo}20`
    },
    { 
      icon: Users, 
      title: "Red de expertos",
      description: "Conecta con agrónomos de tu región",
      color: brandColors.verdeHoja,
      bgColor: `${brandColors.verdeHoja}20`
    },
    { 
      icon: Zap, 
      title: "Soluciones rápidas",
      description: "Encuentra proveedores y tratamientos",
      color: brandColors.verdeLimaClaro,
      bgColor: `${brandColors.verdeLimaClaro}20`
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
      style={{ backgroundColor: brandColors.cremaClaro }}
      aria-labelledby="hero-heading"
    >
      {/* Background mejorado con tus colores */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${brandColors.cremaClaro} 0%, ${brandColors.verdeLimaClaro}10 50%, ${brandColors.cremaClaro} 100%)`
        }}
      ></div>
      
      {/* Elementos flotantes con mejor contraste */}
      <div 
        className="absolute top-20 left-10 w-20 h-20 rounded-full blur-xl animate-pulse"
        style={{ backgroundColor: `${brandColors.verdeHoja}30` }}
      ></div>
      <div 
        className="absolute bottom-32 right-16 w-32 h-32 rounded-full blur-2xl animate-pulse delay-1000"
        style={{ backgroundColor: `${brandColors.verdeProfundo}20` }}
      ></div>

      <div className="container mx-auto px-4 relative z-10 py-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          
          {/* Content Section */}
          <div className={`flex flex-col justify-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Propuesta de valor */}
           

            {/* Main Heading con mejor contraste */}
            <div className="space-y-4">
              <h1 
                id="hero-heading"
                className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight"
                style={{ color: brandColors.negro }}
              >
                Detecta enfermedades en tus 
                <span 
                  className="text-transparent bg-clip-text bg-gradient-to-r"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${brandColors.verdeProfundo}, ${brandColors.verdeHoja})`
                  }}
                > cultivos</span>
                <br />
                <span 
                  className="text-2xl md:text-3xl xl:text-4xl font-semibold"
                  style={{ color: `${brandColors.negro}80` }}
                >
                  al instante y gratis
                </span>
              </h1>
              
              {/* Value Proposition */}
              <p 
                className="text-xl md:text-2xl leading-relaxed max-w-2xl"
                style={{ color: `${brandColors.negro}70` }}
              >
                Desde tu celular, conectándote con expertos y proveedores confiables 
                que ofrecen soluciones efectivas para tu región.
              </p>
            </div>

            {/* Características dinámicas */}
            <div 
              className="backdrop-blur-sm p-6 rounded-2xl shadow-lg border transition-all duration-700"
              style={{ 
                backgroundColor: `${brandColors.cremaClaro}95`,
                borderColor: `${brandColors.verdeProfundo}20`
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div 
                    className="p-3 rounded-xl transition-all duration-700 transform"
                    style={{ backgroundColor: features[currentFeature].bgColor }}
                  >
                    {React.createElement(features[currentFeature].icon, { 
                      size: 28, 
                      style: { color: features[currentFeature].color }
                    })}
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-xl font-bold transition-all duration-700"
                      style={{ color: brandColors.negro }}
                    >
                      {features[currentFeature].title}
                    </h3>
                    <p 
                      className="text-base opacity-80 transition-all duration-700"
                      style={{ color: brandColors.negro }}
                    >
                      {features[currentFeature].description}
                    </p>
                  </div>
                </div>
                
                {/* Indicadores de progreso */}
                <div className="flex gap-2 pt-2">
                  {features.map((_, index) => (
                    <div 
                      key={index}
                      className="h-1 rounded-full transition-all duration-700"
                      style={{ 
                        width: '33.33%',
                        backgroundColor: index === currentFeature ? brandColors.verdeProfundo : `${brandColors.verdeProfundo}20`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons mejorados */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => scrollToSection('beta')}
                className="group px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4"
                style={{ 
                  backgroundColor: brandColors.verdeProfundo,
                  color: 'white',
                  '--tw-ring-color': `${brandColors.verdeProfundo}40`
                } as React.CSSProperties}
                aria-label="Registrarse para la versión beta de la aplicación"
              >
                <span className="flex items-center justify-center gap-2">
                  Únete a la beta
                  <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
                </span>
              </button>
              
              <button 
                onClick={() => scrollToSection('como-funciona')}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg border-2 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4"
                style={{ 
                  backgroundColor: 'white',
                  color: brandColors.negro,
                  borderColor: brandColors.negro,
                  '--tw-ring-color': `${brandColors.negro}20`
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${brandColors.negro}05`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
                aria-label="Ver cómo funciona la aplicación"
              >
                Cómo funciona
              </button>
            </div>
          </div>

          {/* Visual Section mejorada */}
          <div className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-50 translate-x-8'}`}>
            
            {/* Main Image Container */}
            <div className="relative group">
              {/* Glow effect con tus colores */}
              <div 
                className="absolute -inset-8 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"
                style={{ 
                  background: `linear-gradient(to right, ${brandColors.verdeHoja}20, ${brandColors.verdeLimaClaro}20)`
                }}
              ></div>
              
              {/* Phone mockup frame - MEJORADO: sin fondo negro */}
              <div 
                className="relative p-2 rounded-[2.5rem] shadow-2xl"
                style={{ backgroundColor: `${brandColors.negro}15` }} // Mucho más claro
              >
                <div 
                  className="rounded-[2rem] p-4 h-[600px] w-[300px] mx-auto relative overflow-hidden"
                  style={{ backgroundColor: brandColors.cremaClaro }}
                >
                  
                  {/* App interface mockup */}
                  <div className="space-y-4 h-full">
                    {/* Camera view */}
                    <div 
                      className="rounded-xl flex items-center justify-center relative overflow-hidden h-full"
                      style={{ backgroundColor: `${brandColors.negro}10` }}
                    >
                      <img 
                        src="/src/assets/img/telefono.jpeg" 
                        alt="Vista de cultivo en la aplicación móvil"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 100%' }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator mejorado */}
      <button 
        onClick={() => scrollToSection('como-funciona')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center group focus:outline-none focus:ring-4 rounded-lg p-2"
        style={{ '--tw-ring-color': `${brandColors.verdeProfundo}40` } as React.CSSProperties}
        aria-label="Desplazarse hacia abajo para ver más información"
      >
        
        
      </button>
    </section>
  );
};

export default HeroSection;