// data.js
// Single source of truth for all static content. UI and pages render from
// this data instead of hardcoding markup per language/path, so adding a
// new language or challenge never means touching six different files.

import { DIFFICULTY } from './constants.js';

export const LEARNING_PATHS = [
  {
    id: 'python',
    title: 'Python',
    icon: 'fa-brands fa-python',
    description: 'A readable, general-purpose language great for beginners, data work, and automation.',
    difficulty: DIFFICULTY.BEGINNER,
    lessons: 24,
    useCases: ['Automation & scripting', 'Data science', 'Web backends', 'Machine learning'],
    topics: ['Variables & types', 'Control flow', 'Functions', 'Lists & dictionaries', 'File I/O', 'OOP basics'],
  },
  {
    id: 'c',
    title: 'C',
    icon: 'fa-solid fa-microchip',
    description: 'The low-level language behind operating systems, compilers, and embedded devices.',
    difficulty: DIFFICULTY.INTERMEDIATE,
    lessons: 20,
    useCases: ['Operating systems', 'Embedded systems', 'Performance-critical software'],
    topics: ['Pointers', 'Memory management', 'Structs', 'Arrays', 'Compilation model'],
  },
  {
    id: 'web',
    title: 'Web Development',
    icon: 'fa-solid fa-globe',
    description: 'HTML, CSS and JavaScript — the three languages that build everything you see in a browser.',
    difficulty: DIFFICULTY.BEGINNER,
    lessons: 30,
    useCases: ['Websites', 'Web apps', 'UI/UX prototyping'],
    topics: ['HTML structure', 'CSS layout', 'The DOM', 'Events', 'Fetch & APIs', 'Responsive design'],
  },
  {
    id: 'java',
    title: 'Java',
    icon: 'fa-brands fa-java',
    description: 'A strongly-typed, object-oriented language powering enterprise and Android apps.',
    difficulty: DIFFICULTY.INTERMEDIATE,
    lessons: 26,
    useCases: ['Android apps', 'Enterprise backends', 'Large-scale systems'],
    topics: ['Classes & objects', 'Inheritance', 'Interfaces', 'Collections', 'Exception handling'],
  },
  {
    id: 'sql',
    title: 'SQL',
    icon: 'fa-solid fa-database',
    description: 'The standard language for querying and managing relational databases.',
    difficulty: DIFFICULTY.BEGINNER,
    lessons: 16,
    useCases: ['Data analysis', 'Backend storage', 'Reporting'],
    topics: ['SELECT & WHERE', 'Joins', 'Aggregation', 'Indexes', 'Schema design'],
  },
  {
    id: 'scratch',
    title: 'Scratch',
    icon: 'fa-solid fa-shapes',
    description: 'A visual, block-based language that teaches programming logic without syntax.',
    difficulty: DIFFICULTY.BEGINNER,
    lessons: 12,
    useCases: ['Learning core logic', 'Games for beginners', 'K-12 education'],
    topics: ['Sequencing', 'Loops', 'Events', 'Variables', 'Simple game logic'],
  },
];

export const FLASHCARDS = {
  python: [
    { id: 'py1', front: 'What is a variable?', back: 'A named storage location used to hold a value that can change during program execution.' },
    { id: 'py2', front: 'What does a "for" loop do?', back: 'It repeats a block of code once for each item in a sequence, such as a list or range.' },
    { id: 'py3', front: 'What is a function?', back: 'A reusable, named block of code that performs a task and can accept inputs and return a value.' },
    { id: 'py4', front: 'What is a list?', back: 'An ordered, mutable collection of values, written like [1, 2, 3].' },
  ],
  c: [
    { id: 'c1', front: 'What is a pointer?', back: 'A variable that stores the memory address of another variable.' },
    { id: 'c2', front: 'What does malloc() do?', back: 'It dynamically allocates a block of memory on the heap and returns a pointer to it.' },
    { id: 'c3', front: 'What is a struct?', back: 'A user-defined type that groups related variables of different types under one name.' },
    { id: 'c4', front: 'Why must C programs be compiled?', back: 'Because C source code must be translated into machine code by a compiler before it can run.' },
  ],
  web: [
    { id: 'w1', front: 'What is the DOM?', back: 'The Document Object Model — a tree-like representation of an HTML page that JavaScript can read and modify.' },
    { id: 'w2', front: 'What does CSS stand for?', back: 'Cascading Style Sheets — the language used to style and lay out HTML elements.' },
    { id: 'w3', front: 'What is an event listener?', back: 'A function that runs in response to a specific action, like a click or keypress.' },
    { id: 'w4', front: 'What is responsive design?', back: 'An approach to layout that adapts a page to different screen sizes using flexible grids and media queries.' },
  ],
  java: [
    { id: 'j1', front: 'What is a class?', back: 'A blueprint that defines the properties and behaviors of the objects created from it.' },
    { id: 'j2', front: 'What is inheritance?', back: 'A mechanism where one class acquires the fields and methods of another class.' },
    { id: 'j3', front: 'What is an interface?', back: 'A contract that defines a set of methods a class must implement, without providing the implementation.' },
    { id: 'j4', front: 'What is the JVM?', back: 'The Java Virtual Machine — it runs compiled Java bytecode on any platform that supports it.' },
  ],
  sql: [
    { id: 's1', front: 'What does SELECT do?', back: 'It retrieves specific columns of data from one or more database tables.' },
    { id: 's2', front: 'What is a JOIN?', back: 'An operation that combines rows from two or more tables based on a related column.' },
    { id: 's3', front: 'What is a primary key?', back: 'A column (or set of columns) that uniquely identifies each row in a table.' },
    { id: 's4', front: 'What does GROUP BY do?', back: 'It groups rows that share a value in specified columns, usually for use with aggregate functions.' },
  ],
  scratch: [
    { id: 'sc1', front: 'What is a "sprite"?', back: 'An on-screen object in Scratch that can be programmed to move, look, and behave in certain ways.' },
    { id: 'sc2', front: 'What is a script?', back: 'A stack of connected blocks that runs as a sequence of instructions.' },
    { id: 'sc3', front: 'What does a "repeat" block do?', back: 'It runs the blocks inside it a set number of times, or forever if using "repeat forever".' },
    { id: 'sc4', front: 'What is a broadcast?', back: 'A message sent to all sprites that triggers scripts listening for that specific message.' },
  ],
};

