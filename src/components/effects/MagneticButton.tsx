import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
};

export default function MagneticButton({ children, className = '', strength = 0.35, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * strength, y: y * strength });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.3 }}
      onClick={onClick}
      data-cursor="pointer"
      className={className}
    >
      {children}
    </motion.div>
  );
}
