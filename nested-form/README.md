# Nested Form (Task 5)

Dynamic React form that supports parent questions and recursive child questions.

## Features

- Add new parent questions dynamically
- Question fields:
  - Question text
  - Question type: Short Answer or True / False
- Recursive nested questions:
  - Child question button appears only when type is True / False and answer is True
  - Child questions can contain further nested child questions
- Hierarchical auto-numbering:
  - Examples: Q1, Q1.1, Q1.1.1, Q2
- Delete support for any question node (deletes its nested subtree)
- Form submission preview in hierarchical format
- Local storage persistence (restores work on refresh)
- Parent-level drag-and-drop reordering

## Tech Stack

- React + Vite
- Tailwind CSS v4
- Lucide React (icons)
- @hello-pangea/dnd (drag and drop)
- UUID (question ids)

## Run Locally

1. Open terminal in this folder:

	nested-form

2. Install dependencies:

	npm install

3. Start development server:

	npm run dev

4. Build for production:

	npm run build

5. Lint the project:

	npm run lint

## Submission Behavior

When the form is submitted, the entered parent and child questions are displayed in a nested hierarchical review section directly in the UI. No backend/API is required.
