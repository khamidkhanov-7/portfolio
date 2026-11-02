import { motion } from 'framer-motion';

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
};

export default function TextReveal({ text, className = '', delay = 0, stagger = 0.04 }: Props) {
  const words = text.split(' ');

  return (
    <span className={className} style={{ display: 'inline' }}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block" style={{ marginRight: '0.25em' }}>
          {word.split('').map((char, ci) => (
            <motion.span
              key={ci}
              initial={{ opacity: 0, y: '0.4em' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px 0px' }}
              transition={{
                delay: delay + (wi * word.length + ci) * stagger * 0.3,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}
