import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'outline';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export default function Button({ children, href, variant = 'primary', className = '', onClick, type = 'button' }: ButtonProps) {
  const classes = variant === 'primary'
    ? `inline-flex items-center justify-center px-8 py-3.5 bg-warm-black text-white font-sans-alt text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-warm-brown ${className}`
    : `inline-flex items-center justify-center px-8 py-3.5 border-2 border-warm-black text-warm-black font-sans-alt text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-warm-black hover:text-white bg-transparent ${className}`;

  if (href) return <Link href={href} className={classes}>{children}</Link>;
  return <button type={type} className={classes} onClick={onClick}>{children}</button>;
}
