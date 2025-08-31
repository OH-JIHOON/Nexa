# Template Repository Installation and Setup Guide

This document guides you through setting up a new project using the `Next.js + Shadcn/UI + Supabase/Drizzle + Google OAuth + Vercel` stack.

## Choose Your Setup Method

You can choose between the **GUI-based method** and the **CLI-based method** for project setup. The CLI method is faster and more automated, but the GUI method allows for a clearer understanding of each step.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Project Setup](#1-initial-project-setup)
3. [Supabase Setup](#2-supabase-setup)
4. [Google Cloud & OAuth Setup](#3-google-cloud--oauth-setup)
5. [Vercel Deployment & Final Setup](#4-vercel-deployment--final-setup)
6. [Run & Verify Local Dev Server](#5-run--verify-local-dev-server)
7. [Project Planning & Task Management](#6-project-planning--task-management)

---

## Prerequisites

### Required Accounts
- GitHub Account
- Supabase Account
- Google Cloud Account
- Vercel Account

### CLI Tools (If choosing the CLI method)
If you opt for the CLI-based setup, please install and log in to the following tools:

- [**GitHub CLI**](https://cli.github.com/): To manage GitHub repositories
- [**Supabase CLI**](https://supabase.com/docs/guides/cli): To manage Supabase projects
- [**Vercel CLI**](https://vercel.com/docs/cli): To manage Vercel deployments

```bash
# Log in to each CLI
gh auth login
supabase login
vercel login
```

---

## 1. Initial Project Setup

<details>
<summary><strong>GUI Method</strong></summary>

1. **Create a new repository from the template**
   - On the GitHub template repository page, click `Use this template` > `Create a new repository` to generate a new project repository.

2. **Clone locally and install dependencies**
   ```bash
   # Clone the created repository locally
   git clone https://github.com/your-username/your-new-repository.git
   
   # Navigate to the project directory
   cd your-new-repository
   
   # Install dependencies
   npm install
   ```

3. **Create environment variable file**
   ```bash
   cp .env.example .env
   ```
</details>

<details>
<summary><strong>CLI Method</strong></summary>

```bash
# Create a new public repository from the template and clone it
gh repo create your-new-repository --public --clone --template=template-repo-name
cd your-new-repository

# Install dependencies and prepare the .env file
npm install
cp .env.example .env
```
</details>

---

## 2. Supabase Setup

<details>
<summary><strong>GUI Method</strong></summary>

1. **Create a Supabase Project**
   - Go to the [Supabase Dashboard](https://supabase.com/dashboard/org/) and click `New project`.
   - Enter a **Project name**.
   - For **Database password**, click `Generate a password` and copy the generated password to a safe place.
   - Select `Asia Pacific (Seoul)` as the **Region**.
   - Click `Create new project`.

2. **Configure Environment Variables (`.env`)**
   - Find the following values from your new Supabase project and add them to your `.env` file:

   | Variable | Location | Description |
   | :--- | :--- | :--- |
   | `DATABASE_PASSWORD` | (Copied in step 1) | Database password |
   | `SUPABASE_PROJECT_ID` | `Settings` > `General` | Supabase project ID |
   | `NEXT_PUBLIC_SUPABASE_URL` | `Settings` > `API` > `Project URL` | Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `Settings` > `API` > `Project API Keys` > `public` / `anon` key | Client-side public key |
   | `SUPABASE_SERVICE_ROLE` | `Settings` > `API` > `Project API Keys` > `secret` key | Server-side secret key |
   | `DIRECT_URL` | `Connect` > `ORMs` > `Drizzle` | Direct database connection URL (Port 6543) |
   | `DATABASE_URL` | `Connect` > `ORMs` > `Drizzle` | Database connection URL (Port 5432) |

3. **Database Migration**
   ```bash
   npm run db:migrate
   ```
</details>

<details>
<summary><strong>CLI Method</strong></summary>

```bash
# Create a new Supabase project
# Find your organization ID in the Supabase dashboard URL (https://supabase.com/dashboard/org/YOUR-ORG-ID)
supabase projects create "Your Project Name" \
  --org-id "Your-Org-ID" \
  --db-password "A-Strong-Password" \
  --region ap-northeast-2

# Take note of the outputted project-ref, anon key, and service role key

# Link the local project to your Supabase project
supabase link --project-ref <your-project-id>

# Update the .env file manually (using the values you noted)
# Or, set them automatically with the script below (warning: verify project ID)
echo "SUPABASE_PROJECT_ID=<your-project-id>" >> .env
echo "NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co" >> .env
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>" >> .env
echo "SUPABASE_SERVICE_ROLE=<your-service-role-key>" >> .env

# Database URLs must be added after checking the Supabase dashboard
# See the Connect > ORMs > Drizzle section

# Database Migration
npm run db:migrate
```
</details>

---

## 3. Google Cloud & OAuth Setup

This step can only be configured through the GUI.

1. **Create a Google Cloud Project**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/welcome) to create a new project.

2. **Configure OAuth Consent Screen**
   - Navigate to `APIs & Services` > `OAuth consent screen`.
   - Select `External` as the **User Type**.
   - Fill in the app name, user support email, and developer contact information (email), then save and continue.
   - In the **Scopes** section, add the following three scopes and save:
     - `.../auth/userinfo.email`
     - `.../auth/userinfo.profile`
     - `openid`

3. **Create OAuth Client ID**
   - Navigate to `Credentials` > `Create Credentials` > `OAuth client ID`.
   - **Application type**: `Web application`.
   - **Authorized redirect URIs**:
     - Add the **Callback URL** from your Supabase dashboard (`Authentication` > `Providers` > `Google`).
     - Add `http://localhost:3000` for local testing.
   - Click `Create` to generate your **Client ID** and **Client Secret**.

4. **Add Google Credentials to Environment Variables and Supabase**
   - **Update `.env` file**:
     ```bash
     GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
     GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
     ```
   - **Configure Supabase**:
     - Go to `Authentication` > `Providers` > `Google` in your Supabase dashboard.
     - Enable `Google`, paste your Client ID and Secret, and save.

---

## 4. Vercel Deployment & Final Setup

<details>
<summary><strong>GUI Method</strong></summary>

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "Initial setup"
   git push origin main
   ```

2. **Create and Deploy Vercel Project**
   - Go to the [Vercel Dashboard](https://vercel.com/) and click `New Project`.
   - `Import` the GitHub repository you just pushed to.
   - In the **Environment Variables** section, add all the variables from your local `.env` file.
   - Click `Deploy`.

3. **Update Supabase URL Configuration**
   - Once deployment is complete, copy the **domain (URL)** from your Vercel dashboard.
   - Go to `Authentication` > `URL Configuration` in your Supabase dashboard.
   - **Site URL**: Paste the Vercel deployment domain.
   - **Redirect URLs**: Add URLs in the following formats:
     - `http://localhost:3000/**`
     - `https://your-project-name.vercel.app/**`

4. **Add Final Environment Variable**
   - **Local `.env` file**:
     ```bash
     NEXT_PUBLIC_SITE_URL="https://your-project-name.vercel.app"
     ```
   - **Vercel Dashboard**: Add `NEXT_PUBLIC_SITE_URL` to `Settings` > `Environment Variables`.
</details>

<details>
<summary><strong>CLI Method</strong></summary>

```bash
# Push code to GitHub
git add .
git commit -m "Initial setup"
git push origin main

# Link to a Vercel project
vercel link

# Add environment variables to Vercel (for production)
cat .env | grep -v '^#' | grep -v '^$' | while IFS='=' read -r key value; do
  vercel env add "$key" production <<< "$value"
done

# Deploy to production
vercel --prod

# Get deployment URL, update .env, and add to Vercel
DEPLOYMENT_URL=$(vercel ls --json | jq -r '.deployments[0].url')
echo "NEXT_PUBLIC_SITE_URL=https://$DEPLOYMENT_URL" >> .env
vercel env add NEXT_PUBLIC_SITE_URL production <<< "https://$DEPLOYMENT_URL"
```

**Important**: Even with the CLI method, you must manually update the following in your Supabase dashboard:
- Site URL and Redirect URLs in `Authentication` > `URL Configuration`.
</details>

---

## 5. Run & Verify Local Dev Server

1. **Run the development server**
   ```bash
   npm run dev
   ```

2. **Verify login functionality**
   - Open `http://localhost:3000` and attempt to log in with Google.
   - **Browser Check**: In your browser's developer tools, check for login-related cookies under `Application` > `Cookies`.
   - **Supabase Check**: In your Supabase dashboard, verify that a new user has been registered under `Authentication` > `Users`.

---

## 6. Project Planning & Task Management

- **Write PRD (Product Requirements Document)**:
  - Use the `.cursor/rules/prd.prompt.md` file as a reference to write your project specifications in `.cursor/rules/prd.md`.

- **Create Tasks**:
  - Utilize the `.cursor/tasks/task.add.prompt.mdc` template to generate initial development tasks.

- **Implement Tasks**:
  - Use the `.cursor/tasks/task.implement.prompt.md` file as a guide to implement each task.

---

## Troubleshooting

### Common Issues

<details>
<summary>Supabase Connection Errors</summary>

- Verify that `DATABASE_URL` and `DIRECT_URL` are set correctly.
- If your database password contains special characters, it may need to be URL-encoded.
- Ensure your Supabase project is active.
</details>

<details>
<summary>Google OAuth Login Failure</summary>

- Double-check that the redirect URIs are set correctly in the Google Cloud Console.
- Ensure the Google Provider is enabled in Supabase.
- Verify that the Client ID and Secret are entered correctly.
</details>

<details>
<summary>Vercel Deployment Failure</summary>

- Confirm that all environment variables have been added to your Vercel project settings.
- Check the Build logs for specific error messages.
- Check for Node.js version compatibility.
</details>