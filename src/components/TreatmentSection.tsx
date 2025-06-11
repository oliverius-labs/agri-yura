import React, { useState, useCallback } from 'react';
import { ShieldCheck, BarChart2, Thermometer, Droplets, DollarSign, Building2, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Datos de Tratamientos ---
const treatments = [
  {
    id: 1,
    disease: "Tizón Tardío",
    crop: "Papa",
    product: "Acrobat MZ",
    dose: "0,75 - 2,5 Kg/ha según fase",
    frequency: "Cada 7-10 días",
    duration: "5 a 7 aplicaciones por ciclo del cultivo",
    provider: "AgroInsumos El Trigal",
    price: 150,
    image: "/img/telefono3.webp",
    severity: "alta",
  },
  {
    id: 2,
    disease: "Fusariosis",
    crop: "Arveja",
    product: "Maxin",
    dose: "100 ml de producto por cada 1 L de agua para tratar 100 kg de semilla",
    frequency: "Una sola vez antes de la siembra (tratamiento de semilla)",
    duration: "Durante la etapa de plántula",
    provider: "Insumos Cafeteros S.A.",
    price: 80,
    image: "/img/telefono4.webp",
    severity: "alta",
  }
];

const severityConfig = {
  alta: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    label: 'Severidad Alta'
  },
  media: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    label: 'Severidad Media'
  },
  baja: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    label: 'Severidad Baja'
  }
};

// --- Componente: TreatmentCard ---
// Tarjeta individual para mostrar un tratamiento en la lista.
const TreatmentCard = React.memo(({ treatment, isActive, onClick }) => {
  // Configuración de estilo de severidad con fallback
  const severityStyle = severityConfig?.[treatment.severity] || severityConfig.media;

  return (
    <article
      className={`group relative text-left p-4 rounded-xl transition-all duration-300 cursor-pointer focus-within:ring-4 focus-within:ring-green-500/20 ${
        isActive
          ? 'bg-white shadow-xl scale-105 border-2 border-green-200'
          : 'bg-white/70 hover:bg-white hover:shadow-lg hover:scale-102 border border-gray-200'
      }`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      aria-pressed={isActive}
      aria-label={`Seleccionar tratamiento para ${treatment.disease} en ${treatment.crop}`}
    >
      {/* Badge de severidad */}
      <div className="absolute top-3 right-3 z-10">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${severityStyle.bg} ${severityStyle.text}`}
          title={severityStyle.label}
        >
          {treatment.severity?.toUpperCase() || 'MEDIA'}
        </span>
      </div>

      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <img
            src={treatment.image}
            alt={`Cultivo de ${treatment.crop} afectado por ${treatment.disease}`}
            className="w-10 h-10 object-cover rounded-lg shadow-sm" // Imagen más pequeña aquí
            loading="lazy"
          />
          {isActive && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">
            {treatment.disease}
          </h3>
          <p className="text-xs text-gray-600 mb-2">
            Cultivo: <span className="font-medium text-gray-800">{treatment.crop}</span>
          </p>
          <p className="text-xs text-green-600 font-medium">
            {treatment.product}
          </p>
        </div>
      </div>

      {/* Indicador visual de selección */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl transition-all duration-300 ${
        isActive ? 'bg-green-500' : 'bg-transparent'
      }`} />
    </article>
  );
});

TreatmentCard.displayName = 'TreatmentCard';

// --- Componente: DetailItem ---
// Muestra un detalle específico del tratamiento con un icono.
const DetailItem = React.memo(({ icon: Icon, title, value, subtitle, bgColor = "bg-gray-100", iconColor = "text-gray-600" }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors duration-200">
    <div className={`${bgColor} p-2 rounded-lg shadow-sm flex-shrink-0`}>
      <Icon className={`${iconColor} w-4 h-4`} aria-hidden="true" />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-semibold text-gray-900 text-sm mb-1">{title}</h4>
      <p className="text-gray-700 text-sm mb-1 leading-relaxed">{value}</p>
      {subtitle && (
        <p className="text-xs text-gray-500">{subtitle}</p>
      )}
    </div>
  </div>
));

DetailItem.displayName = 'DetailItem';

// --- Componente: NavigationControls ---
// Botones de navegación para cambiar entre tratamientos.
const NavigationControls = React.memo(({ onPrevious, onNext, currentIndex, total }) => (
  <div className="flex items-center gap-2">
    <button
      onClick={onPrevious}
      className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
      aria-label="Tratamiento anterior"
      title="Tratamiento anterior"
      disabled={currentIndex === 0} // Deshabilita si es el primer elemento
    >
      <ChevronLeft className="w-4 h-4 text-gray-600" />
    </button>
    <span className="text-xs text-gray-500 px-2">
      {currentIndex + 1} de {total}
    </span>
    <button
      onClick={onNext}
      className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
      aria-label="Siguiente tratamiento"
      title="Siguiente tratamiento"
      disabled={currentIndex === total - 1} // Deshabilita si es el último elemento
    >
      <ChevronRight className="w-4 h-4 text-gray-600" />
    </button>
  </div>
));

NavigationControls.displayName = 'NavigationControls';

