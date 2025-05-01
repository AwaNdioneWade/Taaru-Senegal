import React from 'react'

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary';
    fullWidth?: boolean;
  }
  
function Button({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    fullWidth = true,
  }: ButtonProps) {
    const base = 'py-3 px-6 rounded-lg font-medium transition ';
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}
      >
        {children}
      </button>
    );
  }
export default Button
