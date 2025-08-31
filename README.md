[한국어로 읽기 (Read in Korean)](README.ko.md)

# Next.js + Supabase Project Template

This is a comprehensive project template designed to quickly bootstrap a new application with a modern, robust, and scalable tech stack.

## Features

*   **Full UI Component Set**: Includes all components from [Shadcn/UI](https://ui.shadcn.com/) pre-installed and ready to use.
*   **Pre-configured Database & Auth**:
    *   **Supabase/Drizzle**: Key setup files (`drizzle.config.ts`, `middleware.ts`) and folders (`db/`, `types/`, `utils/`) are already in place for a seamless database integration.
    *   **Easy Authentication**: A pre-built login page and authentication logic are configured in the `app/auth/login` and `domains/auth` directories.
*   **AI-Assisted Workflow**: Optimized for modern development with guidelines for multiple AI tools:
    *   **Cursor IDE**: Recommended as the base editor.
    *   **Claude**: Includes guides for code generation and implementation.
    *   **Gemini CLI**: Integrated with custom commands for project analysis and management.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **UI**: [Shadcn/UI](https://ui.shadcn.com/)
*   **Database & ORM**: [Supabase](https://supabase.com/) with [Drizzle ORM](https://orm.drizzle.team/)
*   **Authentication**: Supabase Auth with Google OAuth
*   **Deployment**: [Vercel](https://vercel.com/)

## Project Setup

For detailed setup and installation instructions, please refer to the official guide:

### **[>> View the Installation Guide <<](docs/INSTALLATION.md)**

## Basic Workflow

This template is designed to be used with an AI-assisted workflow. Here is a typical process:

1.  **Define Requirements (PRD)**:
    *   Edit the `.cursor/rules/prd.prompt.md` file to add your project's specifications.
    *   Use this to generate a final `prd.md`.

2.  **Create Tasks**:
    *   Use the `.cursor/tasks/task.add.prompt.mdc` template to generate initial development tasks based on your PRD.

3.  **Implement Tasks**:
    *   Use the `.cursor/tasks/task.implement.prompt.md` guide to implement each feature.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
