import React from 'react'

interface SelectProps {
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
}

function Select({ label, value, onChange, options }: SelectProps) {
    return (
      <div className="mb-4">
        {label && <label className="block mb-1 font-medium">{label}</label>}
        <select
          value={value}
          onChange={onChange}
          className="w-full p-3 border rounded-lg focus:outline-none"
        >
          {options.map(option => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  }
  

export default Select
