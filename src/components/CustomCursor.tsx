import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // Smooth trailing for the ring
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    document.body.classList.add('custom-cursor-active');

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest('a, button, input, textarea, select, [role="button"], [data-cursor="pointer"]') !== null;
      setIsPointer(isInteractive);
    };

    const handleDown = () => setIsDown(true);
    const handleUp = () => setIsDown(false);
    const handleLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    document.addEventListener('mouseleave', handleLeave);

    // RAF loop for smooth trailing ring
    const animate = () => {
      ringPos.current.x += (position.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (position.y - ringPos.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${position.x}px`;
        dotRef.current.style.top = `${position.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      document.removeEventListener('mouseleave', handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [position.x, position.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring with trailing */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9999] rounded-full border transition-[width,height,opacity,border-color] duration-200 ease-out"
        style={{
          width: isPointer ? 48 : 28,
          height: isPointer ? 48 : 28,
          transform: `translate(-50%, -50%) scale(${isDown ? 0.85 : 1})`,
          opacity: isPointer ? 0.9 : 0.5,
          borderColor: isPointer ? '#e8c547' : 'rgba(232,197,71,0.5)',
          borderWidth: isPointer ? 1.5 : 1,
        }}
      />
      {/* Inner dot — instant follow */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] rounded-full bg-accent transition-[width,height,opacity] duration-150"
        style={{
          width: isPointer ? 8 : 6,
          height: isPointer ? 8 : 6,
          transform: 'translate(-50%, -50%)',
          opacity: isPointer ? 0.8 : 1,
        }}
      />
    </>
  );
}
