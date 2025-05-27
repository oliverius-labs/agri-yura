import React from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 bg-gradient-to-b from-green-50 to-white">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col justify-center">
            <span className="text-green-700 font-medium mb-2">Tecnología al servicio del campo</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Diagnóstico Inteligente para tus Cultivos
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Usamos IA para identificar enfermedades en tus plantas y conectarte con agropecuarias que te envían tratamientos listos para aplicar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#beta" className="btn btn-primary text-center">
                Déjanos tus datos y recibe la app antes que nadie
              </a>
              <a href="#como-funciona" className="flex items-center justify-center gap-2 font-medium text-green-700 hover:text-green-800 transition-colors">
                Cómo funciona
                <ArrowDown size={20} />
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-green-600/20 rounded-2xl blur-xl"></div>
              <img 
                src="https://images.pexels.com/photos/1684375/pexels-photo-1684375.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Agricultor usando la app" 
                className="w-full h-auto object-cover rounded-xl shadow-xl relative z-10"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg z-20 max-w-[200px]">
                <div className="text-green-700 font-bold mb-1">Análisis IA</div>
                <p className="text-sm text-gray-600">Diagnóstico inmediato para tus cultivos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#como-funciona" className="flex flex-col items-center justify-center">
          <span className="text-sm text-green-700 font-medium mb-1">Descubre más</span>
          <ArrowDown className="text-green-700" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;