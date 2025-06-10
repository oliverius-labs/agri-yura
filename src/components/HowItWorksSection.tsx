import React, { useState, useEffect, useRef } from 'react';
import { Camera, Brain, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  {
    title: "Detecta el problema",
    description: "Toma una foto clara de tu cultivo o describe los síntomas que observas",
    icon: Camera,
    color: "text-amber-600",
    bgGradient: "from-amber-100 to-orange-100",
    details: [""]
  },
  {
    title: "Diagnóstico con IA",
    description: "Nuestra IA boliviana analiza la imagen y detecta la enfermedad de tu cultivo",
    icon: Brain,
    color: "text-blue-600",
    bgGradient: "from-blue-100 to-cyan-100",
    details: [""]
  },
  {
    title: "Solución en minutos",
    description: "Conectamos con expertos locales y agropecuarias que te ofrecen tratamientos específicos",
    icon: Clock,
    color: "text-emerald-600",
    bgGradient: "from-emerald-100 to-green-100",
    details: [""]
  }
];



const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      id="como-funciona" 
      className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      aria-labelledby="how-it-works-title"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
         
          
          <h2 
            id="how-it-works-title"
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
          >
            ¿Cómo funciona 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600"> la app?</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            En 3 simples pasos, diagnostica problemas en tus cultivos y recibe soluciones 
            de expertos bolivianos en minutos
          </p>
        </div>

        {/* Steps Process */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
           
            

            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`relative transition-all duration-700 delay-${index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div 
                  className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 cursor-pointer h-full flex flex-col ${
                    activeStep === index 
                      ? 'border-emerald-300 scale-105 shadow-emerald-100' 
                      : 'border-gray-100 hover:border-emerald-200'
                  }`}
                  onClick={() => setActiveStep(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Paso ${index + 1}: ${step.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveStep(index);
                    }
                  }}
                >
                  {/* Step Icon */}
                  <div className={`relative mb-6`}>
                    <div className={`bg-gradient-to-r ${step.bgGradient} p-4 rounded-2xl w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className={`${step.color} w-10 h-10`} />
                    </div>
                    
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>
                    
                    {/* Details */}
                    <div className="space-y-3">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>{detail}</span>
                          Fácil y rápido
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Active indicator */}
                 
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        

        {/* IA Information Section */}
        <div className={`bg-gradient-to-r from-emerald-50 to-blue-50 rounded-3xl p-8 md:p-12 border border-emerald-100 shadow-xl transition-all duration-1000 delay-1500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div 
  className="rounded-[1.8rem] p-4 h-[600px] w-[300px] mx-auto relative overflow-hidden shadow-lg flex flex-col"
  style={{ backgroundColor: '#fdfaf6' }}
>
  {/* Imagen */}
  <div className="flex-grow relative rounded-xl overflow-hidden flex items-center justify-center bg-black/5">
    <img 
      src="/zapallo.webp" 
      alt="Proceso de diagnóstico con inteligencia artificial en cultivos bolivianos" 
      className="object-contain w-full h-full"
      style={{ objectPosition: 'center top' }}
      loading="lazy"
    />
  </div>

  {/* Botón Cotiza */}
  <div className="pt-3 pb-2 flex justify-center">
    <button 
      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-full shadow-md text-sm transition-all duration-200"
    >
      Cotiza ahora
    </button>
  </div>
</div>
            
            {/* Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-3 rounded-xl">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">Inteligencia Artificial</h3>
                  <p className="text-emerald-600 font-medium">trabajando para el campo boliviano</p>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Nuestro algoritmo ha sido entrenado específicamente con miles de imágenes de cultivos 
                bolivianos para reconocer con precisión los patrones de más de 50 enfermedades comunes 
                en nuestro territorio.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Actualización constante del modelo',
                  'Compatible con todos los cultivos principales',
                  'Adaptado al clima boliviano',
                  'Validado por expertos locales'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/70 p-3 rounded-lg">
                    <CheckCircle2 className="text-emerald-600 w-5 h-5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button className="group bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all duration-300">
                  Prueba la beta
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            

          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;