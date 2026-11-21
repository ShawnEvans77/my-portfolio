// ── Content ──────────────────────────────────────────────────────────────────
// All wording here mirrors the resume; edit text in this file only.

export type Shot = {
  src: string;
  alt: string;
  caption: string;
  /** "contain" letterboxes wide/short shots instead of cropping them. */
  fit?: "cover" | "contain";
};

export type Project = {
  slug: string;
  title: string;
  tech: readonly string[];
  /** Prize or recognition, shown as a badge above the title. */
  award?: string;
  /** One-paragraph overview shown above the bullets. */
  summary?: string;
  bullets: readonly string[];
  url: string;
  liveUrl?: string;
  discordUrl?: string;
  year: string;
  tag: string;
  frameLabel: string;
  /** Background behind letterboxed screenshots, matched to the app's own UI. */
  frameBg: string;
  shots: readonly Shot[];
};

export const projects = [
  {
    slug: "future-study",
    title: "Future-Study",
    tech: ["Python", "React", "TypeScript", "Snowflake Cortex AI", "Go"],
    award: "Winner, Best Use of Snowflake (MLH), Brooklyn Hackday 2026",
    summary: "Built with a team of three, Future-Study maps Brooklyn College Computer and Information Science courses to career paths and free learning resources. It won MLH's Best Use of Snowflake prize for running its course data and AI recommendations on Snowflake Cortex.",
    bullets: [
      "Built Python scrapers (requests, BeautifulSoup, pypdf) that turned brooklyn.edu program pages, 19 bulletin PDFs, 91 syllabi and degree maps into 13 normalized tables ready for Snowflake, including 172 courses and 372 prerequisite edges.",
      "Designed the app's main feature, an interactive degree map for the BS in Computer Science (React Flow, React 19, TypeScript). It shows prerequisite chains, tracks credit progress and saves each student's completed courses.",
      "Rebuilt the Discover page as a chat-style course finder. Students describe their interests, and Snowflake Cortex AI returns matching courses and careers in real time.",
      "Captured the and/or logic in prerequisite rules (for example, “MATH 1011 or MATH 1006 and 1201”) so the map and graph show which courses a student is actually eligible for, not just a list of linked courses.",
      "Pulled Rate My Professors ratings for 115 professors from its GraphQL endpoint, with caching to keep requests to a minimum.",
      "Led the frontend design (Tailwind CSS 4, dark mode, accessibility) and wrote the project's technical docs and README.",
    ],
    url: "https://github.com/kfranklyn7/Future-Study",
    year: "2026",
    tag: "Hackathon · Brooklyn College",
    frameLabel: "futurestudy · course map",
    frameBg: "#faf8f3",
    shots: [
      { src: "/projects/futurestudy-course-map.webp",        alt: "Future-Study course map home page with the progress card, legend and the start of the CS degree map", caption: "interactive degree map" },
      { src: "/projects/futurestudy-course-drawer.webp",     alt: "Course map with Data Structures selected, its prerequisite path highlighted and a drawer showing the course's prerequisite rule and career paths", caption: "prerequisite chains & course drawer" },
      { src: "/projects/futurestudy-discover-results.webp",  alt: "Discover chat recommending Computer Graphics, Game Programming and Game Design for a student who wants to build games", caption: "Discover: Cortex AI course finder" },
      { src: "/projects/futurestudy-graph.webp",             alt: "Prerequisite graph for the Computer Science B.S.", caption: "prerequisite graph" },
      { src: "/projects/futurestudy-course-detail.webp",     alt: "CISC 3130 Data Structures course page with description, prerequisite rule, career paths and free resources", caption: "course page: careers & free resources" },
      { src: "/projects/futurestudy-map-dark.webp",          alt: "Future-Study course map in dark mode", caption: "dark mode" },
    ],
  },
  {
    slug: "discord-bot",
    title: "Marnie, Discord Bot",
    tech: ["Python", "discord.py", "PokeAPI", "pandas", "Pillow", "Flask", "Docker", "Render"],
    bullets: [
      "Built and deployed a Python Discord bot with 17 commands, hosted 24/7 on Render with a Flask/Waitress health-check endpoint and a Docker image. It serves a 15-member community, which uses !muted regularly to see who is timed out.",
      "Split a single-file bot into discord.py cogs (Pokédex, chat stats, game, moderation, errors), with state kept on each cog. The pure logic sits in modules that can be tested without Discord, and about 100 pytest tests cover lookups, type matchups, embeds, word counts and game rounds.",
      "Built Pokémon lookup commands on PokeAPI and local CSV data (pandas), using fuzzy matching (thefuzz) and an alias table to handle typos and nicknames. !dex is a rich embed showing artwork, base-stat bars, type weaknesses and immunities from a type-effectiveness matrix, abilities, and evolution line. If data is missing, that field is left out instead of crashing.",
      "Moved blocking PokeAPI calls onto worker threads behind a shared HTTP session with a timeout and an automatic retry. This keeps the bot responsive while lookups run, and API failures become friendly messages for users.",
      "Made “Who’s That Pokémon?”, a timed guessing game. It draws silhouettes from official artwork with Pillow and checks answers in a way that ignores forms, punctuation, aliases and small typos, while still rejecting guesses that name a different Pokémon.",
      "Added word clouds (!wc) and top-chatter rankings (!top) over a shared cache of each channel’s last 10,000 messages. The cache fills in the background and stays correct as messages are sent, edited and deleted. The bot also announces timeouts automatically and re-checks active ones on startup.",
    ],
    url: "https://github.com/ShawnEvans77/marnie-bot",
    discordUrl: "https://discord.com/oauth2/authorize?client_id=1455036822014001168&permissions=68608&integration_type=0&scope=bot",
    year: "Dec. 2025 – Present",
    tag: "Discord Bot",
    frameLabel: "marnie bot · discord",
    frameBg: "#1a1a1e",
    shots: [
      { src: "/projects/marnie-dex.webp",    alt: "Marnie bot's !dex embed for Morpeko-Full-Belly with flavor text, types, abilities, base-stat bars and type matchups", caption: "!dex: full Pokédex entry", fit: "contain" },
      { src: "/projects/marnie-fun.webp",    alt: "Marnie bot's help embed listing fun and server commands like !wtp, !pick, !wc, !top and !muted", caption: "fun & server commands", fit: "contain" },
      { src: "/projects/marnie-raichu.webp", alt: "Marnie bot replying to !shiny raichu alola with a shiny Alolan Raichu sprite", caption: "!shiny: sprite lookup", fit: "contain" },
      { src: "/projects/marnie-weak.webp",   alt: "Marnie bot listing Abomasnow's weaknesses, resistances and immunities", caption: "!weak: type matchups", fit: "contain" },
      { src: "/projects/marnie-dt.webp",     alt: "Marnie bot showing base stats and ability for Morpeko", caption: "!dt: base stats", fit: "contain" },
      { src: "/projects/marnie-typo.webp",   alt: "Marnie bot correcting the typo sliiimethrower to Flamethrower", caption: "fuzzy matching catches typos", fit: "contain" },
    ],
  },
  {
    slug: "timesheet-generator",
    title: "Socks, Timesheet Generator",
    tech: ["Python", "Flask", "Jinja", "SQLite", "pypdf", "ReportLab", "unittest"],
    bullets: [
      "Automated Brooklyn College part-time timesheet preparation end to end: detects the current pay period, collects schedule exceptions (missed days, missed split shifts, extra shifts), and generates a filled, flattened, print-ready PDF with EMPLID, department number, and due/pay dates.",
      "Designed a SQLite schema for employees, weekly split-shift schedules, pay periods, and holidays, with in-place migrations from legacy JSON and single-table schedules, deduplication, and unique constraints. Built CRUD workflows with date, time, and overlap validation.",
      "Built a local Flask web front end alongside the CLI, sharing one data layer: a 3-step timesheet flow, employee/pay period/holiday management, and saved-PDF history. Used server-rendered Jinja and CSS-only interactivity, with no JavaScript framework.",
      "Hardened the web app for local use: isolated per-request state instead of global caches, rejected non-localhost hosts and cross-origin POSTs, and limited file serving and deletion to the output folder to block path traversal.",
      "Shipped a starter database with the academic-year calendar, copied on first run, so personal data never enters version control. Added one-click restore for accidentally deleted pay periods.",
      "Filled and flattened PDF forms with pypdf, drawing ReportLab overlays for split-shift times the form couldn’t hold. Wrote an 81-test unittest suite covering CLI flows, migrations, validation, PDF output, and web routes.",
    ],
    url: "https://github.com/ShawnEvans77/Socks",
    year: "Nov. 2025 – Mar. 2026",
    tag: "Web App & CLI",
    frameLabel: "socks · flask web app",
    frameBg: "#fdf5dc",
    shots: [
      { src: "/projects/socks-home.webp",      alt: "Socks home page showing the current pay period, employees and saved timesheets", caption: "home: pick an employee" },
      { src: "/projects/socks-changes.webp",   alt: "Socks timesheet flow with a missed shift marked for the pay period", caption: "3-step flow: mark schedule changes" },
      { src: "/projects/socks-timesheet.webp", alt: "Socks timesheet page with a normal schedule", caption: "normal schedule: one click" },
    ],
  },
  {
    slug: "maple",
    title: "Maple, CISC 1115 Learning Platform",
    tech: ["React 19", "TypeScript", "Vite", "React Router 7", "Vitest", "KaTeX", "Vercel"],
    bullets: [
      "Built a static study site for an intro Java course (CISC 1115) covering 5 past final exams with about 60 worked questions and solutions, plus notes on 5 topics, with client-side search and per-question progress tracking.",
      "Wrote 5 interactive learning tools: a step-through algorithm visualizer (binary and linear search, bubble and selection sort) that highlights the running line of Java, a binary/decimal/hex converter, a binary add/subtract calculator, a Java String method explorer and a printf playground.",
      "Re-implemented Java's printf formatting and String methods in TypeScript, including Java's exact exception messages and half-up rounding, and verified them against output from real Java 25 runs.",
      "Designed a small content markup language (code, monospace and table blocks with inline styles) and a Java syntax highlighter, so all content lives as typed TypeScript data with no backend or CMS.",
      "Wrote 135 Vitest tests, including an exhaustive check of all 65,536 8-bit pairs for the binary calculator and content tests that validate ids, markup and PDF paths, so a content mistake fails the build.",
      "Kept the tools and the written notes in sync through tests that fail when a worked example in a note stops matching what the tool produces.",
      "Built about 20 reusable UI components and a hand-written CSS design system (about 2,600 lines) with design tokens, cascade layers, a flash-free dark mode and a mobile layout.",
      "Persisted progress and theme in localStorage with cross-tab sync, and gated every change behind one lint, test and production build command.",
    ],
    url: "https://github.com/ShawnEvans77",
    liveUrl: "https://cisc-1115.vercel.app/",
    year: "2025",
    tag: "Learning Platform",
    frameLabel: "cisc-1115.vercel.app",
    frameBg: "#f9f8f5",
    shots: [
      { src: "/projects/maple-home.webp",       alt: "CISC 1115 learning platform home page", caption: "home" },
      { src: "/projects/maple-visualizer.webp", alt: "Bubble sort visualizer comparing two array elements", caption: "step-through algorithm visualizer" },
      { src: "/projects/maple-exams.webp",      alt: "List of past final exams", caption: "5 past final exams" },
      { src: "/projects/maple-converter.webp",  alt: "Binary, decimal and hex number converter", caption: "binary / decimal / hex converter" },
    ],
  },
] as const satisfies readonly Project[];

