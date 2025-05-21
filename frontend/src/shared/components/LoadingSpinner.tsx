import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16'
};

export function LoadingSpinner({ size = 'md', color = '#00853F' }: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div 
        className={`animate-spin rounded-full border-t-2 border-b-2 ${sizeClasses[size]}`}
        style={{ borderColor: color }}
      ></div>
    </div>
  );
} 