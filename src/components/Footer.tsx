import React from 'react';
import { Instagram, Facebook, Twitter, Send } from 'lucide-react';
import logo from '/img/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Logo Yura Vision" className="h-8 w-8 object-contain" />
              <span className="font-bold text-xl text-white">Yura Vision</span>
            </div>
            <p className="text-green-200 mb-6 max-w-md">
              Conectamos a los agricultores con tecnologías inteligentes para mejorar su productividad y proteger sus cultivos de forma sustentable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/yuravision" className="text-green-200 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Recursos</h3>
            <ul className="space-y-3">
              {['Biblioteca de Cultivos', 'Guía de Productos', 'Preguntas Frecuentes', 'Blog Agrícola'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-green-200 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3 text-green-200">
              <li>soporte@yuravision.tech</li>
              <li>+591 68612147</li>
              <li>Lunes a Viernes: 8am - 6pm</li>
            </ul>
            
            <div className="mt-6">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Tu correo" 
                  className="bg-green-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-green-400 flex-grow"
                />
                <button className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-r-lg transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-green-400 mt-2">Suscríbete para recibir noticias</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-green-800 mt-12 pt-8 text-center text-green-400 text-sm">
          <p>© {new Date().getFullYear()} Yura Vision. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;