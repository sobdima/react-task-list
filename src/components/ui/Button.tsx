import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  type = 'button',
  children,
  className,
}) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};
