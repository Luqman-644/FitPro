# FitPro — Fitness Web App + **AI Assistant (Fitness‑Only)**
Live: **https://fittpro.netlify.app/**  
Stack: **React + Vite + Appwrite + Netlify**  
AI Assistant: **Fitness‑only** (use your own OpenAI / Gemini key)

FitPro is a simple fitness website. You can **sign up**, **log in**, **change your password**, and **edit your profile**.  
It also includes an **AI fitness assistant** that answers fitness questions only.

---

## ✨ Main Features
- **Sign Up & Login (Appwrite)** — email and password
- **Protected pages** — only for logged‑in users
- **Change password** — from inside the app
- **Profile** — view and edit your details (name, age, height, weight, goal, etc.)
- **AI Fitness Assistant (fitness‑only)** — answers gym, workout, and basic nutrition questions
- **Responsive** — works on mobile and desktop
- **Easy deploy** — Vite build, Netlify hosting

---

## 🗺️ Pages (Routes)
> Route names can vary. Check your router file for exact paths.

- **/** — **Home**: short intro, links to Login/Signup and the AI Assistant.
- **/auth/signup** — **Sign Up** with email & password.
- **/auth/login** — **Login** and go to the app.
- **/settings/password** — **Change Password** for logged‑in users.
- **/profile** — **My Profile** (view details and avatar).
- **/profile/edit** — **Edit Profile** (update fields, upload avatar).
- **/assistant** — **AI Assistant** for fitness questions only.
- **/404** — **Not Found** page.

---

## 🏗️ Tech
- **Frontend:** React + Vite  
- **Backend services:** Appwrite (Account, Database, Storage)  
- **Deploy:** Netlify

---

## 🔐 Environment Variables
Create a file named `.env` in the project root.

### Appwrite (needed)
```env
VITE_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT_ID="your_project_id"
# Optional if you use DB/Storage:
VITE_APPWRITE_DATABASE_ID="your_database_id"
VITE_APPWRITE_USER_COLLECTION_ID="your_users_collection_id"
VITE_APPWRITE_BUCKET_ID="your_bucket_id_for_avatars"
```

### AI Provider (optional but recommended)
Pick one provider and set the key the app expects.

```env
# 'openai' | 'gemini' | 'other'
VITE_LLM_PROVIDER="openai"

# OpenAI key (if using OpenAI)
VITE_OPENAI_API_KEY="sk-..."

# Google Gemini key (if using Gemini)
VITE_GEMINI_API_KEY="..."
```

> Netlify: add these in **Site configuration → Environment variables**.  
> Vite only exposes variables that start with `VITE_`.

---

## ▶️ Run Locally
```bash
# 1) Install
npm install

# 2) Start dev server
npm run dev


---

## ☁️ Appwrite (Quick Setup)
1. Create a **Project** in Appwrite. Copy the **Project ID**.  
2. Add your web origins (e.g., `http://localhost:5173`, your Netlify domain).  
3. Turn on **Email/Password** auth.  
4. (Optional) Create a **Storage bucket** for avatars.  
5. (Optional) Create a **Database** and a **Users** collection for extra profile fields.  
6. Put these IDs in your `.env` (see above).

---

## 🚀 Deploy to Netlify
1. Push the repo to GitHub.  
2. On Netlify → **New site from Git** → choose this repo.  
3. Build settings:  
   - **Build command:** `npm run build`  
   - **Publish directory:** `dist`  
4. Add the environment variables (same as your `.env`).  
5. Deploy. Your site will be live at your Netlify domain (e.g., `https://fittpro.netlify.app/`).

---

## 🔒 Security
- Appwrite **endpoint** and **project ID** are public in the client. Protect data using **auth** and **rules**.  
- **AI API keys are secrets.** If possible, call AI APIs from a small backend/proxy. If calling from the client, consider limits and topic rules.

---

## 🧠 AI Assistant Rules (Fitness‑Only)
The assistant will:
- Answer **fitness** questions only (training, mobility, recovery basics, simple nutrition for training).  
- **Refuse** non‑fitness topics (coding, politics, exams, etc.).  
- Not give medical diagnoses. For injuries or conditions, it will suggest seeing a professional.

Example policy:
> “You are the FitPro Assistant. Only answer questions about fitness, workouts, mobility, nutrition for training, recovery, and gym safety. Refuse other topics. Do not provide medical diagnoses.”

---

## 📂 Suggested Folders
```
src/
  components/
  pages/
    Auth/
      Login.jsx
      Signup.jsx
    Profile/
      Profile.jsx
      EditProfile.jsx
    Assistant/
      Assistant.jsx
    Settings/
      ChangePassword.jsx
    Home.jsx
    NotFound.jsx
  lib/
    appwrite.js
    auth.js
    ai.js
  routes.jsx
  main.jsx
  App.jsx
public/
```

---

## ✅ Roadmap (Ideas)
- Exercise library (by muscle group & equipment)
- Save programs and track progress
- Rest timers
- More AI tools (plan builder, deload helper)
- Dark mode and accessibility

---

## 👤 Author
**Luqman Ishtiaq** — repo: `Luqman-644/FitPro`  
Live: https://fittpro.netlify.app/
