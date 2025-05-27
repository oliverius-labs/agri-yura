import React, { useState } from 'react';
import { ShieldCheck, BarChart2, Thermometer, Droplets, DollarSign, Building2 } from 'lucide-react';

const treatments = [
  {
    id: 1,
    disease: "Tizón Tardío",
    crop: "Papa",
    product: "FungiStop Pro",
    dose: "250ml/ha",
    frequency: "Cada 7-10 días",
    duration: "3 aplicaciones",
    provider: "AgroInsumos El Trigal",
    price: 28500,
    image: "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    disease: "Roya",
    crop: "Café",
    product: "CoffeShield Ultra",
    dose: "2ml/L de agua",
    frequency: "Quincenal",
    duration: "2 meses",
    provider: "Insumos Cafeteros S.A.",
    price: 34000,
    image: "https://images.pexels.com/photos/2907296/pexels-photo-2907296.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    disease: "Mildiu",
    crop: "Vid",
    product: "VidProtect",
    dose: "200g/100L",
    frequency: "Cada 15 días",
    duration: "4 aplicaciones",
    provider: "AgroVid Express",
    price: 45000,
    image: "https://images.pexels.com/photos/760281/pexels-photo-760281.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

const TreatmentSection: React.FC = () => {
  const [activeTreatment, setActiveTreatment] = useState(0);

  return (
    <section id="tratamientos" className="section bg-gray-50">
      <div className="container">
        <h2 className="section-title">Tratamientos personalizados</h2>
        <p className="section-subtitle">
          Cada propuesta es una solución real, enviada por expertos agropecuarios, con productos disponibles en tu zona
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-4 mb-8">
          {treatments.map((treatment, idx) => (
            <button
              key={treatment.id}
              onClick={() => setActiveTreatment(idx)}
              className={`text-left p-4 rounded-lg transition-all ${
                idx === activeTreatment 
                  ? 'bg-white shadow-lg border-l-4 border-green-600' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={treatment.image}
                  alt={treatment.crop}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div>
                  <h3 className="font-bold">{treatment.disease}</h3>
                  <p className="text-sm text-gray-600">Cultivo: {treatment.crop}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
                <ShieldCheck className="w-5 h-5" />
                <span>Solución recomendada</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-1">
                {treatments[activeTreatment].disease} en {treatments[activeTreatment].crop}
              </h3>
              
              <p className="text-gray-600 mb-6">
                Tratamiento completo con productos de calidad y efectividad comprobada.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <BarChart2 className="text-green-700 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Producto recomendado</h4>
                    <p className="text-gray-700">{treatments[activeTreatment].product}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Droplets className="text-amber-700 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Dosis y frecuencia</h4>
                    <p className="text-gray-700">{treatments[activeTreatment].dose}</p>
                    <p className="text-gray-600 text-sm">Aplicar {treatments[activeTreatment].frequency}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Thermometer className="text-blue-700 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Duración del tratamiento</h4>
                    <p className="text-gray-700">{treatments[activeTreatment].duration}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Building2 className="text-purple-700 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Agropecuaria que lo ofrece</h4>
                    <p className="text-gray-700">{treatments[activeTreatment].provider}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <DollarSign className="text-gray-700 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Precio estimado</h4>
                    <p className="text-green-700 font-bold">
                      ${treatments[activeTreatment].price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-full">
              <img 
                src={treatments[activeTreatment].image} 
                alt={treatments[activeTreatment].disease} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="bg-green-50 p-4 border-t border-green-100">
            <p className="text-center text-green-800">
              En la app recibirás hasta 5 propuestas de diferentes agropecuarias para comparar precios y opciones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentSection;