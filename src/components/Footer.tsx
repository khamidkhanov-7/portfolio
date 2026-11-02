import { motion } from 'framer-motion';
import { Github, Instagram, Send, ArrowUp } from 'lucide-react';
import { OWNER, SOCIAL_LINKS } from '@/data/content';

const socials = [
  { icon: Github, label: 'GitHub', href: SOCIAL_LINKS.github },
  { icon: Instagram, label: 'Instagram', href: SOCIAL_LINKS.instagram },
  { icon: Send, label: 'Telegram', href: SOCIAL_LINKS.telegram },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-ink-800 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Left: name + copyright */}
          <div className="text-center md:text-left">
            <button
              onClick={scrollToTop}
              data-cursor="pointer"
              className="font-display text-lg font-bold text-ink-100 transition-colors hover:text-accent"
            >
              K<span className="text-accent">M</span>
            </button>
            <p className="mt-2 font-body text-xs text-ink-500">
              © {new Date().getFullYear()} {OWNER.name}. All rights reserved.
            </p>
          </div>

          {/* Center: socials */}
          <div className="flex items-center gap-4">
            {socials.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="group flex h-11 w-11 items-center justify-center rounded-lg border border-ink-700 bg-ink-850/60 text-ink-400 transition-all hover:border-accent/40 hover:text-accent"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Right: back to top */}
          <button
            onClick={scrollToTop}
            data-cursor="pointer"
            className="group flex items-center gap-2 font-body text-xs uppercase tracking-widest text-ink-400 transition-colors hover:text-ink-200"
          >
            <span>Back to top</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-700 transition-colors group-hover:border-accent/40 group-hover:text-accent">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