// --- Componente Principal: TreatmentSection ---
// Contiene la lógica y el layout de la sección de tratamientos.
const TreatmentSection = () => {
  const [activeTreatment, setActiveTreatment] = useState(0);

  // Función para cambiar el tratamiento activo, memorizada con useCallback
  const handleTreatmentChange = useCallback((index) => {
    if (index >= 0 && index < treatments.length) {
      setActiveTreatment(index);
    }
  }, []);

  // Funciones para navegar al tratamiento anterior y siguiente, memorizadas con useCallback
  const goToPrevious = useCallback(() => {
    setActiveTreatment((prev) => Math.max(0, prev - 1)); // Evita índices negativos
  }, []);

  const goToNext = useCallback(() => {
    setActiveTreatment((prev) => Math.min(treatments.length - 1, prev + 1)); // Evita exceder el límite
  }, []);

  // Tratamiento actual seleccionado
  const currentTreatment = treatments?.[activeTreatment];

  // Manejo si no hay tratamientos disponibles
  if (!currentTreatment) {
    return (
      <section id="tratamientos" className="py-16 bg-gradient-to-br from-gray-50 via-green-50/30 to-blue-50/20 min-h-screen flex items-center justify-center" aria-labelledby="treatments-heading">
        <h1 id="treatments-heading" className="text-2xl font-bold text-gray-700">No hay tratamientos disponibles en este momento.</h1>
      </section>
    );
  }

  return (
    <section
      id="tratamientos"
      className="py-16 bg-gradient-to-br from-gray-50 via-green-50/30 to-blue-50/20 min-h-screen"
      aria-labelledby="treatments-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de la Sección */}
        <header className="text-center mb-12">
          <h1 id="treatments-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tratamientos
            <span className="block text-green-600">Personalizados</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Cada propuesta es una solución real, enviada por expertos agropecuarios,
            con productos disponibles en tu zona y efectividad comprobada.
          </p>
        </header>

        {/* Sección de Selección de Tratamientos */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Selecciona un tratamiento
            </h2>
            <NavigationControls
              onPrevious={goToPrevious}
              onNext={goToNext}
              currentIndex={activeTreatment}
              total={treatments.length}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {treatments.map((treatment, idx) => (
              <TreatmentCard
                key={treatment.id}
                treatment={treatment}
                isActive={idx === activeTreatment}
                onClick={() => handleTreatmentChange(idx)}
              />
            ))}
          </div>
        </div>

        {/* Panel de Detalles del Tratamiento Activo */}
        <main className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-5">
            {/* Contenido Principal con Detalles */}
            <div className="lg:col-span-3 p-6 lg:p-8">
              <div className="flex items-center gap-2 text-green-700 font-medium mb-3">
                <div className="bg-green-100 p-1.5 rounded-full">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-sm">Solución Recomendada</span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {currentTreatment.disease}
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Cultivo: <span className="font-semibold text-gray-900">{currentTreatment.crop}</span>
              </p>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Tratamiento integral con productos de calidad farmacéutica y efectividad científicamente comprobada.
              </p>

              {/* Lista de Detalles */}
              <div className="space-y-3">
                <DetailItem
                  icon={BarChart2}
                  title="Producto Recomendado"
                  value={currentTreatment.product}
                  bgColor="bg-green-100"
                  iconColor="text-green-700"
                />

                <DetailItem
                  icon={Droplets}
                  title="Dosis y Frecuencia"
                  value={currentTreatment.dose}
                  subtitle={`Aplicar ${currentTreatment.frequency.toLowerCase()}`}
                  bgColor="bg-amber-100"
                  iconColor="text-amber-700"
                />

                <DetailItem
                  icon={Thermometer}
                  title="Duración del Tratamiento"
                  value={currentTreatment.duration}
                  bgColor="bg-blue-100"
                  iconColor="text-blue-700"
                />

                <DetailItem
                  icon={Building2}
                  title="Proveedor Certificado"
                  value={currentTreatment.provider}
                  bgColor="bg-purple-100"
                  iconColor="text-purple-700"
                />

                <DetailItem
                  icon={DollarSign}
                  title="Inversión Estimada"
                  value={`${currentTreatment.price?.toLocaleString()} Bs`}
                  subtitle="Precio competitivo del mercado"
                  bgColor="bg-gray-100"
                  iconColor="text-gray-700"
                />
              </div>
            </div>

            {/* Imagen del Tratamiento */}
            <div className="lg:col-span-2 relative min-h-[300px] lg:min-h-full">
              <img
                src={currentTreatment.image}
                alt={`Tratamiento para ${currentTreatment.disease} en cultivos de ${currentTreatment.crop}`}
                className="max-w-full max-h-[700px] w-full h-auto object-cover rounded-xl mx-auto"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:bg-gradient-to-l lg:from-white/10 lg:to-transparent" />
            </div>
          </div>

          {/* Call to Action (CTA) al pie */}
          <footer className="bg-gradient-to-r from-green-50 to-blue-50 p-4 lg:p-6 border-t border-green-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-green-800 font-medium mb-1">
                  ¿Listo para obtener tu tratamiento personalizado?
                </p>
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-500/20 shadow-lg hover:shadow-xl hover:scale-105">
                Prueba la beta
              </button>
            </div>
          </footer>
        </main>
      </div>
    </section>
  );
};

export default TreatmentSection;