// Practice challenges are grouped by numeric level. Two challenges per level
// keeps the demo focused while still exercising the locking logic properly.
export const CHALLENGES = [
  { id: 'ch-1-1', level: 1, title: 'Print a Greeting', prompt: 'What keyword starts a function definition in Python?', options: ['func', 'def', 'function', 'lambda'], answer: 'def', points: 10 },
  { id: 'ch-1-2', level: 1, title: 'Loop Basics', prompt: 'Which loop runs a fixed number of times over a range?', options: ['while', 'for', 'do', 'repeat'], answer: 'for', points: 10 },
  { id: 'ch-2-1', level: 2, title: 'Data Structures', prompt: 'Which structure stores key-value pairs in Python?', options: ['list', 'tuple', 'dict', 'set'], answer: 'dict', points: 15 },
  { id: 'ch-2-2', level: 2, title: 'Web Basics', prompt: 'Which HTML tag is used to link a CSS file?', options: ['<style>', '<link>', '<script>', '<css>'], answer: '<link>', points: 15 },
  { id: 'ch-3-1', level: 3, title: 'Algorithmic Thinking', prompt: 'What is the time complexity of binary search on a sorted array?', options: ['O(n)', 'O(n^2)', 'O(log n)', 'O(1)'], answer: 'O(log n)', points: 20 },
  { id: 'ch-3-2', level: 3, title: 'Memory Model', prompt: 'In C, which operator retrieves the memory address of a variable?', options: ['*', '&', '#', '%'], answer: '&', points: 20 },
];

export const QUIZ_QUESTIONS = [
  { id: 'q1', question: 'Which of these is a valid Python variable name?', options: ['2value', 'my_value', 'my-value', 'my value'], correctAnswer: 'my_value', explanation: 'Python identifiers can contain letters, digits, and underscores, but cannot start with a digit or contain spaces/hyphens.', category: 'python', difficulty: DIFFICULTY.BEGINNER },
  { id: 'q2', question: 'What does HTML stand for?', options: ['Hyperlinks and Text Markup Language', 'HyperText Markup Language', 'Home Tool Markup Language', 'Hyper Transfer Markup Language'], correctAnswer: 'HyperText Markup Language', explanation: 'HTML stands for HyperText Markup Language, the standard language for building web pages.', category: 'web', difficulty: DIFFICULTY.BEGINNER },
  { id: 'q3', question: 'Which SQL clause filters rows before grouping?', options: ['HAVING', 'WHERE', 'ORDER BY', 'GROUP'], correctAnswer: 'WHERE', explanation: 'WHERE filters individual rows before any grouping happens; HAVING filters after grouping.', category: 'sql', difficulty: DIFFICULTY.INTERMEDIATE },
  { id: 'q4', question: 'In Java, what keyword is used to inherit from another class?', options: ['implements', 'extends', 'inherits', 'super'], correctAnswer: 'extends', explanation: 'A Java class uses "extends" to inherit fields and methods from a parent class.', category: 'java', difficulty: DIFFICULTY.INTERMEDIATE },
  { id: 'q5', question: 'What does the C function malloc() return on failure?', options: ['0', 'NULL', '-1', 'an exception'], correctAnswer: 'NULL', explanation: 'malloc() returns NULL if it cannot allocate the requested memory.', category: 'c', difficulty: DIFFICULTY.ADVANCED },
  { id: 'q6', question: 'In Scratch, what do you use to make a sprite wait for a click?', options: ['A "when this sprite clicked" hat block', 'A "forever" block', 'A "wait" block alone', 'A variable'], correctAnswer: 'A "when this sprite clicked" hat block', explanation: 'Hat blocks like "when this sprite clicked" start a script in response to an event.', category: 'scratch', difficulty: DIFFICULTY.BEGINNER },
  { id: 'q7', question: 'Which array method adds an item to the end in JavaScript?', options: ['push()', 'pop()', 'shift()', 'unshift()'], correctAnswer: 'push()', explanation: 'push() appends one or more elements to the end of an array.', category: 'web', difficulty: DIFFICULTY.BEGINNER },
  { id: 'q8', question: 'What is the primary purpose of a primary key in SQL?', options: ['To sort a table', 'To uniquely identify each row', 'To speed up INSERTs only', 'To encrypt data'], correctAnswer: 'To uniquely identify each row', explanation: 'A primary key guarantees each row can be uniquely identified.', category: 'sql', difficulty: DIFFICULTY.BEGINNER },
];

