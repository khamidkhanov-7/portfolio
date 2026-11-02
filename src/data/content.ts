export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;

export const SOCIAL_LINKS = {
  github: 'https://github.com/khamidkhanov-7',
  instagram: 'https://instagram.com/khamidkhanov.7',
  telegram: 'https://t.me/khamidkhanov7',
} as const;

export const OWNER = {
  name: 'Khamidkhanov Mukhammazokhid',
  firstName: 'Mukhammazokhid',
  role: 'Full-Stack Developer',
  github: 'https://github.com/khamidkhanov-7',
  email: 'khamidkhanovv7@gmail.com',
  location: 'Namangan, Uzbekistan',
};

// Contact form messages are delivered to this inbox through FormSubmit
export const CONTACT_INBOX = 'valihon55@gmail.com';

export const SKILLS = [
  { name: 'Python', category: 'Backend', level: 90 },
  { name: 'FastAPI', category: 'Backend', level: 85 },
  { name: 'Django', category: 'Backend', level: 85 },
  { name: 'Node.js', category: 'Backend', level: 80 },
  { name: 'Supabase', category: 'Backend', level: 80 },
  { name: 'PostgreSQL', category: 'Database', level: 80 },
  { name: 'HTML', category: 'Frontend', level: 95 },
  { name: 'CSS', category: 'Frontend', level: 90 },
  { name: 'React', category: 'Frontend', level: 85 },
  { name: 'TypeScript', category: 'Frontend', level: 80 },
  { name: 'Next.js', category: 'Frontend', level: 75 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 90 },
  { name: 'Telegram Bots', category: 'Apps', level: 85 },
  { name: 'App Development', category: 'Apps', level: 75 },
  { name: 'Git', category: 'Tools', level: 90 },
] as const;

export const PROJECTS = [
  {
    title: 'Namanganmash Industrial 3D',
    description:
      'A 3D website for an industrial equipment manufacturer in Namangan, presenting the company, its strengths, and its partners.',
    tags: ['3D', 'Animation', 'Company website'],
    github: null,
    demo: 'https://namanganmash.vercel.app/',
    accent: 'from-amber-500/20 to-orange-500/10',
  },
  {
    title: 'Namanganmash Pipe Fittings',
    description:
      'A company website with a product catalog, a gallery, a contact form, and three languages: Uzbek, Russian, and English.',
    tags: ['Multilingual', 'Product catalog', 'Contact form'],
    github: null,
    demo: 'https://namanganmash1.vercel.app/',
    accent: 'from-sky-500/20 to-blue-500/10',
  },
  {
    title: 'Namanganmash Telegram Bot',
    description:
      'The Telegram bot for Namanganmash. You can open it and try it yourself: @Namanganmash_bot.',
    tags: ['Telegram Bot', 'Namanganmash'],
    github: null,
    demo: 'https://t.me/Namanganmash_bot',
    accent: 'from-rose-500/20 to-pink-500/10',
  },
  {
    title: 'DevOverflow',
    description:
      'A Stack Overflow-style question and answer platform with a Django REST backend and a React frontend.',
    tags: ['Django REST', 'React', 'TypeScript', 'JWT'],
    github: 'https://github.com/khamidkhanov-7/project',
    demo: null,
    accent: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    title: 'Chat API',
    description:
      'A backend for a chat app with JWT login, private messages, group chat rooms, and member management.',
    tags: ['Python', 'Django REST', 'JWT'],
    github: 'https://github.com/khamidkhanov-7/chat',
    demo: null,
    accent: 'from-violet-500/20 to-indigo-500/10',
  },
] as const;
