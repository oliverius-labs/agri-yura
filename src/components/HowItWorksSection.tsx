import React from 'react';
import { Camera, Brain, Clock, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    title: "Detecta el problema",
    description: "Toma una foto o describe el problema de tu cultivo en la app",
    icon: Camera,
    color: "text-amber-600",
    bgColor: "bg-amber-100"
  },
  {
    title: "Diagnóstico con IA",
    description: "La IA analiza la imagen o los datos y detecta la enfermedad probable",
    icon: Brain,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Solución en minutos",
    description: "Recibe tratamientos detallados de agropecuarias cercanas: producto, dosis, frecuencia, duración y precio estimado",
    icon: Clock,
    color: "text-green-600",
    bgColor: "bg-green-100"
  }
];

const HowItWorksSection: React.FC = () => {
  return (
    <section id="como-funciona" className="section bg-white">
      <div className="container">
        <h2 className="section-title">¿Cómo funciona la app?</h2>
        <p className="section-subtitle">En 3 simples pasos, diagnostica problemas en tus cultivos y recibe soluciones profesionales</p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/4 left-full w-16 h-1 bg-gray-200 z-0 -ml-8">
                  <div className="absolute top-0 left-0 h-full bg-green-500 w-0 animate-progress"></div>
                </div>
              )}
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 h-full flex flex-col">
                <div className={`${step.bgColor} p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6`}>
                  <step.icon className={`${step.color} w-8 h-8`} />
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="bg-green-700 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                </div>
                
                <p className="text-gray-600 flex-grow">{step.description}</p>
                
                <div className="mt-6 flex items-center text-green-700">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Fácil y rápido</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-green-50 p-6 rounded-xl border border-green-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="rounded-lg overflow-hidden shadow-lg w-full md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/442589/pexels-photo-442589.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Proceso de diagnóstico" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Inteligencia Artificial trabajando para tu campo</h3>
              <p className="text-gray-600 mb-4">
                Nuestro algoritmo ha sido entrenado con miles de imágenes de cultivos para reconocer con precisión los patrones de más de 30 enfermedades comunes en cultivos latinoamericanos.
              </p>
              <ul className="space-y-3">
                {['Precisión en el diagnóstico', 'Actualización constante', 'Funciona sin internet (modo offline)', 'Compatible con todos los cultivos principales'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="text-green-600 w-5 h-5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;