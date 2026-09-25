// ─────────────────────────────────────────────────────────────
//  Case studies. Each project gets a page at /work/:slug.
//
//  ✏️  Please verify `role`, `year` and `stack` for each project —
//      they are best guesses and should reflect what you actually did.
//
//  🖼  Screenshots: drop images into /public/projects/<slug>/ and list
//      them in `images` (first one is used as the cover). Until then,
//      each project renders its own generative artwork (see ProjectArt).
// ─────────────────────────────────────────────────────────────

export const projects = [
  {
    slug: 'studio-hr',
    title: 'Studio HR',
    fullTitle: 'Studio HR Soundroom',
    url: 'https://studiohr.in/',
    category: 'Audio Production Studio',
    year: '2025',
    role: 'Design & Development',
    tagline: 'A website for a studio that builds worlds out of sound — made by someone who speaks the same language.',
    theme: { bg: '#1a0f24', fg: '#f3e9ff', accent: '#ff7a3d', art: 'sound' },
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    images: [],
    overview:
      'Studio HR Soundroom is a full-service audio production house from Indore, producing audio stories, audiobooks and podcasts end to end — narration, sound design, foley, mixing, mastering and spec-compliant delivery. They work with storytelling platforms, publishers, podcast networks and independent artists.',
    challenge:
      'An audio studio has a strange problem on the web: its best work is invisible. The site needed to let visitors hear the craft within seconds, explain six very different services without becoming a wall of text, and convince large platforms that a boutique team can deliver at volume.',
    approach: [
      'Positioned the whole story around one line — boutique craft, built for high-volume scale — and let every section prove one half of it.',
      'Put real portfolio audio directly on the page, so the work is one click away rather than buried behind a contact form.',
      'Broke the offer into six clear service pillars, from audio stories to QC & delivery, each scannable in a single glance.',
      'Kept the navigation minimal and added a downloadable company profile for procurement teams who need a PDF, not a pitch.',
    ],
    features: [
      { title: 'Listen-first portfolio', text: 'Embedded audio samples let visitors judge the production quality instantly.' },
      { title: 'Six service pillars', text: 'Audio stories, audiobooks, podcasts, sound design, mix & master and QC — each with its own clear promise.' },
      { title: 'Built for scale buyers', text: 'Messaging and structure aimed at platforms and publishers running large production slates.' },
      { title: 'Company profile', text: 'A one-tap PDF profile for partners and procurement teams.' },
    ],
    outcome:
      'A calm, confident home for the studio that lets the audio do the talking — and a project where my two worlds, code and music, finally sat in the same room.',
  },
  {
    slug: 'sj-travels',
    title: 'SJ Travels',
    fullTitle: 'SJ Travels',
    url: 'https://www.sjtravels.in/',
    category: 'Travel Agency',
    year: '2025',
    role: 'Design & Development',
    tagline: 'Minimal hassle, maximum memories — a travel agency site that feels like the start of the trip.',
    theme: { bg: '#0d2227', fg: '#e8f6f3', accent: '#ffb347', art: 'horizon' },
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    images: [],
    overview:
      'SJ Travels plans end-to-end holidays across India and abroad — flights, stays from hotels to homestays, day-by-day itineraries, visa guidance, transfers and experiences — for honeymooners, families and groups of friends.',
    challenge:
      'Travel sites tend to drown people in packages and pop-ups. The brief was the opposite: make a small agency feel trustworthy and personal, show the destinations people actually dream about, and turn browsing into a conversation without a heavy booking engine.',
    approach: [
      'Led with destinations — Kashmir, Ladakh, Goa, Kerala, Rajasthan, Andaman, Bali — because that is where every trip really begins.',
      'Turned the service into a simple four-step story: tell us your dream → get a tailored plan → book in one go → travel with support.',
      'Replaced a complex checkout with lightweight enquiry flows that land straight in the team’s inbox, matching how the business actually sells.',
      'Surfaced the promises that matter — flexible plans, no hidden fees, 24-hour support and itinerary drafts within a day — alongside real testimonials.',
    ],
    features: [
      { title: 'Destination showcase', text: 'Curated domestic and international highlights that invite exploration.' },
      { title: 'Four-step journey', text: 'A clear, reassuring process from first idea to on-trip support.' },
      { title: 'Frictionless enquiries', text: 'Direct enquiry links instead of long forms — faster for travellers and the team.' },
      { title: 'Trust layer', text: 'Testimonials and transparent value props placed exactly where doubts appear.' },
    ],
    outcome:
      'A clean, mobile-first site that sells the feeling of the trip, keeps the agency’s personal touch, and makes the next step obvious.',
  },
  {
    slug: 'trip-unplanned',
    title: 'Trip Unplanned',
    fullTitle: 'Trip Unplanned',
    url: 'https://tripunplanned.in/',
    category: 'Product · Social Travel Platform',
    year: '2026',
    role: 'Founder · Product & Full-stack',
    tagline: 'Never cancel a trip because your friends said no.',
    theme: { bg: '#0f1f14', fg: '#eaf7e6', accent: '#c6f432', art: 'route' },
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Supabase', 'Tailwind CSS'],
    images: [],
    overview:
      'Trip Unplanned is a platform for people who are done waiting on flaky group chats. Post a trip, find compatible travel companions, and plan the whole journey together in one place — from the itinerary to who owes whom.',
    challenge:
      'Group travel breaks down in two places: finding people who will actually show up, and coordinating everything once they do. That coordination usually lives across a spreadsheet, three group chats and a notes app. The product had to replace all of them without feeling like project-management software.',
    approach: [
      'Split the product into two clear halves — discovery (post trips, browse trips, review traveller profiles for compatibility) and planning (everything that happens after people say yes).',
      'Designed a single trip workspace that holds a day-by-day itinerary, shared expenses with automatic settlements, group voting, packing lists and tasks with owners and deadlines.',
      'Added the unglamorous essentials that make trips safer — emergency contacts and destination weather — right inside the group space.',
      'Shipped Phase 1 as a free beta with twelve live features, so real trips could shape the roadmap.',
    ],
    features: [
      { title: 'Trip matching', text: 'Post a trip, discover others, and review profiles to find the right companions.' },
      { title: 'Collaborative itinerary', text: 'Day-by-day plans the whole group builds together.' },
      { title: 'Split & settle', text: 'Shared expense tracking that works out settlements automatically.' },
      { title: 'Decide together', text: 'Group voting, tasks with owners and deadlines, and curated packing lists.' },
      { title: 'Group chat', text: 'A dedicated chat per trip, so plans never get lost in other threads.' },
      { title: 'Safety built in', text: 'Emergency contacts and weather forecasts for every destination.' },
    ],
    outcome:
      'A live beta with real trips already posted — Spiti Valley, Vietnam, Gokarna — and a foundation built to grow well past its first twelve features.',
  },
  {
    slug: 'ratecraft',
    title: 'RateCraft',
    fullTitle: 'RateCraft',
    url: 'https://ratecraft.vercel.app/',
    category: 'Product · SaaS Tool',
    year: '2026',
    role: 'Product, Design & Development',
    tagline: 'Build beautiful rate cards, fast.',
    theme: { bg: '#0e1430', fg: '#e8ecff', accent: '#7c9cff', art: 'cards' },
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    images: [],
    overview:
      'RateCraft is a focused tool for freelancers, creators and small agencies who need to share their pricing. Instead of wrestling with a design tool every time prices change, you fill in your services and get a polished rate card.',
    challenge:
      'Rate cards are a tiny document with a big job — they are often the first “official” thing a client sees. People either send a messy text message or lose an hour in a design app. The tool needed to be quicker than both, and look better than either.',
    approach: [
      'Kept the scope ruthlessly small: one job, done in minutes, with nothing to learn.',
      'Separated content from presentation so the same services can be re-styled instantly without re-typing anything.',
      'Designed layouts with strong typographic defaults so every card looks intentional, even with zero design effort.',
      'Deployed on Vercel for instant loads and simple, continuous releases.',
    ],
    features: [
      { title: 'Structured input', text: 'Add services, packages and prices once — the layout takes care of itself.' },
      { title: 'Live preview', text: 'See the card update as you type, so there are no surprises.' },
      { title: 'Designed defaults', text: 'Beautiful, consistent typography and spacing out of the box.' },
      { title: 'Share-ready', text: 'A clean, professional result that is ready to send to clients.' },
    ],
    outcome:
      'A small, sharp product that turns an hour of fiddling into a few minutes — and a playground for fast, opinionated UI.',
  },
  {
    slug: 'pro-packages',
    title: 'Pro Packages',
    fullTitle: 'Pro Packages',
    url: 'https://pro-packages.vercel.app/',
    category: 'Engineering Studio',
    year: '2026',
    role: 'Design & Development',
    tagline: 'Web, mobile and cloud engineering — built with care, from concept to scale.',
    theme: { bg: '#161616', fg: '#f2f2ec', accent: '#d7ff3a', art: 'stack' },
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    images: [],
    overview:
      'Pro Packages is an India-based digital product studio working globally across web apps, React Native mobile apps, full-stack engineering, cloud & DevOps and UI/UX — for startups building an MVP and enterprises that need secure, scalable systems.',
    challenge:
      'Studios all say the same things. The site had to show real engineering depth across five disciplines and many technologies, while still feeling crafted and human — and guide very different buyers, from founders to enterprise teams, to the right conversation.',
    approach: [
      'Structured the site as a clear narrative: who we are → services → tech stack → solutions → process → FAQ & contact.',
      'Built a tech-stack explorer that can be filtered by layer, so technical buyers can find their tools in seconds.',
      'Mapped work to six solution types — SaaS, mobile, e-commerce, enterprise, migrations and prototypes — so visitors see themselves in the offer.',
      'Explained delivery through a four-phase process: Discover → Design → Build → Launch & Scale.',
    ],
    features: [
      { title: 'Five disciplines', text: 'Web, mobile, full-stack, cloud & DevOps and UI/UX, each with a crisp promise.' },
      { title: 'Filterable stack', text: 'An interactive tech-stack section filterable by layer.' },
      { title: 'Solutions map', text: 'Six use-case categories that meet buyers where they are.' },
      { title: 'Process & FAQ', text: 'A transparent four-phase process and answers to the questions that stall deals.' },
    ],
    outcome:
      'A credible, design-conscious home for the studio that balances technical depth with warmth — and makes starting a project feel easy.',
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)

export const getNextProject = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
