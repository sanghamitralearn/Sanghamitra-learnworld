// English learning path, rendered by pages/English.jsx.
//
// To add content later, edit this file only:
//   - a new module (chapter) inside a track -> add an object to that track's `modules`
//   - a whole new track                     -> add an object to `ENGLISH_TRACKS`
// Tracks are shown in array order and numbered "Step 1, 2, 3…" automatically.
//
// Module fields:
//   title, text, icon (bootstrap-icon class), to (route)
//   status:     'live' (default) | 'soon'  — 'soon' renders a disabled "Coming soon" card
//   needsLogin: true shows a small "Sign in" hint (the route itself is protected in App.jsx)
import topics from '../vocabulary-content/data';

const topicCount = Object.keys(topics).length;

export const ENGLISH_TRACKS = [
  {
    id: 'vocabulary',
    to: '/vocabulary',
    icon: 'bi-journal-bookmark-fill',
    accent: 'green',
    title: 'Vocabulary',
    summary: 'Know more words and actually remember them.',
    modules: [
      {
        title: 'Diagnostic Test',
        text: 'A quick test that shows which words you already know and where to begin.',
        icon: 'bi-clipboard-check',
        to: '/vocabulary-diagnostic-test',
        needsLogin: true,
      },
      {
        title: 'Vocabulary Guide',
        text: 'The method behind the practice — how to learn words so they stick for good.',
        icon: 'bi-book',
        to: '/vocabulary-guide',
      },
      {
        title: 'Topic Word Banks',
        text: `${topicCount} themed word lists — money, science, sports, history and more.`,
        icon: 'bi-collection',
        to: '/vocabulary-content',
      },
    ],
  },
  {
    id: 'grammar',
    to: '/grammar',
    icon: 'bi-spellcheck',
    accent: 'blue',
    title: 'Grammar',
    summary: 'Write sentences that are clear and correct.',
    modules: [
      {
        title: 'Prepositions',
        text: 'In, on, at and the other small words that trip learners up most.',
        icon: 'bi-signpost-split',
        to: '/grammar',
        status: 'soon',
      },
    ],
  },
  {
    id: 'writing',
    to: '/writing',
    icon: 'bi-pencil-square',
    accent: 'amber',
    title: 'Writing',
    summary: 'Turn ideas into well-built paragraphs and essays.',
    modules: [
      {
        title: 'Analytical Writing',
        text: 'Answer a real essay prompt against the clock and get instant corrections.',
        icon: 'bi-stopwatch',
        to: '/writing',
      },
    ],
  },
];

export default ENGLISH_TRACKS;
