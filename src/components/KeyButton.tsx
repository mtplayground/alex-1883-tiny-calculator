import type { ButtonHTMLAttributes, ReactNode } from 'react';

type KeyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'number' | 'operator';
};

export function KeyButton({
  children,
  className = '',
  variant = 'number',
  ...props
}: KeyButtonProps) {
  const variantClass = variant === 'operator' ? 'key-button--operator' : '';

  return (
    <button className={`key-button ${variantClass} ${className}`.trim()} type="button" {...props}>
      {children}
    </button>
  );
}
