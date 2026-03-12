# Maxwell Chukwuebuka — Portfolio
### Full-Stack Web Developer · Lagos, Nigeria

---

## 📁 Project Structure

```
maxwell-vercel/
├── api/
│   └── contact.js       ← Serverless function (Resend email, runs on Vercel servers)
├── public/
│   └── index.html       ← Portfolio (all assets + images embedded, zero dependencies)
├── .env.example         ← Environment variable template
├── .gitignore
├── package.json
├── vercel.json          ← Vercel routing config
└── README.md
```

---

## 🚀 Deploy to Vercel in 5 Steps

### Step 1 — Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `maxwell-portfolio` (or anything you like)
3. Leave it **Public** or **Private** — both work with Vercel
4. Click **Create repository**

### Step 2 — Upload this project to GitHub

**Option A — Using GitHub website (no terminal needed):**
1. On your new repo page, click **uploading an existing file**
2. Drag and drop the entire `maxwell-vercel` folder contents
3. Click **Commit changes**

**Option B — Using terminal:**
```bash
cd maxwell-vercel
git init
git add .
git commit -m "Initial portfolio deploy"
git remote add origin https://github.com/YOUR_USERNAME/maxwell-portfolio.git
git push -u origin main
```

### Step 3 — Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up / log in (free)
2. Click **Add New → Project**
3. Find and click **Import** next to your `maxwell-portfolio` repo
4. Leave all settings as default — Vercel will auto-detect everything
5. Click **Deploy** and wait ~30 seconds

### Step 4 — Add your Resend API Key (CRITICAL)

Without this step the contact form won't send emails.

1. In Vercel, go to your project dashboard
2. Click **Settings** (top nav)
3. Click **Environment Variables** (left sidebar)
4. Add a new variable:
   - **Key:** `RESEND_API_KEY`
   - **Value:** `XXXXXXXXXXXXXXXXXXXXXXX`
   - **Environments:** ✅ Production  ✅ Preview  ✅ Development
5. Click **Save**

### Step 5 — Redeploy to apply the API key

1. Click **Deployments** tab in Vercel
2. Find the latest deployment → click the **⋯** (three dots)
3. Click **Redeploy**
4. Done! ✅

Your site is now live at `https://maxwell-portfolio.vercel.app` (or your custom domain).

---

## 🌐 Adding a Custom Domain (Optional)

1. Go to your project in Vercel → **Settings → Domains**
2. Type your domain (e.g. `maxwellchukwuebuka.dev`) and click **Add**
3. Follow the DNS instructions Vercel gives you
4. Once DNS propagates, update `FROM_EMAIL` in `api/contact.js` to use your domain

---

## 💻 Local Development

```bash
# Install Vercel CLI
npm install -g vercel

# Copy environment file
cp .env.example .env
# Edit .env and add your RESEND_API_KEY

# Run locally (simulates Vercel environment including API routes)
vercel dev
```

Visit `http://localhost:3000`

---

## 📧 How the Contact Form Works

```
User fills form  →  POST /api/contact  →  Vercel serverless function
                                               ↓
                                     Calls Resend API (server-side)
                                               ↓
                                  Email delivered to chuksmaxwell91@gmail.com
```

The API key **never** touches the browser. It lives only on Vercel's servers as an environment variable.

---

## ✏️ Making Updates

After deploying, to update your portfolio:
1. Edit `public/index.html` locally
2. Push to GitHub: `git add . && git commit -m "Update" && git push`
3. Vercel auto-deploys every push — no manual steps needed

---

*Built with HTML, CSS, Vanilla JS · Hosted on Vercel · Email via Resend*
