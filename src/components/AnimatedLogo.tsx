
import { useEffect, useState } from 'react';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  className?: string;
}

const AnimatedLogo = ({ size = 'md', isLoading = false, className = '' }: AnimatedLogoProps) => {
  const [mounted, setMounted] = useState(false);
  const [neuralPulse, setNeuralPulse] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // Animate neural connections
    const interval = setInterval(() => {
      setNeuralPulse(prev => (prev + 1) % 8);
    }, 300);
    
    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const pulseSize = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-18 h-18',
    xl: 'w-26 h-26'
  };

  const nodeSize = {
    sm: 'w-1 h-1',
    md: 'w-1.5 h-1.5',
    lg: 'w-2 h-2',
    xl: 'w-3 h-3'
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer pulse rings for loading state */}
      {isLoading && (
        <>
          <div 
            className={`absolute ${pulseSize[size]} rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 animate-ping`}
            style={{ animationDuration: '2s' }}
          />
          <div 
            className={`absolute ${pulseSize[size]} rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-ping`}
            style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
          />
        </>
      )}
      
      {/* Main logo container */}
      <div 
        className={`${sizeClasses[size]} relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-2xl transition-all duration-500 ${
          mounted ? 'animate-fade-in' : 'opacity-0'
        } ${
          isLoading ? 'animate-spin' : 'hover:scale-110 hover:shadow-2xl hover:rotate-12'
        }`}
        style={{ 
          animationDuration: isLoading ? '3s' : undefined,
          background: isLoading 
            ? 'conic-gradient(from 0deg, #4f46e5, #7c3aed, #ec4899, #4f46e5)' 
            : undefined
        }}
      >
        {/* Neural network background pattern */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          {/* Dynamic neural nodes */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`absolute ${nodeSize[size]} bg-white rounded-full transition-all duration-300`}
              style={{
                left: `${20 + (i % 3) * 30}%`,
                top: `${15 + Math.floor(i / 3) * 25}%`,
                opacity: neuralPulse === i ? 0.9 : 0.3,
                transform: `scale(${neuralPulse === i ? 1.5 : 1})`,
                boxShadow: neuralPulse === i ? '0 0 8px rgba(255,255,255,0.8)' : 'none'
              }}
            />
          ))}
          
          {/* Neural connections */}
          <svg className="absolute inset-0 w-full h-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={i}
                x1={`${25 + (i % 2) * 30}%`}
                y1={`${20 + Math.floor(i / 2) * 30}%`}
                x2={`${35 + ((i + 1) % 2) * 30}%`}
                y2={`${30 + Math.floor((i + 1) / 2) * 30}%`}
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
                className="animate-pulse"
                style={{ 
                  animationDelay: `${i * 0.2}s`,
                  strokeDasharray: '2,2'
                }}
              />
            ))}
          </svg>
        </div>
        
        {/* Central brain/cortex symbol */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="relative">
            {/* Main "C" for Cortex with enhanced styling */}
            <div className="text-white font-bold text-lg leading-none relative z-10 drop-shadow-lg">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                C
              </span>
            </div>
            
            {/* Orbiting particles */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 120}deg) translateX(12px) translateY(-50%)`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Rotating energy ring for loading */}
        {isLoading && (
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-white/60 via-transparent to-white/60 animate-spin" 
               style={{ animationDuration: '1.5s' }} />
        )}
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Floating particles around logo */}
      {mounted && !isLoading && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce-gentle opacity-60"
              style={{
                left: `${20 + i * 20}%`,
                top: `${10 + (i % 2) * 80}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.5}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimatedLogo;
