export const navLinks = [
  { label: 'Home',         id: 'home'         },
  { label: 'About',        id: 'about'        },
  { label: 'Services',     id: 'services'     },
  { label: 'Portfolio',    id: 'portfolio'    },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Contact',      id: 'contact'      },
];

export const stats = [
  { value: 240, suffix: '+', label: 'Projects Completed' },
  { value: 98,  suffix: '%', label: 'Happy Clients'      },
  { value: 12,  suffix: '+', label: 'Years Experience'   },
  { value: 40,  suffix: '+', label: 'Team Members'       },
];

export const services = [
  {
    icon: 'FiCode',
    title: 'Web Development',
    description: 'Crafting fast, scalable web applications with modern frameworks and best practices.',
    color: '#5A5A66',
  },
  {
    icon: 'FiSmartphone',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile experiences that users love on iOS and Android.',
    color: '#0EA5E9',
  },
  {
    icon: 'FiLayout',
    title: 'UI/UX Design',
    description: 'Human-centered design systems that balance aesthetics with intuitive usability.',
    color: '#F59E0B',
  },
  {
    icon: 'FiCloud',
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure, DevOps pipelines, and serverless architectures.',
    color: '#10B981',
  },
  {
    icon: 'FiShield',
    title: 'Cybersecurity',
    description: 'Protecting your digital assets with enterprise-grade security audits and solutions.',
    color: '#EF4444',
  },
  {
    icon: 'FiTrendingUp',
    title: 'Growth Analytics',
    description: 'Data-driven insights and dashboards that help you make smarter business decisions.',
    color: '#71717A',
  },
];

export const portfolio = [
  {
    title: 'Realtime Order Updates',
    category: 'Web App',
    description: 'Event-driven real-time order dashboard with PostgreSQL LISTEN/NOTIFY and WebSockets.',
    color: '#0f172a',
    status: 'Live',
    techStack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'TailwindCSS', 'WebSockets'],
    features: [
      'PostgreSQL LISTEN/NOTIFY triggers pushing database updates instantly.',
      'Fast Node.js/TypeScript backend acting as an event broker.',
      'Interactive React dashboard showing live orders with micro-interactions.',
      'Dynamic status transitions and order tracking alerts.'
    ],
    architecture: 'Event-driven system that bypasses polling by hooking directly into PostgreSQL\'s internal notification system and streaming updates to client viewports over secure WebSockets.',
    challenges: 'Preventing message loss and ordering issues during high-frequency DB writes was resolved by implementing a backend event-queue buffer and client-side state reconciling.',
    githubUrl: 'https://github.com/mayankraj019/realtime-order-updates',
    liveUrl: 'https://github.com/mayankraj019/realtime-order-updates'
  },
  {
    title: 'Plannora',
    category: 'Platform',
    description: 'All-in-one travel planning application that keeps your entire trip details on a single page.',
    color: '#051c2c',
    status: 'Live',
    techStack: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Node.js'],
    features: [
      'Consolidated single-page interactive layout for complete itineraries.',
      'Drag-and-drop scheduling cards with auto-time calculations.',
      'Integrated interactive maps visualizing route planning and stops.',
      'Offline mode support caching trip data in browser IndexedDB.'
    ],
    architecture: 'A modular React frontend utilizing TypeScript state machines to sync schedules, coupled with client-side caching for offline travel access.',
    challenges: 'Syncing complex schedule changes without page-reloads or database lag was solved by decoupling client-side layout states and using optimistic updates.',
    githubUrl: 'https://github.com/mayankraj019/Plannora',
    liveUrl: 'https://plannora.co.in'
  },
  {
    title: 'NextGeen Store',
    category: 'E-Commerce',
    description: 'Modern next-generation web store front with smooth transitions and premium product UI.',
    color: '#1b1e36',
    status: 'Live',
    techStack: ['JavaScript', 'React', 'TailwindCSS', 'Framer Motion', 'Stripe'],
    features: [
      'Immersive fluid product cards and micro-animations on hover.',
      'Dynamic filtering, searching, and instant cart updates.',
      'Frictionless checkout experience with integrated global payment gateways.',
      'Adaptive light and dark mode styling with premium shadows.'
    ],
    architecture: 'Component-driven React architecture designed for fast loading and maximum visual engagement, leveraging modern CSS grids and GPU-accelerated animations.',
    challenges: 'Maintaining layout smoothness during heavy graphics rendering of catalog lists was resolved using virtualized listings and lazy-loading image resources.',
    githubUrl: 'https://github.com/mayankraj019/nextgeen-store',
    liveUrl: 'https://github.com/mayankraj019/nextgeen-store'
  },
  {
    title: 'OpenKB',
    category: 'Platform',
    description: 'An open knowledge base system for collaborative documentation and information hubs.',
    color: '#0b1c15',
    status: 'Beta',
    techStack: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Markdown'],
    features: [
      'Rich text & markdown content editing with immediate preview render.',
      'Robust search bar utilizing fuzzy matching for quick topic discovery.',
      'Nested document structures showing parent-child relationship directories.',
      'Clean, minimal reader mode optimized for long-form reading.'
    ],
    architecture: 'Next.js static generation combined with dynamic API search endpoints to deliver near-instant page transitions and documentation load speeds.',
    challenges: 'Creating an intuitive nested directory controller that doesn\'t cause recursive re-renders was resolved using flat-state trees and memoized selectors.',
    githubUrl: 'https://github.com/mayankraj019/openkb',
    liveUrl: 'https://openkb-two.vercel.app'
  },
  {
    title: 'Faculty Dashboard',
    category: 'Web App',
    description: 'Administrative and course-management dashboard designed for university educators.',
    color: '#1c0d24',
    status: 'Live',
    techStack: ['JavaScript', 'React', 'CSS Modules', 'Chart.js', 'Express'],
    features: [
      'Dynamic course-management dashboards tracking student performances.',
      'Interactive grade distribution visualization using SVG graphs.',
      'Secure student registry and document upload controls.',
      'Quick announcement notification dispatch to class rosters.'
    ],
    architecture: 'RESTful dashboard design linking an Express backend server with a clean React state controller to monitor student progress markers.',
    challenges: 'Visualizing highly dense academic records and grading stats cleanly on compact displays was resolved using customizable data grid toggles and collapsible drawers.',
    githubUrl: 'https://github.com/mayankraj019/Faculty-Dashboard',
    liveUrl: 'https://faculty-dashboard-r5lj.onrender.com'
  },
  {
    title: 'Personal Portfolio',
    category: 'SaaS',
    description: 'Modern interactive developer portfolio showcasing expertise and project collections.',
    color: '#1f1a10',
    status: 'Live',
    techStack: ['React', 'TypeScript', 'Framer Motion', 'TailwindCSS', 'Vite'],
    features: [
      'Sleek, physics-based scroll triggers and parallax grid systems.',
      'Interactive terminal commands and tech stack badges.',
      'Seamless responsive designs scaling from mobile layouts to 4K.',
      'Custom theme toggle engine preserving theme choices locally.'
    ],
    architecture: 'Single-page React application powered by Vite, utilizing Framer Motion animation layouts to maintain smooth 60fps page transitions.',
    challenges: 'Optimizing SVG animations and parallax computations to run stutter-free on mobile devices was resolved by leveraging CSS hardware acceleration.',
    githubUrl: 'https://github.com/mayankraj019/myportfolio',
    liveUrl: 'https://myportfolio-ucgi.onrender.com'
  },
  {
    title: 'Handverse',
    category: 'Web App',
    description: 'Interactive frontend web application creating immersive design layouts.',
    color: '#1f1e0d',
    status: 'Live',
    techStack: ['HTML', 'CSS', 'JavaScript', 'TailwindCSS', 'Framer Motion'],
    features: [
      'Immersive user interfaces crafted with semantic HTML5 structural elements.',
      'Modern layout styles using custom responsive CSS flexbox and grids.',
      'Fluid page animations and transitions driven by lightweight JavaScript libraries.',
      'High performance asset loads and optimized vector SVG illustrations.'
    ],
    architecture: 'Static frontend presentation layer optimized for sub-second loads and direct browser compatibility without compilation.',
    challenges: 'Maintaining crisp layout bounds and smooth vector transforms across different mobile screen ratios was solved using viewport unit scaling.',
    githubUrl: 'https://github.com/mayankraj019/Handverse',
    liveUrl: 'https://handverse-so54.vercel.app'
  }
];

