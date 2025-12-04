import React from 'react';
import { 
  Home, 
  BookOpen, 
  MessageSquare, 
  BarChart2, 
  User, 
  ChevronLeft,
  X
} from 'lucide-react';
import { ScreenName } from '../types';

// --- Layout Wrapper ---
export const MobileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex justify-center">
      <div className="w-full max-w-md bg-dark-bg min-h-screen relative flex flex-col shadow-2xl shadow-zinc-900">
        {children}
      </div>
    </div>
  );
};

// --- Neon Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  neon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  neon = false, 
  ...props 
}) => {
  const baseStyles = "w-full py-4 rounded-xl font-bold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";
  
  const variants = {
    primary: `bg-neon text-white ${neon ? 'shadow-neon hover:shadow-neon-strong' : ''} hover:bg-neon-hover`,
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
    outline: "border-2 border-neon text-neon hover:bg-neon-dim",
    ghost: "bg-transparent text-gray-400 hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

// --- Input Field ---
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input 
      className="w-full bg-dark-input border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon focus:shadow-neon transition-all placeholder-zinc-600"
      {...props}
    />
  );
};

// --- Card ---
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`bg-dark-card border border-zinc-800 rounded-2xl p-5 ${className}`}>
      {children}
    </div>
  );
};

// --- Modal ---
export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode; title?: string }> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-dark-card border border-zinc-800 w-full max-w-sm rounded-2xl p-6 relative shadow-neon">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
        {title && <h3 className="text-xl font-bold mb-4 pr-8">{title}</h3>}
        {children}
      </div>
    </div>
  );
};

// --- Header ---
export const Header: React.FC<{ title: string; onBack?: () => void }> = ({ title, onBack }) => (
  <header className="p-4 flex items-center gap-4 bg-black/50 backdrop-blur-md sticky top-0 z-20 border-b border-zinc-900">
    {onBack && (
      <button onClick={onBack} className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors">
        <ChevronLeft size={20} />
      </button>
    )}
    <h1 className="text-xl font-bold tracking-wide">{title}</h1>
  </header>
);

// --- Bottom Navigation ---
interface NavBarProps {
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

export const BottomNav: React.FC<NavBarProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Нүүр' },
    { id: 'dailyTraining', icon: BookOpen, label: 'Дасгал' },
    { id: 'aiTutor', icon: MessageSquare, label: 'AI Багш' },
    { id: 'progress', icon: BarChart2, label: 'Ахиц' },
    { id: 'profile', icon: User, label: 'Профайл' },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-black/90 backdrop-blur-lg border-t border-zinc-900 pb-safe pt-2 px-2 z-50">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as ScreenName)}
              className={`flex flex-col items-center p-3 rounded-xl transition-all ${isActive ? 'text-neon' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'drop-shadow-[0_0_8px_rgba(162,89,255,0.6)]' : ''} />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};