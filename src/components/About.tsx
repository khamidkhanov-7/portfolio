import { motion } from 'framer-motion';
import { Code2, Server, Sparkles } from 'lucide-react';
import TextReveal from '@/components/effects/TextReveal';
import AnimatedCounter from '@/components/effects/AnimatedCounter';
import SpotlightCard from '@/components/effects/SpotlightCard';

const stats = [
  { value: 2, suffix: '', label: 'Years of experience' },
  { value: 10, suffix: '+', label: 'Projects built' },
  { value: 10, suffix: '+', label: 'Technologies' },
];

const traits = [
  {
    icon: Code2,
    title: 'Backend first',
    desc: 'I completed a full backend course and mostly build APIs with Python, FastAPI, and Django.',
  },
  {
    icon: Server,
    title: 'Websites to bots',
    desc: 'I also build the frontend with React, plus Telegram bots and apps.',
  },
  {
    icon: Sparkles,
    title: 'Always learning',
    desc: 'Every new project teaches me something, and I try to make the next one better.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="font-body text-xs uppercase tracking-[0.3em] text-accent">01 — About</span>
          <span className="h-px flex-1 bg-gradient-to-r from-ink-700 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink-100 sm:text-4xl lg:text-5xl">
              <TextReveal text="I'm 16, and I've been " />
              <span className="text-gradient-accent">
                <TextReveal text="coding" delay={0.3} />
              </span>{' '}
              <TextReveal text="for 2 years." delay={0.5} />
            </h2>
            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-ink-300">
              I&apos;m a young developer from Namangan, Uzbekistan. I work
              mostly on the backend with Python and FastAPI, and I also build
              websites with React and Node.js, Telegram bots, and apps.
            </p>
            <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-ink-400">
              I learn best by building real things, so most of what I know
              comes from my own projects. You can see them below and on my
              GitHub.
            </p>

            {/* Stats with animated counters */}
            <div className="mt-12 flex flex-wrap gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <div className="font-display text-3xl font-bold text-accent">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 font-body text-sm text-ink-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: avatar + traits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            {/* Avatar placeholder with rotating ring */}
            <div className="relative mb-8 aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-ink-700 bg-gradient-to-br from-ink-850 to-ink-900">
              {/* Rotating accent ring */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl">
                <motion.div
                  className="absolute inset-0 rounded-2xl border border-accent/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{
                    background:
                      'conic-gradient(from 0deg, transparent 0%, rgba(232,197,71,0.3) 25%, transparent 50%, rgba(232,197,71,0.15) 75%, transparent 100%)',
                    padding: '1px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-7xl font-bold text-ink-700">KM</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <div className="font-display text-sm font-semibold text-ink-100">Khamidkhanov M.</div>
                  <div className="font-body text-xs text-ink-400">Full-Stack Developer</div>
                </div>
                <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              </div>
            </div>

            {/* Traits with spotlight */}
            <div className="space-y-4">
              {traits.map((trait, i) => (
                <motion.div
                  key={trait.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <SpotlightCard className="flex gap-4 rounded-xl border border-ink-800 bg-ink-850/40 p-4 transition-colors hover:border-ink-600">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform group-hover:scale-110">
                      <trait.icon size={20} />
                    </div>
                    <div className="relative z-10">
                      <h3 className="font-body text-sm font-semibold text-ink-100">{trait.title}</h3>
                      <p className="mt-1 font-body text-sm leading-relaxed text-ink-400">{trait.desc}</p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
