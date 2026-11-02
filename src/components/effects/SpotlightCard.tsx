import { useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
};

export default function SpotlightCard({ children, className = '', spotlightColor = 'rgba(232,197,71,0.08)' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty('--spotlight-x', `${x}px`);
    ref.current.style.setProperty('--spotlight-y', `${y}px`);
    ref.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`spotlight-card group relative ${className}`}
    >
      {children}
    </div>
  );
}
