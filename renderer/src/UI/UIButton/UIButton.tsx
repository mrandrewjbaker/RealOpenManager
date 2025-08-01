import React from 'react';
import styles from './UIButton.module.scss';

interface UIButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export const UIButton: React.FC<UIButtonProps> = ({
  onClick,
  children,
  type = 'button',
  className = '',
  disabled = false,
}) => {
  const buttonClasses = `${styles.UIButton} ${className}`;
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