export type Experience = {
  role: string;
  org: string;
  location: string;
  period: string;
  bullets: readonly string[];
};

export const experience = [
  {
    role: "Computer Science Tutor",
    org: "Brooklyn College",
    location: "Brooklyn, NY",
    period: "Sep 2025 - Present",
    bullets: [
      "Enhanced students' understanding of Java concepts through creative tutoring sessions that focused on algorithmic thinking rather than rote syntax memorization.",
      "Demystified common programming patterns using focused one-on-one guidance, robust whiteboard demonstrations, and informational lectures. Easily managed high attendance sessions by donating an equal amount of time to all students irregardless of their skill level.",
    ],
  },
  {
    role: "Computer Science Teaching Assistant",
    org: "Brooklyn College",
    location: "Brooklyn, NY",
    period: "Aug 2024 - May 2025",
    bullets: [
      "Fostered an engaging classroom environment by supplementing faculty instruction of two undergraduate computer science classes. Created passionate students excited about course material by periodically hosting study sessions throughout the semester, granting students a relaxing space to socialize with peers and work collaboratively.",
      "Contributed to an improvement in course grades by providing substantial availability outside of class, tutoring students remotely or in person upon their request. Received overwhelmingly positive performance reviews from both students and faculty.",
    ],
  },
  {
    role: "Peer Mentor",
    org: "Brooklyn College",
    location: "Brooklyn, NY",
    period: "Aug 2024 - May 2025",
    bullets: [
      "Supported the mental, social, and academic well being of a cohort comprised of STEM students as part of a broader effort to improve CUNY graduation rates.",
      "Provided mentees with much needed socialization during nightly online conversations and in-person study sessions, with talks ranging from academic struggles to personal life aspirations.",
    ],
  },
  {
    role: "Software Engineering Intern",
    org: "Barclays",
    location: "Whippany, NJ",
    period: "Jan 2023",
    bullets: [
      "Engineered an enhancement to the Barclays development team's workflow alongside an agile team of four university students. Upgraded the proprietary Barclays code editor by writing a JavaScript algorithm that used regular expressions to detect erroneous function calls.",
      "Decreased development time by automating the syntax validation portion of the debugging process, thereby allowing resources to be allotted elsewhere.",
      "Successfully shipped the editor enhancement within a tight one-month deadline through careful time management, assistance of team members as necessary, and communication of project proposals during daily standup meetings.",
      "Delivered an engaging, comprehensive oral presentation detailing the project's purpose, scope, implementation, and potential use cases to an audience of Barclays developers at the internship's conclusion.",
    ],
  },
] as const satisfies readonly Experience[];

