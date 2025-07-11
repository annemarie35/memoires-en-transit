import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const Button = ({
  onClick,
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
}: ButtonProps) => {
  const baseStyles = 'rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md';

  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const variantStyles = {
    primary:
      'bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:bg-blue-50 disabled:text-blue-300',
    secondary:
      'bg-gray-50 text-gray-700 hover:bg-gray-100 disabled:bg-gray-50 disabled:text-gray-300',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`}
      data-testid='button'
    >
      {children}
    </button>
  );
};
