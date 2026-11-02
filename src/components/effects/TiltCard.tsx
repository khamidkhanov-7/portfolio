import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
};

export default function TiltCard({ children, className = '', maxTilt = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform({ rx: -py * maxTilt * 2, ry: px * maxTilt * 2 });
  };

  const handleMouseLeave = () => setTransform({ rx: 0, ry: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(800px) rotateX(${transform.rx}deg) rotateY(${transform.ry}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
