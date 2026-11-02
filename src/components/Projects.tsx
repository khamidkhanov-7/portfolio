import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { PROJECTS } from '@/data/content';
import TiltCard from '@/components/effects/TiltCard';
import SpotlightCard from '@/components/effects/SpotlightCard';

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="font-body text-xs uppercase tracking-[0.3em] text-accent">03 — Projects</span>
          <span className="h-px flex-1 bg-gradient-to-r from-ink-700 to-transparent" />
        </motion.div>

        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl font-display text-3xl font-semibold leading-tight text-ink-100 sm:text-4xl lg:text-5xl"
          >
            Selected <span className="text-gradient-accent">work</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-sm text-ink-400"
          >
            A few projects I&apos;m proud of.
          </motion.p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: (i % 2) * 0.15, duration: 0.6, ease: 'easeOut' }}
              className={i % 4 === 0 || i % 4 === 3 ? 'md:col-span-2' : ''}
            >
              <TiltCard maxTilt={5}>
                <SpotlightCard
                  className="group relative overflow-hidden rounded-2xl border border-ink-800 bg-ink-850/40 p-6 transition-colors hover:border-ink-600 lg:p-8"
                  spotlightColor="rgba(232,197,71,0.12)"
                >
                  {/* Gradient accent */}
                  <div
                    className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br ${project.accent} blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      {/* Project number with animated reveal */}
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="font-body text-xs text-ink-500"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </motion.span>

                      <h3 className="mt-2 font-display text-2xl font-semibold text-ink-100 transition-colors group-hover:text-accent">
                        {project.title}
                      </h3>

                      <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-ink-400">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-ink-700 bg-ink-800/60 px-2.5 py-1 font-body text-xs text-ink-300 transition-colors group-hover:border-ink-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 sm:flex-col">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="pointer"
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-700 bg-ink-850/60 text-ink-300 transition-all hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
                          aria-label={`${project.title} GitHub`}
                        >
                          <Github size={18} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="pointer"
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-700 bg-ink-850/60 text-ink-300 transition-all hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
                          aria-label={`${project.title} live demo`}
                        >
                          <ArrowUpRight size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
