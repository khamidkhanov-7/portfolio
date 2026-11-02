import { motion } from 'framer-motion';
import { ArrowDown, Github } from 'lucide-react';
import { OWNER } from '@/data/content';
import MagneticButton from '@/components/effects/MagneticButton';
import Parallax from '@/components/effects/Parallax';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

// Floating particle config
const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 4 + 4,
  delay: Math.random() * 3,
}));

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden noise-overlay"
    >
      {/* Animated background shapes */}
      <div className="pointer-events-none absolute inset-0">
        <Parallax speed={0.15} className="absolute left-[10%] top-[20%]">
          <div className="h-72 w-72 rounded-full bg-accent/5 blur-3xl animate-float-slow" />
        </Parallax>
        <Parallax speed={0.25} className="absolute right-[15%] bottom-[15%]">
          <div className="h-96 w-96 rounded-full bg-accent/8 blur-3xl animate-float-medium" />
        </Parallax>
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent/5 to-transparent blur-3xl" />
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-accent/30"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          {/* Status badge */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex items-center gap-3 rounded-full border border-ink-700 bg-ink-850/60 px-4 py-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-body text-sm text-ink-300">Available for new projects</span>
          </motion.div>

          {/* Name */}
          <motion.p
            variants={itemVariants}
            className="font-body text-sm uppercase tracking-[0.3em] text-accent"
          >
            {OWNER.role}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-4 max-w-4xl font-display text-[2rem] font-bold leading-[1.05] tracking-tight text-ink-100 min-[375px]:text-4xl sm:text-6xl lg:text-7xl"
          >
            Khamidkhanov{' '}
            <span className="text-gradient-accent">Mukhammazokhid</span>
          </motion.h1>

          {/* Value prop */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl font-body text-lg leading-relaxed text-ink-300"
          >
            I&apos;m a 16-year-old developer from Namangan. I build backends,
            websites, Telegram bots, and apps.
          </motion.p>

          {/* CTAs with magnetic effect */}
          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="group relative flex overflow-hidden rounded-xl bg-accent px-7 py-3.5 font-body text-sm font-semibold text-ink-950 transition-all hover:shadow-[0_0_30px_-5px_rgba(232,197,71,0.5)]">
                <span className="relative z-10">View my work</span>
                <span className="absolute inset-0 -translate-x-full bg-accent-soft transition-transform duration-300 group-hover:translate-x-0" />
              </span>
            </MagneticButton>

            <MagneticButton strength={0.25}>
              <a
                href={OWNER.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                className="group flex items-center gap-2 rounded-xl border border-ink-700 bg-ink-850/60 px-7 py-3.5 font-body text-sm font-medium text-ink-200 transition-all hover:border-ink-500 hover:text-ink-100"
              >
                <Github size={18} />
                GitHub
              </a>
            </MagneticButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.button
            variants={itemVariants}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            data-cursor="pointer"
            className="mt-16 flex items-center gap-2 font-body text-xs uppercase tracking-widest text-ink-400 transition-colors hover:text-ink-200"
          >
            <span>Scroll to explore</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={14} />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink-950 to-transparent" />
    </section>
  );
}
