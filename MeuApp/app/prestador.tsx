import React, { useState } from 'react';


/**
 * ProLink Registration Form Component
 * Following the design system: ProLink Vibrant
 */

interface RegistrationFormData {
  userType: 'contractor' | 'provider';
  fullName: string;
  email: string;
  cpf: string;
  password: string;
  confirmPassword: string;
  serviceType?: string;
  experienceYears?: string;
  isCompany?: boolean;
  address: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    userType: 'provider',
    fullName: '',
    email: '',
    cpf: '',
    password: '',
    confirmPassword: '',
    serviceType: '',
    experienceYears: '',
    isCompany: false,
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleTypeSelect = (type: 'contractor' | 'provider') => {
    setFormData(prev => ({ ...prev, userType: type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting data:', formData);
    // Add validation and submission logic here
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto p-6 bg-[#fff8f6] font-['Manrope']">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-[#ff6700] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#ff6700]/20">
          <span className="material-icons text-white text-3xl">construction</span>
        </div>
        <h1 className="text-2xl font-black text-[#261812] text-center leading-tight">
          Junte-se à maior rede de <span className="text-[#ff6700]">profissionais.</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User Type Selection */}
        <div className="flex flex-col space-y-2">
          <label className="text-[10px] font-bold text-[#261812]/40 uppercase tracking-widest">Você é:</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleTypeSelect('contractor')}
              className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${
                formData.userType === 'contractor' 
                ? 'border-[#ff6700] bg-white shadow-md' 
                : 'border-transparent bg-[#fff1ec]'
              }`}
            >
              <span className="material-icons text-2xl mb-1 text-[#261812]">person</span>
              <span className="text-xs font-bold text-[#261812]">Contratante</span>
              {formData.userType === 'contractor' && (
                <span className="absolute top-2 right-2 text-[#ff6700] material-icons text-sm">check_circle</span>
              )}
            </button>
            <button
              type="button"
              onClick={() => handleTypeSelect('provider')}
              className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all relative ${
                formData.userType === 'provider' 
                ? 'border-[#ff6700] bg-white shadow-md' 
                : 'border-transparent bg-[#fff1ec]'
              }`}
            >
              <span className="material-icons text-2xl mb-1 text-[#261812]">business_center</span>
              <span className="text-xs font-bold text-[#261812]">Prestador</span>
              {formData.userType === 'provider' && (
                <span className="absolute top-2 right-2 text-[#ff6700] material-icons text-sm">check_circle</span>
              )}
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-3">
          <InputField label="Nome Completo" name="fullName" placeholder="Como deseja ser chamado" value={formData.fullName} onChange={handleChange} />
          <InputField label="Email" name="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={handleChange} />
          <InputField label="CPF" name="cpf" placeholder="000.000.000-00" value={formData.cpf} onChange={handleChange} />
          <InputField label="Senha" name="password" type="password" placeholder="********" value={formData.password} onChange={handleChange} />
          <InputField label="Confirme a Senha" name="confirmPassword" type="password" placeholder="********" value={formData.confirmPassword} onChange={handleChange} />
          
          {formData.userType === 'provider' && (
            <>
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold text-[#261812]/40 uppercase tracking-widest">Principal serviço prestado</label>
                <select 
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl bg-white border border-[#e3bfb1] text-sm focus:outline-none focus:border-[#ff6700]"
                >
                  <option value="">Selecione sua especialidade</option>
                  <option value="pintura">Pintura</option>
                  <option value="eletrica">Elétrica</option>
                  <option value="hidraulica">Hidráulica</option>
                </select>
              </div>
              <InputField label="Tempo de Experiência" name="experienceYears" placeholder="Ex: 5 anos" value={formData.experienceYears} onChange={handleChange} />
            </>
          )}

          <InputField label="Endereço" name="address" placeholder="Rua, número e bairro" value={formData.address} onChange={handleChange} icon="location_on" />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full h-14 bg-[#ff6700] text-white font-bold rounded-2xl shadow-lg shadow-[#ff6700]/30 active:scale-[0.98] transition-all mt-4"
        >
          Cadastrar
        </button>
        
        <p className="text-center text-xs font-semibold text-[#261812]/60 mt-4">
          Já possui uma conta? <span className="text-[#a23f00] font-bold">Entre aqui</span>
        </p>
      </form>
    </div>
  );
};

interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: string;
}

const InputField: React.FC<InputProps> = ({ label, name, type = 'text', placeholder, value, onChange, icon }) => (
  <div className="flex flex-col space-y-1">
    <label className="text-[10px] font-bold text-[#261812]/40 uppercase tracking-widest">{label}</label>
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-12 px-4 rounded-xl bg-white border border-[#e3bfb1] text-sm focus:outline-none focus:border-[#ff6700] transition-colors"
      />
      {icon && (
        <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-[#ff6700] text-xl">{icon}</span>
      )}
    </div>
  </div>
);

export default RegistrationForm;
