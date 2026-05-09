# Nested Dynamic Form

A React + Vite project for building recursive nested question forms.

## What It Does

- Add parent questions dynamically
- Support two question types: `Short Answer` and `True / False`
- Allow child questions only when a `True / False` question is answered `True`
- Support unlimited recursive nesting for child questions
- Auto-number questions in hierarchical format (`Q1`, `Q1.1`, `Q1.1.1`)
- Delete any question node with its full subtree
- Reorder parent questions with drag and drop
- Persist form state to `localStorage`
- Show submitted output in nested preview format

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- `@hello-pangea/dnd`
- `lucide-react`
- `uuid`

## Project Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the local URL shown in terminal (usually `http://localhost:5173`).

## Notes

- No backend is required; all behavior is client-side.
- Saved form data uses the browser key `nestedQuestions`.
