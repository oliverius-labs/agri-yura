import React, { useState } from 'react';
import { Check, Smartphone, Shield, Zap } from 'lucide-react';
import LeadForm from './LeadForm';

const BetaSignupSection: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
  };

  return (
    <section id="beta" className="section bg-gradient-to-b from-white to-green-50">
      <div className="container">
        <h2 className="section-title">Ahora en tu teléfono</h2>
        <p className="section-subtitle">
          Estamos lanzando la versión beta de la app. Queremos que tú, agricultor/a, seas de los primeros en probarla y ayudarnos a mejorar.
        </p>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 mt-12">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-600/20 rounded-full blur-xl transform scale-125"></div>
                <div className="relative z-10 bg-gradient-to-br from-green-600 to-green-800 p-4 rounded-full">
                  <Smartphone className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-center mb-8">Ventajas de la versión beta</h3>
            
            <div className="space-y-4">
              {[
                "Acceso gratuito a funciones premium por 3 meses",
                "Soporte técnico prioritario",
                "Influye en el desarrollo de nuevas funcionalidades",
                "Recibe actualizaciones antes que nadie",
                "Descuentos exclusivos en tratamientos"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-700" />
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <Shield className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-center text-sm">100% seguro y privado</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <Zap className="w-8 h-8 text-amber-500 mb-2" />
                <p className="text-center text-sm">Mayor eficiencia</p>
              </div>
            </div>
          </div>
          
          <div>
            {isSubmitted ? (
              <div className="bg-white p-8 rounded-xl shadow-lg h-full flex flex-col items-center justify-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-6">
                  <Check className="w-16 h-16 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">¡Gracias por tu interés!</h3>
                <p className="text-gray-600 mb-6">
                  Hemos recibido tus datos correctamente. Te contactaremos pronto con instrucciones para descargar la app beta.
                </p>
                <p className="text-sm text-gray-500">
                  Mientras tanto, sigue cultivando con pasión y sabiduría.
                </p>
              </div>
            ) : (
              <LeadForm onSubmitSuccess={handleSubmitSuccess} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BetaSignupSection;