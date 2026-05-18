import { Link } from "@tanstack/react-router";
import logo from '../assets/logo.png';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2 ${className}`}>
      <img 
        src={logo} 
        alt="Kailash Collective" 
        className="h-10 md:h-14 w-auto object-contain mix-blend-multiply" 
      />
    </Link>
  );
}
