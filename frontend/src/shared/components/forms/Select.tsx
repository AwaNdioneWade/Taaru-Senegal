import React from 'react'

interface SelectProps {
    label?: string;
    value: string | string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    multiple?: boolean;
}

function Select({ label, value, onChange, options, multiple = false }: SelectProps) {
    return (
      <div className="mb-4">
        {label && <label className="block mb-1 font-medium">{label}</label>}
        <select
          value={value}
          onChange={onChange}
          className="w-full p-3 border rounded-lg focus:outline-none"
          multiple={multiple}
        >
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  }
  

export default Select
