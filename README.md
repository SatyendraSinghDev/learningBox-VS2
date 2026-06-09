# 📚 LearningBox — Microfrontend EdTech Platform

A microfrontend architecture built with **Webpack Module Federation**, **React**, and **Tailwind CSS**.

## 🏗️ Architecture

```
learningBox/
├── host/               → Shell app          (runs on port 3000)
├── app-page-first/     → API Error Monitor  (runs on port 3001)
├── app-page-second/    → Calendar View      (runs on port 3002)
└── shared/             → Common utilities   (apiInterceptor.js)
```

## ⚡ Quick Start

### Step 1 — Install dependencies in all 3 apps

```bash
# Terminal 1 — Host
cd host && npm install

# Terminal 2 — AppPageFirst
cd app-page-first && npm install

# Terminal 3 — AppPageSecond
cd app-page-second && npm install
```

### Step 2 — Start all 3 apps (each in its own terminal)

```bash
# Terminal 1
cd host && npm start

# Terminal 2
cd app-page-first && npm start

# Terminal 3
cd app-page-second && npm start
```

### Step 3 — Open browser

```
http://localhost:3000
```

> ⚠️ Start `app-page-first` and `app-page-second` BEFORE the host app, so remotes are available.

---

## 📦 What's Inside

### Host App (port 3000)
- Shell that loads both remote apps dynamically
- Navigation between AppPageFirst and AppPageSecond
- LearningBox branding and layout

### AppPageFirst (port 3001)
- Demonstrates API error handling
- Uses shared `apiInterceptor.js` to catch failed API calls
- Errors are displayed as inline banners on the page

### AppPageSecond (port 3002)
- Central Calendar Component (built with React, Stencil-inspired)
- Select dates, navigate months
- Event indicators on specific dates

### Shared
- `apiInterceptor.js` — native fetch wrapper (no axios), notifies all listeners on error

---

## 🛠️ Tech Stack

- React 18
- Webpack 5 (Module Federation)
- Tailwind CSS
- No axios — pure native fetch
