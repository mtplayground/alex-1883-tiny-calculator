import type { ButtonHTMLAttributes, ReactNode } from 'react';

type KeyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'control' | 'number' | 'operator';
};

export function KeyButton({
  children,
  className = '',
  variant = 'number',
  ...props
}: KeyButtonProps) {
  const variantClass = variant === 'number' ? '' : `key-button--${variant}`;

  return (
    <button className={`key-button ${variantClass} ${className}`.trim()} type="button" {...props}>
      {children}
    </button>
  );
}
