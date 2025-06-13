import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  gradient = false 
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl
        ${gradient ? 'bg-gradient-to-br from-white/20 to-white/5' : ''}
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        ${hover ? 'hover:shadow-[0_16px_48px_0_rgba(31,38,135,0.5)]' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};