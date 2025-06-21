import React from 'react'

interface InputProps {
    label?: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
  }
  
function InputField({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
  }: InputProps) {
    return (
      <div className="mb-4">
        {label && <label className="block mb-1 font-medium">{label}</label>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00853F] ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
        />
      </div>
    );
  }

export default InputField
