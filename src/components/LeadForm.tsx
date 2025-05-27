import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface LeadFormProps {
  onSubmitSuccess: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    region: '',
    crops: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.region.trim()) {
      newErrors.region = 'La región es obligatoria';
    }
    
    if (!formData.crops.trim()) {
      newErrors.crops = 'Indica al menos un cultivo';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (!/^\d{7,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Ingresa un número válido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        const response = await fetch('https://n8n.joseiriarte.systems/webhook/af8be9e9-57b8-4327-8e28-02834951c7f2', {
        // const response = await fetch('https://n8n.joseiriarte.systems/webhook-test/af8be9e9-57b8-4327-8e28-02834951c7f2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          throw new Error(`Error en el envío: ${response.statusText}`);
        }
  
        // Opcional: puedes leer la respuesta si el webhook devuelve algo
        // const data = await response.json();
  
        onSubmitSuccess();
        // Opcional: limpiar formulario después de enviar
        setFormData({ name: '', region: '', crops: '', phone: '' });
      } catch (error) {
        console.error('Error enviando el formulario:', error);
        // Aquí podrías mostrar un mensaje de error al usuario si quieres
      }
    }
  };
  

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-6">¡Quiero probar la app!</h3>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Nombre completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
            placeholder="Ingresa tu nombre"
          />
          {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="region" className="block mb-1 font-medium">
            Región o departamento
          </label>
          <input
            type="text"
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${errors.region ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
            placeholder="¿Dónde te encuentras?"
          />
          {errors.region && <p className="mt-1 text-red-500 text-sm">{errors.region}</p>}
        </div>
        
        <div>
          <label htmlFor="crops" className="block mb-1 font-medium">
            Cultivos que manejas
          </label>
          <input
            type="text"
            id="crops"
            name="crops"
            value={formData.crops}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${errors.crops ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
            placeholder="Ej: Maíz, papa, café"
          />
          {errors.crops && <p className="mt-1 text-red-500 text-sm">{errors.crops}</p>}
        </div>
        
        <div>
          <label htmlFor="phone" className="block mb-1 font-medium">
            Teléfono o WhatsApp
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
            placeholder="Ej: 3123456789"
          />
          {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>}
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
        >
          <span>¡Quiero probar la app!</span>
          <Send className="w-5 h-5" />
        </button>
        
        <p className="text-xs text-gray-500 text-center">
          Al enviar este formulario, aceptas recibir comunicaciones sobre la app. 
          Tus datos están seguros y no serán compartidos con terceros.
        </p>
      </form>
    </div>
  );
};

export default LeadForm;