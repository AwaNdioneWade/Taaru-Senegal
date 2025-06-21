import React from 'react'

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary';
    fullWidth?: boolean;
    disabled?: boolean;
  }
  
function Button({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    fullWidth = true,
    disabled = false,
  }: ButtonProps) {
    const base = 'py-3 px-6 rounded-lg font-medium transition ';
    const variants = {
      primary: 'bg-[#00853F] text-white hover:bg-[#FDEF00]',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
export default Button
