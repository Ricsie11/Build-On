import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── CURRICULUM DATA ─────────────────────────────────────────────────────────
const CURRICULUM = [
  {
    id: "beginner",
    level: "Beginner",
    color: "#4f46e5",
    shadow: "0 0 24px rgba(79,70,229,0.15)",
    icon: "🌱",
    tagline: "Build a rock-solid foundation",
    modules: [
      {
        id: "html-mastery",
        title: "HTML5 Mastery",
        icon: "🏗️",
        duration: "3 hrs",
        sections: [
          {
            title: "Semantic HTML",
            body: `HTML is the skeleton of the web. Semantic HTML means using tags that describe their content (e.g., <header>, <main>, <article>) rather than just <div> and <span>.\n\nBenefits:\n• Accessibility: Screen readers understand page structure.\n• SEO: Search engines rank semantic content higher.\n• Maintainability: Cleaner, more readable code.`,
            code: `<!-- ❌ Non-semantic -->
<div class="header">My Logo</div>
<div class="nav">...</div>
<div class="content">...</div>

<!-- ✓ Semantic -->
<header>
  <h1>My Logo</h1>
  <nav>...</nav>
</header>
<main>
  <article>...</article>
</main>`,
          },
          {
            title: "Forms & Validation",
            body: `Forms are how users interact with your app. Modern HTML5 provides built-in validation attributes like 'required', 'pattern', and 'type="email"'.`,
            code: `<form>
  <label for="email">Email:</label>
  <input 
    type="email" 
    id="email" 
    required 
    placeholder="you@domain.com"
  />
  
  <button type="submit">Join Level Up</button>
</form>`,
          },
        ],
        quiz: [
          {
            q: "Which tag is best for the main content area of a page?",
            options: ["<section>", "<main>", "<div>", "<article>"],
            answer: 1,
            explanation:
              "<main> should contain the unique content of the page. There should only be one per page.",
          },
          {
            q: "What does semantic HTML primarily improve?",
            options: [
              "Page speed",
              "Accessibility and SEO",
              "Visual design",
              "Server security",
            ],
            answer: 1,
            explanation:
              "Semantic tags help screen readers and crawlers understand what's what.",
          },
          {
            q: "Which attribute is used to make an input field required?",
            options: ["needed", "required", "strict", "must-fill"],
            answer: 1,
            explanation:
              "The 'required' attribute is a boolean attribute that ensures the field is not empty.",
          },
          {
            q: "What is the correct tag for a navigation bar?",
            options: ["<bar>", "<nav>", "<links>", "<menu>"],
            answer: 1,
            explanation: "<nav> is the semantic tag for navigation links.",
          },
        ],
      },
      {
        id: "css-layout",
        title: "Modern CSS Layouts",
        icon: "🎨",
        duration: "4 hrs",
        sections: [
          {
            title: "Flexbox: 1D Layouts",
            body: `Flexbox is ideal for aligning items in a single row or column. Use 'justify-content' for the main axis and 'align-items' for the cross axis.`,
            code: `.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}`,
          },
          {
            title: "Grid: 2D Layouts",
            body: `Grid is powerful for complex page layouts involving both rows and columns simultaneously.`,
            code: `.grid-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 16px;
}`,
          },
        ],
        quiz: [
          {
            q: "Which property centers items along the main axis in Flexbox?",
            options: [
              "align-items",
              "justify-content",
              "content-align",
              "flex-center",
            ],
            answer: 1,
            explanation:
              "justify-content controls the main axis. align-items controls the cross axis.",
          },
          {
            q: "When should you use Grid over Flexbox?",
            options: [
              "Centering a single element",
              "A navigation menu",
              "2D layouts — controlling rows AND columns at once",
              "Aligning text",
            ],
            answer: 2,
            explanation:
              "Grid excels at 2D control. Flexbox is 1D. For a full page layout with header/sidebar/content/footer, Grid is your tool.",
          },
          {
            q: "What does `gap` do in Flexbox/Grid?",
            options: [
              "Sets margin for container",
              "Sets padding for items",
              "Sets space between items",
              "Sets border width",
            ],
            answer: 2,
            explanation:
              "The 'gap' property is a shorthand for row-gap and column-gap.",
          },
          {
            q: "Which value of `display` enables CSS Grid?",
            options: ["flex", "table", "grid", "block-grid"],
            answer: 2,
            explanation: "display: grid; activates the 2D layout engine.",
          },
        ],
      },
      {
        id: "tailwind-mastery",
        title: "Tailwind CSS Mastery",
        icon: "💨",
        duration: "4 hrs",
        sections: [
          {
            title: "The Utility-First Mental Model",
            body: `In traditional CSS, you write class names then define them in a stylesheet:\n.card { background: white; padding: 24px; }\n\nIn Tailwind, styles ARE the class names:\n<div class="bg-white p-6">\n\nBenefits:\n✓ No context switching between files\n✓ Styles live with your markup\n✓ No dead CSS — only used classes are generated\n✓ Built-in design tokens (consistent spacing, colors)`,
            code: `/* Traditional CSS */
.hero-button {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
}
.hero-button:hover { background-color: #2563eb; }
 
/* Tailwind equivalent — all in JSX */
<button className="
  bg-blue-500 text-white px-6 py-3
  rounded-lg font-semibold
  hover:bg-blue-600 transition-colors
">
  Click me
</button>`,
          },
          {
            title: "Spacing System",
            body: `Tailwind's spacing scale: 1 unit = 4px (0.25rem)\n\nt=top, b=bottom, l=left, r=right, x=horizontal, y=vertical\n\nKey values to memorize:\n1=4px | 2=8px | 3=12px | 4=16px | 5=20px | 6=24px\n8=32px | 10=40px | 12=48px | 16=64px | 20=80px | 24=96px\n\nmx-auto = left + right margin: auto → centers block elements`,
            code: `/* Padding shortcuts */
<div class="p-6">    /* all sides: 24px */
<div class="px-6 py-4"> /* x:24px, y:16px */
<div class="pt-2 pb-8"> /* top:8px, bottom:32px */
 
/* Centering a container */
<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 
/* Stack items with gap (better than margin!) */
<div class="flex flex-col gap-4">
  <Card /><Card /><Card />
</div>
 
/* Arbitrary values (when you need exact pixels) */
<div class="p-[13px] mt-[37px]">Custom spacing</div>`,
          },
        ],
        quiz: [
          {
            q: "What does `mx-auto` do?",
            options: [
              "Sets max-width to auto",
              "Centers element horizontally (margin-left + right: auto)",
              "Sets all margins to maximum",
              "Removes all margins",
            ],
            answer: 1,
            explanation:
              "mx-auto = margin-left: auto + margin-right: auto. This centers block-level elements within their container. Combine with max-w-* for centered page containers.",
          },
          {
            q: "Tailwind is mobile-___. `md:text-lg` applies at...",
            options: [
              "Mobile-last; ONLY at md",
              "Mobile-first; at md (768px) AND above",
              "Mobile-first; ONLY below md",
              "Desktop-first; below md",
            ],
            answer: 1,
            explanation:
              "Tailwind is mobile-first. No prefix = mobile. md: = 768px and above. Always start with mobile styles, layer larger screens on top.",
          },
          {
            q: "What does `p-4` represent in pixels?",
            options: ["4px", "8px", "16px", "32px"],
            answer: 2,
            explanation: "4 units * 4px per unit = 16px.",
          },
          {
            q: "How do you apply a hover style in Tailwind?",
            options: [
              "onHover:bg-red",
              "hover-bg-red",
              "hover:bg-red",
              "bg-red:hover",
            ],
            answer: 2,
            explanation:
              "Tailwind uses the 'modifier:' prefix for states like hover, focus, etc.",
          },
        ],
      },
      {
        id: "intro-react",
        title: "Intro to React & JSX",
        icon: "⚛️",
        duration: "5 hrs",
        sections: [
          {
            title: "What is React?",
            body: "React is a JavaScript library for building user interfaces. It uses a declarative approach and a 'Virtual DOM' to efficiently update the UI.",
            code: "const element = <h1>Hello React</h1>;",
          },
          {
            title: "Components & Props",
            body: "Components are reusable pieces of UI. Props are read-only inputs passed from parent to child components.",
            code: "function Welcome(props) { return <h1>Hello, {props.name}</h1>; }",
          },
        ],
        quiz: [
          {
            q: "What is JSX?",
            options: [
              "JavaScript XML",
              "Java Syntax Extension",
              "JSON Styling XML",
              "Just Simple XML",
            ],
            answer: 0,
            explanation:
              "JSX allows you to write HTML-like code inside JavaScript.",
          },
          {
            q: "Are props mutable?",
            options: [
              "Yes, children can change them",
              "No, they are read-only",
              "Yes, but only in class components",
              "Only if passed as a ref",
            ],
            answer: 1,
            explanation:
              "Props should never be modified by the component that receives them.",
          },
        ],
      },
      {
        id: "interactive-react",
        title: "Interactive React",
        icon: "🔘",
        duration: "5 hrs",
        sections: [
          {
            title: "Handling Events",
            body: "In React, we use camelCase for event handlers (e.g., onClick instead of onclick) and pass functions as values.",
            code: "<button onClick={() => alert('Clicked!')}>Click Me</button>",
          },
          {
            title: "useState Hook",
            body: "useState allows functional components to have their own state. It returns the current state and a function to update it.",
            code: "const [count, setCount] = useState(0);",
          },
        ],
        quiz: [
          {
            q: "What hook is used to add state to a function component?",
            options: ["useEffect", "useMemo", "useState", "useContext"],
            answer: 2,
            explanation: "useState is the core hook for local component state.",
          },
          {
            q: "What is the naming convention for React event handlers?",
            options: ["lowercase", "UPPERCASE", "camelCase", "snake_case"],
            answer: 2,
            explanation:
              "React uses camelCase for events (e.g., onChange, onKeyDown).",
          },
        ],
      },
    ],
  },
  {
    id: "intermediate",
    level: "Intermediate",
    color: "#6366f1",
    shadow: "0 0 24px rgba(99,102,241,0.15)",
    icon: "🚀",
    tagline: "Level up your React thinking",
    modules: [
      {
        id: "hooks-deep-dive",
        title: "React Hooks Deep Dive",
        icon: "🪝",
        duration: "5 hrs",
        sections: [
          {
            title: "useRef — Escape Hatch",
            body: `useRef creates a mutable container that persists across renders WITHOUT causing re-renders.\n\n2 main uses:\n1. Access DOM elements directly (focus, play video, measure dimensions)\n2. Store values that should persist but NOT trigger re-renders (timers, previous values)`,
            code: `// 1. DOM access
function VideoPlayer() {
  const videoRef = useRef(null);
  return (
    <div>
      <video ref={videoRef} src="/video.mp4" />
      <button onClick={() => videoRef.current.play()}>▶</button>
      <button onClick={() => videoRef.current.pause()}>⏸</button>
    </div>
  );
}`,
          },
        ],
        quiz: [
          {
            q: "When does changing `ref.current` trigger a re-render?",
            options: [
              "Always",
              "Never — refs are mutable but don't trigger re-renders",
              "Only on mount",
              "When changed from null",
            ],
            answer: 1,
            explanation:
              "useRef's whole point is mutability WITHOUT re-rendering.",
          },
          {
            q: "What is the default return value of `useRef(null)`?",
            options: [
              "null",
              "{ current: null }",
              "undefined",
              "{ value: null }",
            ],
            answer: 1,
            explanation: "useRef returns an object with a 'current' property.",
          },
        ],
      },
      {
        id: "state-mgmt",
        title: "Global State Management",
        icon: "🌍",
        duration: "6 hrs",
        sections: [
          {
            title: "Context API",
            body: "Context provides a way to pass data through the component tree without having to pass props down manually at every level.",
            code: "const MyContext = React.createContext();",
          },
          {
            title: "Zustand Basics",
            body: "Zustand is a small, fast, and scalable bearbones state-management solution. It’s built on hooks and has no boilerplate.",
            code: "const useStore = create((set) => ({ count: 0 }));",
          },
        ],
        quiz: [
          {
            q: "When should you use Context API over props?",
            options: [
              "For every component",
              "To avoid prop drilling across many levels",
              "Only for small numbers",
              "Never",
            ],
            answer: 1,
            explanation:
              "Context is ideal for global values like themes or user state.",
          },
          {
            q: "What is a key benefit of Zustand?",
            options: [
              "It requires Redux",
              "Zero boilerplate and hooks-based",
              "It's built into React core",
              "It only works with class components",
            ],
            answer: 1,
            explanation:
              "Zustand is loved for its simple API and lack of nesting.",
          },
        ],
      },
      {
        id: "api-effects",
        title: "API & Side Effects",
        icon: "🌐",
        duration: "6 hrs",
        sections: [
          {
            title: "useEffect Fundamentals",
            body: "useEffect allows you to perform side effects in functional components. The dependency array controls when it runs.",
            code: "useEffect(() => { fetchData(); }, []);",
          },
          {
            title: "Modern Fetching",
            body: "Using async/await and try/catch makes your data fetching robust and readable.",
            code: "const res = await fetch(url); const data = await res.json();",
          },
        ],
        quiz: [
          {
            q: "What does an empty dependency array `[]` mean in useEffect?",
            options: [
              "Run on every render",
              "Run once on mount only",
              "Run on every state change",
              "Never run",
            ],
            answer: 1,
            explanation:
              "The empty array ensures the effect only runs once when the component is first mounted.",
          },
          {
            q: "Which tool is best for managing loading and caching?",
            options: [
              "Standard fetch",
              "React Query/TanStack Query",
              "setTimeout",
              "localStorage",
            ],
            answer: 1,
            explanation:
              "React Query handles caching, re-fetching, and loading states automatically.",
          },
        ],
      },
    ],
  },
  {
    id: "advanced",
    level: "Advanced",
    color: "#8b5cf6",
    shadow: "0 0 24px rgba(139,92,246,0.15)",
    icon: "⚡",
    tagline: "Production-grade React",
    modules: [
      {
        id: "performance",
        title: "React Performance",
        icon: "🏎️",
        duration: "5 hrs",
        sections: [
          {
            title: "Understanding Re-renders",
            body: `React re-renders when:\n1. Own state changes\n2. Parent re-renders (even if props same — use React.memo)\n3. Consumed context changes`,
            code: `// Caching results
const filteredItems = useMemo(() => {
  return items.filter(i => i.name.includes(filter));
}, [items, filter]);`,
          },
        ],
        quiz: [
          {
            q: "What triggers a React component to re-render?",
            options: [
              "Only own state change",
              "State change, parent re-render, or consumed context change",
              "Any change in the app",
              "Only when props change",
            ],
            answer: 1,
            explanation:
              "Three triggers: state, parent re-render, or context change.",
          },
          {
            q: "When should you use `useCallback`?",
            options: [
              "Always",
              "To memoize functions passed as props to avoid parent re-render issues",
              "To speed up simple math",
              "To replace useEffect",
            ],
            answer: 1,
            explanation:
              "useCallback prevents function recreation on every render, which is crucial for components wrapped in React.memo.",
          },
        ],
      },
      {
        id: "custom-hooks",
        title: "Custom Hooks Mastery",
        icon: "🛠️",
        duration: "6 hrs",
        sections: [
          {
            title: "Designing Utility Hooks",
            body: "Custom hooks let you extract component logic into reusable functions. They must start with the prefix 'use'.",
            code: "function useLocalStorage(key) { ... }",
          },
          {
            title: "Complex Pattern Hooks",
            body: "Hooks can manage complex state transitions and share them across many components.",
            code: "const { data, loading } = useMyCustomFetch(url);",
          },
        ],
        quiz: [
          {
            q: "What is the mandatory prefix for custom hooks?",
            options: ["react-", "get", "use", "handle"],
            answer: 2,
            explanation:
              "React's hook rules require the 'use' prefix for auto-detection by linters.",
          },
          {
            q: "Can custom hooks use other hooks?",
            options: [
              "Yes",
              "No",
              "Only built-in ones",
              "Only in class components",
            ],
            answer: 0,
            explanation:
              "Custom hooks are specifically designed to compose other hooks.",
          },
        ],
      },
      {
        id: "testing",
        title: "Testing React Components",
        icon: "🧪",
        duration: "7 hrs",
        sections: [
          {
            title: "Unit Testing with Vitest",
            body: "Vitest is a blazing fast unit test framework powered by Vite. Use it for logic and utilities.",
            code: "expect(sum(1, 2)).toBe(3);",
          },
          {
            title: "React Testing Library (RTL)",
            body: "RTL focuses on testing components from the user's perspective (finding text, clicking buttons).",
            code: "render(<MyButton />);",
          },
        ],
        quiz: [
          {
            q: "What does `fireEvent` do in RTL?",
            options: [
              "Starts a fire",
              "Simulates user interactions like clicks",
              "Deletes a component",
              "Logs an error",
            ],
            answer: 1,
            explanation: "It's used to trigger DOM events programmatically.",
          },
          {
            q: "What is the goal of React Testing Library?",
            options: [
              "Testing implementation details",
              "Testing how users interact with the UI",
              "Speeding up build time",
              "Checking server-side logic",
            ],
            answer: 1,
            explanation:
              "RTL encourages testing 'what the user sees' rather than 'how the code works'.",
          },
        ],
      },
    ],
  },
  {
    id: "senior",
    level: "Senior",
    color: "#ec4899",
    shadow: "0 0 24px rgba(236,72,153,0.15)",
    icon: "👑",
    tagline: "Think in systems, not components",
    modules: [
      {
        id: "architecture",
        title: "Frontend Architecture",
        icon: "🏛️",
        duration: "6 hrs",
        sections: [
          {
            title: "Feature-Based Structure",
            body: `Scale beyond file-type grouping to feature-based organization.`,
            code: `src/
  features/
    auth/
      components/
      hooks/
      api/`,
          },
        ],
        quiz: [
          {
            q: "Main benefit of feature-based folder structure:",
            options: [
              "Required by React",
              "Related code lives together — easy to find, modify, or delete",
              "Loads faster",
              "Type-based is better",
            ],
            answer: 1,
            explanation:
              "Feature-based organization scales better with large teams and complex apps.",
          },
          {
            q: "What is a Barrel File?",
            options: [
              "A file that stores barrels",
              "index.ts/js files that export from a directory for cleaner imports",
              "A backup file",
              "A heavy image file",
            ],
            answer: 1,
            explanation:
              "Barrel files consolidate exports, making import paths much shorter.",
          },
        ],
      },
      {
        id: "nextjs",
        title: "Next.js & Server Components",
        icon: "🚀",
        duration: "8 hrs",
        sections: [
          {
            title: "App Router Foundations",
            body: "The App Router uses file-system based routing and supports shared layouts, nested routing, and more.",
            code: "app/dashboard/page.tsx",
          },
          {
            title: "React Server Components (RSC)",
            body: "RSC allows you to fetch data on the server, reducing the JavaScript bundle sent to the client.",
            code: "async function Page() { const data = await db.get(); ... }",
          },
        ],
        quiz: [
          {
            q: "Where do Server Components run?",
            options: [
              "In the browser",
              "On the server during hit",
              "On the user's phone",
              "Only during build time",
            ],
            answer: 1,
            explanation:
              "Server components are executed on the server, sending only HTML/DSL to the client.",
          },
          {
            q: "What is 'Streaming' in Next.js?",
            options: [
              "Live video",
              "Progressive rendering of UI parts as they finish loading on server",
              "File downloads",
              "Continuous API calls",
            ],
            answer: 1,
            explanation:
              "Streaming allows the user to see parts of the page before the whole thing is ready.",
          },
        ],
      },
      {
        id: "design-systems",
        title: "Building Design Systems",
        icon: "📐",
        duration: "8 hrs",
        sections: [
          {
            title: "Token Systems",
            body: "Design tokens are the visual atoms: colors, spacing, and typography defined as variables.",
            code: "const tokens = { primary: '#3b82f6' };",
          },
          {
            title: "Headless Components",
            body: "Libraries like Radix UI or Headless UI manage the logic and accessibility, leaving you in control of the styling.",
            code: "<Dialog.Root> ... </Dialog.Root>",
          },
        ],
        quiz: [
          {
            q: "What is a 'Headless' component?",
            options: [
              "A component without a brain",
              "A component with logic but no default styling",
              "A component with no props",
              "A hidden component",
            ],
            answer: 1,
            explanation:
              "Headless components handle accessibility and state but leave the CSS to you.",
          },
          {
            q: "Why use Design Tokens?",
            options: [
              "They are faster",
              "To ensure visual consistency across different platforms and themes",
              "To use less memory",
              "To replace React hooks",
            ],
            answer: 1,
            explanation:
              "Tokens ensure that 'Primary Blue' is exactly the same everywhere.",
          },
        ],
      },
    ],
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const STORAGE_KEY = "ricsie_learning_v1";

function loadProgress() {
  try {
    const raw = window.storage?.get
      ? null
      : JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return raw || {};
  } catch {
    return {};
  }
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

function totalModules() {
  return CURRICULUM.reduce((a, l) => a + l.modules.length, 0);
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      style={{ background: "rgba(15,23,42,0.4)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-3xl glass border-white/60 shadow-2xl p-8 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center bg-white/40 hover:bg-white/70 border border-white/60 text-slate-600 hover:text-slate-900 transition-all font-bold text-lg"
        >
          ×
        </button>
        <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">{title}</h2>
        <div className="text-sm text-slate-700 leading-relaxed space-y-4 font-medium">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── LEGAL CONTENT ────────────────────────────────────────────────────────────
const PRIVACY_CONTENT = (
  <>
    <p>
      <strong>Effective Date:</strong> March 27, 2025
    </p>
    <p>
      DevPath ("we", "our", or "us") values your privacy. This policy explains how
      we handle information when you use our platform.
    </p>
    <p><strong>1. Information We Collect</strong><br />
      DevPath is a client-side application. We do <em>not</em> collect, store, or transmit any personal
      data to external servers. Your progress is saved exclusively in your browser's <code>localStorage</code> <nsspd />
      and never leaves your device.
    </p>
    <p><strong>2. Cookies</strong><br />
      We do not use cookies, tracking pixels, or third-party analytics tools.
    </p>
    <p><strong>3. Third-Party Links</strong><br />
      Resource links in the footer point to third-party documentation sites
      (React, Tailwind, Next.js, MDN). We are not responsible for their privacy practices.
    </p>
    <p><strong>4. Changes to This Policy</strong><br />
      We may update this policy periodically. Continued use of DevPath constitutes
      acceptance of any changes.
    </p>
    <p><strong>5. Contact</strong><br />
      For privacy-related questions, email us at{" "}
      <a href="mailto:wisdomalfred964@gmail.com" className="text-indigo-600 underline">wisdomalfred964@gmail.com</a>.
    </p>
  </>
);

const TERMS_CONTENT = (
  <>
    <p>
      <strong>Effective Date:</strong> March 27, 2025
    </p>
    <p>
      By accessing and using DevPath, you agree to the following Terms of Use. Please
      read them carefully.
    </p>
    <p><strong>1. Purpose</strong><br />
      DevPath is an educational platform designed to help developers learn modern
      frontend development. All content is for personal, non-commercial learning purposes only.
    </p>
    <p><strong>2. Intellectual Property</strong><br />
      All course content, designs, and code examples within DevPath are the intellectual
      property of Build-On. You may not reproduce or distribute them without written permission.
    </p>
    <p><strong>3. User Conduct</strong><br />
      You agree not to misuse the platform, attempt to reverse-engineer any functionality,
      or use it to harm others or spread misinformation.
    </p>
    <p><strong>4. Disclaimer</strong><br />
      DevPath is provided "as is" without warranties of any kind. We do not guarantee
      that the platform will be error-free or uninterrupted.
    </p>
    <p><strong>5. Governing Law</strong><br />
      These terms are governed by applicable local laws. Any disputes will be resolved
      through good-faith negotiation before any legal action.
    </p>
    <p><strong>6. Contact</strong><br />
      Questions about these terms? Reach us at{" "}
      <a href="mailto:wisdomalfred964@gmail.com" className="text-indigo-600 underline">wisdomalfred964@gmail.com</a>.
    </p>
  </>
);

const CONTACT_CONTENT = (
  <>
    <p>We'd love to hear from you. Whether you have feedback, a bug report, or just want to say hi,
       reach out through any of the channels below.</p>
    <div className="rounded-2xl bg-white/50 border border-white/60 p-5 space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-2xl">📧</span>
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-0.5">Email</p>
          <a href="mailto:wisdomalfred964@gmail.com" className="font-black text-indigo-600 hover:underline">
            wisdomalfred964@gmail.com
          </a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-2xl">🌐</span>
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-0.5">Portfolio</p>
          <a href="https://alfredwisdom.vercel.app" target="_blank" rel="noopener noreferrer"
             className="font-black text-indigo-600 hover:underline">
            alfredwisdom.vercel.app ↗
          </a>
        </div>
      </div>
    </div>
    <p className="text-sm text-slate-600">
      We aim to respond to all messages within 48 hours. For urgent matters, email is the fastest channel.
    </p>
  </>
);

// ─── CODE BLOCK ──────────────────────────────────────────────────────────────
function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative mt-4 rounded-xl overflow-hidden border border-slate-200 bg-[#0d1117] group shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/30" />
          <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/30" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/30" />
        </div>
        <button
          onClick={copy}
          className={clsx(
            "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded transition-all flex items-center gap-1.5",
            copied
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200 hover:bg-slate-700",
          )}
        >
          {copied ? "✓ Copied" : "⎘ Copy"}
        </button>
      </div>
      <pre className="p-5 text-[13px] overflow-x-auto selection:bg-blue-500/30">
        <code className="font-mono leading-relaxed text-slate-300">{code}</code>
      </pre>
    </div>
  );
}

// ─── QUIZ COMPONENT ──────────────────────────────────────────────────────────
function Quiz({ questions, onComplete, moduleId }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [showExp, setShowExp] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExp(true);
    setResults((r) => [...r, idx === q.answer]);
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
      onComplete(
        results.filter(Boolean).length + (selected === q.answer ? 0 : 0),
        questions.length,
      );
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowExp(false);
    }
  };

  if (finished) {
    const finalScore = results.filter(Boolean).length;
    const pct = Math.round((finalScore / questions.length) * 100);
    return (
      <div className="text-center py-12 px-6 glass rounded-3xl animate-fade-in border-white/60">
        <div className="text-6xl mb-6">🏆</div>
        <h3 className="text-3xl font-black mb-3 text-slate-900">
          Module Finalized!
        </h3>
        <p className="text-slate-600 mb-8 max-w-sm mx-auto font-medium">
          Score: {finalScore} / {questions.length} ({pct}%)
        </p>
        <button
          onClick={() => {
            setCurrent(0);
            setSelected(null);
            setResults([]);
            setShowExp(false);
            setFinished(false);
          }}
          className="px-8 py-3 rounded-2xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-xl"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="py-2 animate-fade-in-up">
      <div className="flex items-center justify-between mb-8">
        <span className="text-xs font-black tracking-widest text-slate-500 uppercase">
          Question {current + 1} / {questions.length}
        </span>
      </div>
      <p className="text-xl font-bold mb-8 text-slate-900">{q.q}</p>
      <div className="grid gap-3 mb-6">
        {q.options.map((opt, i) => {
          let style =
            "bg-white/40 border-white/60 text-slate-700 hover:border-white hover:bg-white/60";
          if (selected !== null) {
            if (i === q.answer)
              style =
                "bg-emerald-500/10 border-emerald-500/50 text-emerald-600";
            else if (i === selected)
              style = "bg-rose-500/10 border-rose-500/50 text-rose-600";
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={clsx(
                "w-full text-left px-6 py-4 rounded-2xl border-2 transition-all font-bold",
                style,
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {showExp && (
        <div className="p-5 rounded-2xl bg-white/60 border border-white/80 text-slate-700 text-sm mb-6 animate-fade-in shadow-sm font-medium">
          <strong>💡 Deep Dive:</strong> {q.explanation}
        </div>
      )}
      {selected !== null && (
        <button
          onClick={next}
          className="w-full py-4 rounded-2xl font-black text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-lg"
        >
          {current + 1 >= questions.length
            ? "Finish Module →"
            : "Next Question →"}
        </button>
      )}
    </div>
  );
}

// ─── MODULE VIEW ─────────────────────────────────────────────────────────────
function ModuleView({ module, levelColor, onBack, onComplete, isCompleted }) {
  const [tab, setTab] = useState("learn");
  const [activeSection, setActiveSection] = useState(0);

  const handleQuizComplete = (score, total) => {
    const pct = Math.round((score / total) * 100);
    if (pct >= 60) onComplete(module.id);
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <button
        onClick={onBack}
        className="group flex items-center gap-2 mb-8 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <span className="text-lg group-hover:-translate-x-1 transition-transform">
          ←
        </span>{" "}
        Back to Curriculum
      </button>

      <div className="flex items-start gap-6 mb-10">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl glass shadow-2xl relative border-white">
          <div
            className="absolute inset-0 rounded-2xl bg-current opacity-10"
            style={{ color: levelColor }}
          />
          {module.icon}
        </div>
        <div className="pt-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
            {module.title}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
              ⏱ {module.duration} read
            </span>
            {isCompleted && (
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                Mastered
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex p-1.5 gap-2 mb-10 bg-white/20 rounded-2xl border border-white/40">
        {["learn", "quiz"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={clsx(
              "flex-1 py-3 px-4 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2",
              tab === t
                ? "bg-white text-slate-900 shadow-lg ring-1 ring-black/5"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/40",
            )}
          >
            {t === "learn" ? "📖 Learn" : "🧠 Quiz"}
          </button>
        ))}
      </div>

      {tab === "learn" && (
        <div className="animate-fade-in-up">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-10">
            {module.sections.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSection(i)}
                className={clsx(
                  "p-3 text-[11px] font-black uppercase tracking-wider rounded-xl transition-all border-2",
                  i === activeSection
                    ? "bg-white border-white shadow-sm text-slate-900"
                    : "bg-white/20 border-white/40 text-slate-500 hover:border-white/60",
                )}
              >
                Part {i + 1}
              </button>
            ))}
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {module.sections[activeSection].title}
            </h3>
            <p className="text-slate-700 text-base leading-relaxed whitespace-pre-wrap font-medium">
              {module.sections[activeSection].body}
            </p>
            {module.sections[activeSection].code && (
              <CodeBlock code={module.sections[activeSection].code} />
            )}
            <div className="flex items-center justify-between pt-10 border-t border-white/40">
              {activeSection > 0 ? (
                <button
                  onClick={() => setActiveSection((s) => s - 1)}
                  className="px-6 py-3 rounded-2xl text-sm font-bold text-slate-600 hover:text-slate-900 bg-white/40 hover:bg-white/60 transition-all border border-white/60"
                >
                  ← Previous
                </button>
              ) : (
                <div />
              )}
              {activeSection < module.sections.length - 1 ? (
                <button
                  onClick={() => setActiveSection((s) => s + 1)}
                  className="px-8 py-3 rounded-2xl text-sm font-black text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-xl"
                >
                  Next Part →
                </button>
              ) : (
                <button
                  onClick={() => setTab("quiz")}
                  className="px-8 py-3 rounded-2xl text-sm font-black text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-xl"
                >
                  Start Final Quiz 🧠
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {tab === "quiz" && (
        <Quiz
          questions={module.quiz}
          onComplete={handleQuizComplete}
          moduleId={module.id}
        />
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [progress, setProgress] = useState(() => loadProgress());
  const [view, setView] = useState("home");
  const [activeModule, setActiveModule] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);
  const [modal, setModal] = useState(null);
  const [showTop, setShowTop] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("devpath_dark") === "true"
  );

  // Sync dark class to <html> so CSS selectors work
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("devpath_dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToLevel = (levelId) => {
    if (view !== "home") {
      setView("home");
      setTimeout(() => {
        document.getElementById(`level-${levelId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      document.getElementById(`level-${levelId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const completed = Object.keys(progress).filter((k) => progress[k]).length;
  const total = totalModules();
  const pct = Math.round((completed / total) * 100);

  const markComplete = (moduleId) => {
    const next = { ...progress, [moduleId]: true };
    setProgress(next);
    saveProgress(next);
  };

  const openModule = (module, level) => {
    setActiveModule(module);
    setActiveLevel(level);
    setView("module");
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 glass saturate-150 border-b-white/20">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {view === "module" && (
              <button
                onClick={() => setView("home")}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/40 text-slate-600 hover:text-slate-900 transition-all border border-white/60"
              >
                ←
              </button>
            )}
            <div className="flex items-center gap-3">
              <img
                src={darkMode ? "/devpath-logo-dark.svg" : "/devpath-logo-light.svg"}
                alt="DevPath Logo"
                className="h-9 w-auto object-contain"
              />
              {/* <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                  DevPath
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 leading-none">
                  Frontend Masterclass
                </span>
              </div> */}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                Overall Progress
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-white/50">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-1000 shadow-[0_0_10px_rgba(79,70,229,0.3)]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-sm font-black">{pct}%</span>
              </div>
            </div>
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode((d) => !d)}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="w-10 h-10 rounded-full flex items-center justify-center glass border border-white/40 text-xl transition-all hover:scale-110 hover:shadow-lg"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 scroll-mt-20">
        {view === "home" && (
          <div className="animate-fade-in-up">
            <div className="mb-16 relative">
              <h1 className="text-5xl sm:text-7xl font-black mb-6 tracking-tight leading-[0.9]"
                style={{ color: darkMode ? '#e2e8f0' : '#0f172a' }}
              >
                Master the <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent italic">
                  Frontend
                </span>
              </h1>
              <p className="text-lg text-slate-700 max-w-2xl leading-relaxed font-bold opacity-80">
                A structured, interactive roadmap designed to take you from core
                foundations to senior-level architecture.
              </p>
            </div>

            <div className="space-y-12">
              {CURRICULUM.map((level) => {
                const levelCompleted = level.modules.filter(
                  (m) => progress[m.id],
                ).length;
                const levelPct = Math.round(
                  (levelCompleted / level.modules.length) * 100,
                );
                const isUnlocked =
                  level.id === "beginner" ||
                  CURRICULUM[CURRICULUM.indexOf(level) - 1]?.modules.every(
                    (m) => progress[m.id],
                  );

                return (
                  <section
                    key={level.id}
                    id={`level-${level.id}`}
                    className={clsx(
                      "relative transition-all duration-500",
                      !isUnlocked &&
                        "grayscale opacity-40 select-none pointer-events-none",
                    )}
                  >
                    <div className="flex items-end justify-between mb-6 group">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl glass shadow-xl border-white"
                          style={{ color: level.color }}
                        >
                          {level.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                              {level.level}
                            </h2>
                            {!isUnlocked && <span className="text-lg">🔒</span>}
                          </div>
                          <p className="text-sm font-bold text-slate-600 tracking-tight">
                            {level.tagline}
                          </p>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <span className="text-xs font-black text-slate-500">
                          {levelPct}%
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {level.modules.map((module) => {
                        const done = !!progress[module.id];
                        return (
                          <button
                            key={module.id}
                            onClick={() =>
                              isUnlocked && openModule(module, level)
                            }
                            className={clsx(
                              "text-left p-6 rounded-[2rem] transition-all duration-300 relative group overflow-hidden border-2",
                              done
                                ? "bg-white border-white shadow-xl shadow-slate-200/50"
                                : "bg-white/20 border-white/40 hover:border-white hover:bg-white/40",
                            )}
                          >
                            <div
                              className="absolute -top-10 -right-10 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity"
                              style={{ background: level.color }}
                            />
                            <div className="flex items-start justify-between mb-6 relative z-10">
                              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl glass border-white">
                                {module.icon}
                              </div>
                              <div
                                className={clsx(
                                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                  done
                                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                    : "bg-white/60 text-slate-500 border-white/80",
                                )}
                              >
                                {done ? "✓ Finalized" : module.duration}
                              </div>
                            </div>
                            <h3 className="font-black text-lg mb-2 text-slate-900 relative z-10">
                              {module.title}
                            </h3>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        )}

        {view === "module" && activeModule && activeLevel && (
          <div className="animate-fade-in">
            <ModuleView
              module={activeModule}
              levelColor={activeLevel.color}
              onBack={() => setView("home")}
              onComplete={markComplete}
              isCompleted={!!progress[activeModule.id]}
            />
          </div>
        )}
      </main>

      <footer className="mt-24 border-t border-white/20" style={{ background: 'linear-gradient(135deg, rgba(146,155,206,0.18) 0%, rgba(146,185,206,0.15) 50%, rgba(146,206,197,0.18) 100%)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-4xl mx-auto px-6 py-14">
          {/* Top grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
            {/* Branding column */}
            <div>
              <div className="mb-4">
                <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block">
                  DevPath
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 leading-none">
                  Frontend Masterclass
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-medium max-w-xs">
                A structured roadmap to take you from core foundations to
                senior-level frontend engineering.
              </p>
              {/* Social Icons */}
              <div className="flex gap-3 mt-5">
                {[
                  { label: "GitHub", icon: "🐙", url: "https://github.com/Ricsie11/Build-On" },
                  { label: "Twitter", icon: "𝕏" },
                  { label: "LinkedIn", icon: "💼" },
                ].map(({ label, icon, url }) => (
                  <button
                    onClick={() => window.open(url, "_blank")}
                    key={label}
                    title={label}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-base bg-white/40 hover:bg-white/70 border border-white/60 transition-all shadow-sm hover:shadow-md text-slate-700"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Curriculum Links */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
                Curriculum
              </h4>
              <ul className="space-y-2.5">
                {CURRICULUM.map((level) => (
                  <li key={level.id}>
                    <button
                      onClick={() => scrollToLevel(level.id)}
                      className="text-sm font-bold text-slate-700 hover:text-indigo-600 cursor-pointer transition-colors flex items-center gap-1.5 group"
                    >
                      <span>{level.icon}</span>
                      {level.level} Track
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">↗</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
                Resources
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "React Docs", href: "https://react.dev" },
                  { label: "Tailwind Docs", href: "https://tailwindcss.com/docs" },
                  { label: "Next.js Docs", href: "https://nextjs.org/docs" },
                  { label: "MDN Web Docs", href: "https://developer.mozilla.org" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors"
                    >
                      {label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">
              &copy; {new Date().getFullYear()} DevPath. All rights reserved.
            </p>
            <div className="flex gap-5">
              {[
                { label: "Privacy", key: "privacy" },
                { label: "Terms", key: "terms" },
                { label: "Contact", key: "contact" },
              ].map(({ label, key }) => (
                <button
                  key={key}
                  onClick={() => setModal(key)}
                  className="text-xs font-bold text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {modal === "privacy" && (
        <Modal title="Privacy Policy" onClose={() => setModal(null)}>
          {PRIVACY_CONTENT}
        </Modal>
      )}
      {modal === "terms" && (
        <Modal title="Terms of Use" onClose={() => setModal(null)}>
          {TERMS_CONTENT}
        </Modal>
      )}
      {modal === "contact" && (
        <Modal title="Contact Us" onClose={() => setModal(null)}>
          {CONTACT_CONTENT}
        </Modal>
      )}

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={clsx(
          "fixed bottom-8 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl",
          "bg-white/70 backdrop-blur-md border border-white/60 text-slate-700 hover:bg-indigo-600 hover:text-white hover:scale-110",
          showTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        ↑
      </button>
    </div>
  );
}
