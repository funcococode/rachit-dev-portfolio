// ─────────────────────────────────────────────────────────────
//  Everything personal lives here. Edit this file, not components.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Rachit Shrivastava',
  firstName: 'Rachit',
  lastName: 'Shrivastava',
  initials: 'RS',
  role: 'Full-stack Developer',
  experience: 5,
  location: 'India',
  timezone: 'Asia/Kolkata',
  email: 'work.rachits@gmail.com',
  available: true,
  socials: [
    // Replace the # with your real profile URLs
    { label: 'GitHub', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Spotify', href: 'https://open.spotify.com/artist/5k3Iw8VrxwZyFdi4dBPeBn' },
    { label: 'Apple Music', href: 'https://music.apple.com/us/artist/rachit-shrivastava/1534713336' },
  ],
}

// ─── Music ─────────────────────────────────────────────────────
// `apple` = the release on Apple Music. `spotify` is optional — paste a
// track/album link to replace the default (a Spotify search for the song).
export const music = {
  spotify: 'https://open.spotify.com/artist/5k3Iw8VrxwZyFdi4dBPeBn',
  appleMusic: 'https://music.apple.com/us/artist/rachit-shrivastava/1534713336',
  releases: [
    { title: 'Aaja Nindiya', year: 2025, length: '3:19', with: 'Chirag Soni, Vishal Pande', genre: 'Indian Pop', apple: 'https://music.apple.com/us/album/aaja-nindiya-single/1790373988' },
    { title: 'Darmiyaan', year: 2024, length: '3:29', with: 'Swapnil Tare', genre: 'Indian Pop', apple: 'https://music.apple.com/us/album/darmiyaan-single/1732836549' },
    { title: 'Kohra (Acoustic)', year: 2024, length: '4:02', with: 'Moin, Roshan Bhat, Jay Rathod', genre: 'Pop', apple: 'https://music.apple.com/us/album/kohra-acoustic-single/1878777600' },
    { title: 'Humdum Tera', year: 2023, length: '3:08', with: 'Swapnil Tare', genre: 'Indian Pop', apple: 'https://music.apple.com/us/album/humdum-tera-single/1735041192' },
    { title: 'Namostute', year: 2022, length: '2:27', feature: 'Priyanshu Soni', genre: 'Devotional', apple: 'https://music.apple.com/us/album/namostute-feat-prateeksha-srivastava-priyanshi-srivastava/1649077602' },
    { title: 'Khidki', year: 2021, length: '3:15', genre: 'Ambient', apple: 'https://music.apple.com/us/album/khidki-single/1574440113' },
    { title: 'Riwayatein', year: 2021, length: '2:52', genre: 'Ambient', apple: 'https://music.apple.com/us/album/riwayatein-single/1565661777' },
    { title: 'Amma Puchhdi', year: 2020, length: '3:07', genre: 'Regional Indian · Traditional', apple: 'https://music.apple.com/us/album/amma-puchhdi-single/6783888122' },
  ],
}

export const spotifyFor = (r) =>
  r.spotify ?? `https://open.spotify.com/search/${encodeURIComponent(`${r.title} Rachit Shrivastava`)}`

export const roles = ['Singer', 'Songwriter', 'Composer', 'Producer']

export const stack = [
  {
    group: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Native'],
  },
  {
    group: 'Backend',
    items: ['Node.js', 'PHP', 'Laravel', 'REST & GraphQL', 'Prisma', 'Auth'],
  },
  {
    group: 'Data',
    items: ['PostgreSQL', 'MySQL', 'Firebase', 'Supabase', 'Redis'],
  },
  {
    group: 'Cloud & DevOps',
    items: ['AWS', 'Google Cloud', 'Docker', 'Vercel', 'CI / CD'],
  },
]

export const marqueeStack = [
  'React', 'Next.js', 'Tailwind', 'AWS', 'Docker', 'PostgreSQL', 'MySQL',
  'Google Cloud', 'Firebase', 'Laravel', 'Node.js', 'React Native', 'TypeScript',
]

