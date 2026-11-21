// ── Content ──────────────────────────────────────────────────────────────────
// All portfolio wording lives here; edit text in this file only.

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
      "Wrote Python scrapers (requests, BeautifulSoup, pypdf) that turned brooklyn.edu program pages, 19 bulletin PDFs and 91 syllabi into 13 normalized Snowflake tables: 172 courses and 372 prerequisite edges.",
      "Parsed the and/or logic in prerequisite rules (“MATH 1011 or MATH 1006 and 1201”) so the React Flow degree map shows which courses a student can actually take next, with credit progress saved per student.",
      "Built the Discover page: a student describes their interests in a chat, and Snowflake Cortex AI matches them to courses and careers in real time.",
      "Pulled ratings for 115 professors from Rate My Professors' GraphQL endpoint, cached to keep requests to a minimum.",
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
      "Python Discord bot with 17 commands that answers Pokémon questions (stats, matchups, sprites, moves, items) for a 15-member server, running 24/7 in Docker on Render.",
      "Every query is first verified against local CSVs (pandas) of 1,350 Pokémon, 936 moves, 2,222 items and 373 abilities, which tells the bot what was asked for before it calls PokeAPI. Typos fall back to fuzzy matching (thefuzz) and nicknames to an alias table, so “sliiimethrower” still returns Flamethrower.",
      "PokeAPI calls run on worker threads through one shared HTTP session with a 10-second timeout and a retry on 502/503/504, so the bot never freezes and API failures become a readable message, not a crash.",
      "!dex builds a full Pokédex embed: artwork, base-stat bars, abilities, evolution line, and weaknesses and immunities computed from a type-effectiveness matrix.",
      "“Who’s That Pokémon?” draws silhouettes from official artwork with Pillow. Answer checking accepts typos and aliases but rejects guesses that name a different Pokémon.",
      "!wc and !top run over a cache of each channel’s last 10,000 messages, kept correct through edits and deletes. About 100 pytest tests cover lookups, matchups, embeds and game rounds.",
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
      "Generates Brooklyn College part-time timesheets end to end: detects the current pay period, applies schedule exceptions (missed days, missed split shifts, extra shifts) and outputs a filled, flattened PDF with EMPLID, department number and due/pay dates.",
      "Fills the official PDF form with pypdf and draws ReportLab overlays for the split-shift times the form has no fields for.",
      "SQLite schema for employees, weekly split-shift schedules, pay periods and holidays, with unique constraints, overlap validation and in-place migrations from the original JSON files.",
      "CLI and local Flask/Jinja web app share one data layer. The web app rejects non-localhost hosts and cross-origin POSTs and confines file access to the output folder to block path traversal.",
      "81 unittest tests cover CLI flows, migrations, validation, PDF output and web routes.",
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
      "Study site for Brooklyn College's intro Java course (CISC 1115): about 60 worked questions from 5 past finals, topic notes, search and progress tracking, all static React/TypeScript with no backend.",
      "Step-through visualizer for binary/linear search and bubble/selection sort that highlights the running line of Java, plus a number-base converter, binary calculator, String method explorer and printf playground.",
      "Re-implemented Java's printf and String methods in TypeScript, matching Java's exact exception messages and half-up rounding, and verified them against real Java 25 output.",
      "135 Vitest tests, including an exhaustive check of all 65,536 8-bit pairs for the binary calculator. Content tests fail the build on a bad id, markup or PDF path, or when a note's worked example disagrees with its tool.",
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