export const RESOURCES = [
  { id: 'r1', title: 'Python Official Docs', category: 'python', description: 'The complete, authoritative reference for the Python language and standard library.', url: 'https://docs.python.org/3/', type: 'Documentation', tags: ['python', 'reference'] },
  { id: 'r2', title: 'MDN Web Docs', category: 'web', description: 'The most comprehensive reference for HTML, CSS, and JavaScript.', url: 'https://developer.mozilla.org', type: 'Documentation', tags: ['web', 'html', 'css', 'javascript'] },
  { id: 'r3', title: 'Java SE Documentation', category: 'java', description: 'Oracle\'s official documentation for the Java language and platform.', url: 'https://docs.oracle.com/en/java/', type: 'Documentation', tags: ['java', 'reference'] },
  { id: 'r4', title: 'C Reference (cppreference)', category: 'c', description: 'A detailed community-maintained reference for the C standard library and language.', url: 'https://en.cppreference.com/w/c', type: 'Documentation', tags: ['c', 'reference'] },
  { id: 'r5', title: 'SQL Tutorial — W3Schools', category: 'sql', description: 'A beginner-friendly, interactive walkthrough of SQL syntax and concepts.', url: 'https://www.w3schools.com/sql/', type: 'Tutorial', tags: ['sql', 'beginner'] },
  { id: 'r6', title: 'Scratch Official Site', category: 'scratch', description: 'The home of the Scratch editor, community projects, and tutorials.', url: 'https://scratch.mit.edu', type: 'Platform', tags: ['scratch', 'beginner'] },
  { id: 'r7', title: 'freeCodeCamp', category: 'web', description: 'Free, project-based curriculum covering web development end to end.', url: 'https://www.freecodecamp.org', type: 'Learning Platform', tags: ['web', 'javascript', 'beginner'] },
  { id: 'r8', title: 'Python Cheat Sheet', category: 'python', description: 'A condensed one-page reference of core Python syntax.', url: 'https://www.pythoncheatsheet.org', type: 'Cheat Sheet', tags: ['python', 'reference'] },
  { id: 'r9', title: 'SQLZoo', category: 'sql', description: 'Interactive SQL exercises that run directly in the browser.', url: 'https://sqlzoo.net', type: 'Tool', tags: ['sql', 'practice'] },
  { id: 'r10', title: 'OneCompiler', category: 'java', description: 'An online multi-language compiler for quick experiments without local setup.', url: 'https://onecompiler.com', type: 'Tool', tags: ['java', 'c', 'python', 'tool'] },
  { id: 'r11', title: 'Replit', category: 'web', description: 'A browser-based IDE for building and hosting projects in many languages.', url: 'https://replit.com', type: 'Tool', tags: ['web', 'python', 'java', 'tool'] },
  { id: 'r12', title: 'CS50 by Harvard', category: 'c', description: 'A rigorous, free introduction to computer science covering C and beyond.', url: 'https://cs50.harvard.edu', type: 'Course', tags: ['c', 'beginner', 'course'] },
];

/** All searchable text content, flattened for the instant search feature. */
export function getSearchIndex() {
  const items = [];
  LEARNING_PATHS.forEach((p) =>
    items.push({ type: 'Path', title: p.title, description: p.description, href: `curriculum.html#${p.id}` })
  );
  LEARNING_PATHS.forEach((p) =>
    items.push({ type: 'Language', title: p.title, description: p.useCases.join(', '), href: `languages.html#${p.id}` })
  );
  RESOURCES.forEach((r) =>
    items.push({ type: 'Resource', title: r.title, description: r.description, href: 'resources.html' })
  );
  return items;
}
