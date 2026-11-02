import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS } from '@/data/content';
import SpotlightCard from '@/components/effects/SpotlightCard';

const categories = ['All', 'Backend', 'Frontend', 'Database', 'Apps', 'Tools'];

const categoryColors: Record<string, string> = {
  Frontend: 'text-sky-400',
  Backend: 'text-emerald-400',
  Database: 'text-amber-400',
  Apps: 'text-rose-400',
  Tools: 'text-violet-400',
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills =
    activeCategory === 'All'
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative overflow-x-clip py-28 lg:py-36">
      {/* Background accent */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="font-body text-xs uppercase tracking-[0.3em] text-accent">02 — Skills</span>
          <span className="h-px flex-1 bg-gradient-to-r from-ink-700 to-transparent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl font-display text-3xl font-semibold leading-tight text-ink-100 sm:text-4xl lg:text-5xl"
        >
          Technologies I{' '}
          <span className="text-gradient-accent">work with</span>.
        </motion.h2>

        {/* Interactive category filters */}
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveCategory(cat)}
              data-cursor="pointer"
              className={`relative rounded-full border px-4 py-1.5 font-body text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'border-accent/40 bg-accent/10 text-accent'
                  : 'border-ink-700 bg-ink-850/60 text-ink-400 hover:text-ink-200'
              } ${cat !== 'All' ? categoryColors[cat] : ''}`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.span
                  layoutId="skill-filter-active"
                  className="absolute inset-0 -z-10 rounded-full bg-accent/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Skills grid with AnimatePresence for filtering */}
        <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: (i % 3) * 0.05, duration: 0.4, ease: 'easeOut' }}
                whileHover={{ y: -4 }}
                data-cursor="pointer"
              >
                <SpotlightCard className="relative overflow-hidden rounded-xl border border-ink-800 bg-ink-850/40 p-5 transition-colors hover:border-ink-600">
                  {/* Hover glow */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-all duration-500 group-hover:bg-accent/10" />

                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink-100">{skill.name}</h3>
                      <p className={`mt-0.5 font-body text-xs ${categoryColors[skill.category]}`}>
                        {skill.category}
                      </p>
                    </div>
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="font-display text-2xl font-bold text-ink-700 transition-colors group-hover:text-accent/40"
                    >
                      {skill.level}
                    </motion.span>
                  </div>

                  {/* Progress bar */}
                  <div className="relative z-10 mt-4 h-1.5 overflow-hidden rounded-full bg-ink-800">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + (i % 3) * 0.1, duration: 0.8, ease: 'easeOut' }}
                      className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-accent-deep to-accent"
                    />
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
