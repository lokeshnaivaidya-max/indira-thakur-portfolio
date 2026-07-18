import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-6 py-3 text-xs',
    md: 'px-8 py-4 text-sm',
    lg: 'px-10 py-5 text-sm',
  };

  const baseClasses = `inline-flex items-center justify-center font-sans-alt font-medium tracking-widest uppercase transition-all duration-500 ${sizeClasses[size]}`;

  const variantClasses = {
    primary: 'bg-warm-black text-soft-white hover:bg-earth-brown',
    outline: 'border-2 border-warm-black text-warm-black hover:bg-warm-black hover:text-soft-white',
    ghost: 'text-warm-brown hover:text-warm-black',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