export const milestones = [
  { year: '2022', title: 'The Spark', desc: 'Began exploring advanced React patterns, Framer Motion transitions, and complex responsive architectures.' },
  { year: '2023', title: 'Visual Depth', desc: 'Integrated custom WebGL canvases, 3D math projections, and optimized proximity indicators.' },
  { year: '2024', title: 'Enterprise Products', desc: 'Built real-time collaborative state platforms, low-latency micro-frontends, and high-performance charts.' },
  { year: '2025', title: 'FAANG & Design Awards', desc: 'Crafting spatial interfaces, fluid expansion portals, and Awwwards-level interactive portfolios.' }
];

export const features = [
  { icon: 'FiZap',       title: 'Lightning Fast',    description: 'Optimized for performance with sub-second load times and 60fps animations.' },
  { icon: 'FiLayers',    title: 'Fully Responsive',  description: 'Pixel-perfect layouts that adapt beautifully from mobile to 4K displays.'   },
  { icon: 'FiEye',       title: 'Accessible',        description: 'WCAG 2.1 AA compliant with full keyboard navigation and screen reader support.' },
];

export const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, Nexus Technologies',
    initials: 'SC',
    color: '#5A5A66',
    rating: 5,
    text: 'The navigation system they built is incredibly intuitive. Our user engagement increased by 40% within the first month. Best decision we made for our product.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Founder, LaunchPad',
    initials: 'MJ',
    color: '#0EA5E9',
    rating: 5,
    text: 'Absolutely phenomenal work. The attention to detail in animations and micro-interactions is something I\'ve never seen before. Our clients are blown away.',
  },
  {
    name: 'Priya Nair',
    role: 'Head of Design, Craft Studio',
    initials: 'PN',
    color: '#10B981',
    rating: 5,
    text: 'They delivered a premium SaaS experience that exceeded every expectation. The dark mode implementation and responsive design are absolutely flawless.',
  },
  {
    name: 'David Reeves',
    role: 'Product Lead, Orbit Systems',
    initials: 'DR',
    color: '#F59E0B',
    rating: 5,
    text: 'From concept to deployment in record time without compromising quality. The Framer Motion animations feel native and smooth on every device we tested.',
  },
];