export const skills = [
  { label: "Languages", items: ["Python", "Java", "JavaScript", "TypeScript", "C", "C++", "SQL"] },
  { label: "AI-Assisted Development", items: ["Claude Code", "OpenAI Codex"] },
  { label: "Libraries & Frameworks", items: ["pandas", "NumPy", "React.js", "Flask", "Jinja", "discord.py", "pypdf", "ReportLab", "Pytest", "unittest"] },
  { label: "Tools", items: ["Git", "Docker", "SQLite", "MongoDB", "Render", "REST APIs", "Microsoft Office", "Google Suite"] },
] as const;

export const courses = [
  "Data Structures", "Calculus", "Operating Systems", "Databases",
  "Theoretical Computer Science",
] as const;

export const activities = ["Black & Latino Male Initiative", "Computer Science Club"] as const;

export const marqueeWords = [
  "Python", "TypeScript", "Java", "React", "Flask", "discord.py",
  "SQLite", "Docker", "C++", "pandas", "Vitest", "Pytest",
] as const;

export const email = "shawnevans328@gmail.com";

export const footerLinks = [
  { label: "GitHub",   href: "https://github.com/ShawnEvans77" },
  { label: "LinkedIn", href: "https://linkedin.com/in/shawn85" },
] as const;

export const navSections = [
  { id: "education",  label: "Education" },
  { id: "projects",   label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills",     label: "Skills" },
] as const;
