import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = NAV_LINKS.map((link) => link.id);
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-ink-700/50' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          {/* Logo with hover effect */}
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-2"
            data-cursor="pointer"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="font-display text-xl font-bold tracking-tight text-ink-100"
            >
              K<span className="text-accent">M</span>
            </motion.span>
            <span className="hidden font-body text-xs text-ink-400 transition-colors group-hover:text-ink-300 sm:block">
              / Full-Stack Dev
            </span>
          </button>

          {/* Desktop nav with dot indicators */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  data-cursor="pointer"
                  className={`relative px-4 py-2 font-body text-sm transition-colors ${
                    activeSection === link.id
                      ? 'text-ink-100'
                      : 'text-ink-400 hover:text-ink-200'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-lg bg-ink-800/80"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Active dot */}
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA with glow */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNavClick('contact')}
            data-cursor="pointer"
            className="hidden rounded-lg border border-accent/40 bg-accent/10 px-5 py-2 font-body text-sm font-medium text-accent transition-all hover:bg-accent/20 hover:shadow-[0_0_20px_-4px_rgba(232,197,71,0.4)] md:block"
          >
            Let&apos;s talk
          </motion.button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            data-cursor="pointer"
            className="text-ink-200 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu with stagger + slide */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 glass md:hidden"
          >
            <motion.div
              initial={{ clipPath: 'circle(0% at 100% 0%)' }}
              animate={{ clipPath: 'circle(150% at 100% 0%)' }}
              exit={{ clipPath: 'circle(0% at 100% 0%)' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 bg-ink-950/80"
            />
            <div className="relative flex h-full flex-col items-center justify-center gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                  onClick={() => handleNavClick(link.id)}
                  className={`font-display text-2xl font-medium transition-colors ${
                    activeSection === link.id ? 'text-accent' : 'text-ink-200'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + NAV_LINKS.length * 0.07, duration: 0.4 }}
                onClick={() => handleNavClick('contact')}
                className="mt-4 rounded-lg border border-accent/40 bg-accent/10 px-6 py-2.5 font-body text-sm font-medium text-accent"
              >
                Let&apos;s talk
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