export const capabilities = [
  {
    title: 'Frontend Engineering',
    text: 'Interfaces in React and Next.js that are fast, accessible and alive — design systems, motion, and the small interactions people feel before they notice.',
    tags: ['React', 'Next.js', 'Tailwind', 'Motion'],
  },
  {
    title: 'Backend & APIs',
    text: 'Clean, typed services in Node.js and Laravel. Sensible schemas, predictable APIs, auth that just works, and data models that survive the next feature request.',
    tags: ['Node.js', 'Laravel', 'Postgres', 'MySQL'],
  },
  {
    title: 'Cloud & DevOps',
    text: 'Containerised apps shipped to AWS and Google Cloud with repeatable pipelines — so deploying on a Friday is boring, in the best way.',
    tags: ['AWS', 'GCP', 'Docker', 'CI/CD'],
  },
  {
    title: 'Mobile Apps',
    text: 'Cross-platform React Native apps that share logic with the web and still feel native in the hand.',
    tags: ['React Native', 'Firebase', 'Expo'],
  },
]

export const process = [
  {
    k: 'Listen',
    title: 'Listen first',
    text: 'Every good song starts with the right question. I dig into the problem, the people and the constraints before touching an editor.',
  },
  {
    k: 'Compose',
    title: 'Compose the system',
    text: 'Architecture, data models and flows get sketched out — the arrangement that everything else will sit on.',
  },
  {
    k: 'Record',
    title: 'Record, iterate',
    text: 'Build in small, shippable takes. Real feedback early, polish where it matters, no dead code left on the cutting-room floor.',
  },
  {
    k: 'Master',
    title: 'Master & release',
    text: 'Performance, accessibility, SEO and deployment tuned until it sounds right on every device. Then it ships.',
  },
]

// ─── Curiosities (the "What else I do" page) ──────────────────
export const curiosities = {
  physics: {
    title: 'Physics',
    kicker: 'From quarks to the cosmos',
    text: 'I love reading about how the universe works at every scale — the birth and fate of the cosmos, the strange zoo of particles that makes up everything, and the quiet weirdness of quantum mechanics. It keeps me humble and endlessly curious.',
    topics: ['Cosmology', 'Particle physics', 'Quantum mechanics', 'Relativity', 'Astrophysics'],
    quote: { text: 'We are a way for the cosmos to know itself.', by: 'Carl Sagan' },
  },
  philosophy: {
    title: 'Philosophy',
    kicker: 'Questions without an undo button',
    text: 'Philosophy is where I go to think slowly. I read about the mind, meaning, ethics and what we can really know — the kind of questions that don’t have answers so much as better ways of asking them.',
    topics: ['Metaphysics', 'Philosophy of mind', 'Ethics', 'Existentialism', 'Epistemology'],
    questions: [
      { q: 'Why is there something rather than nothing?', by: 'Leibniz' },
      { q: 'What is it like to be a bat?', by: 'Thomas Nagel' },
      { q: 'Can you step into the same river twice?', by: 'Heraclitus' },
      { q: 'Is the self a story we keep telling?', by: 'Open question' },
      { q: 'Does free will survive physics?', by: 'Open question' },
      { q: 'What do we owe to each other?', by: 'T. M. Scanlon' },
    ],
  },
  travel: {
    title: 'Travel',
    kicker: 'Always one trip away',
    text: 'I love being on the road — new places, new people, and the kind of perspective you only get far from your desk. It’s also why I built Trip Unplanned: so a trip never gets cancelled just because friends said no.',
    topics: ['Mountains', 'Old cities', 'Road trips', 'Slow travel', 'Local food'],
    board: ['Mountains', 'Coastlines', 'Old cities', 'Night skies', 'Slow trains', 'Unplanned'],
    project: 'trip-unplanned',
  },
}
