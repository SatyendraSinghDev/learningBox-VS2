# 📚 LearningBox VS2 — Microfrontend EdTech Platform

A microfrontend-style learning platform built using **Webpack Module Federation**, **React**, **Tailwind CSS**, and **Stencil**.

## 🏗️ Project Structure

```text
learningBox VS2/
├── host/               → Shell app / host container
├── app-page-first/     → Remote 1: API error monitoring app
├── app-page-second/    → Remote 2: Calendar view app
└── stencil-calendar/   → Stencil component library for calendar UI
```

## 🔧 Flow Overview

```text
[app-page-first] --remote--> [host shell]
[app-page-second] --remote--> [host shell]
[stencil-calendar] --component lib--> [app-page-second]

host loads remote bundles from running dev servers
and renders them in a single shell experience.
```

## ⚡ Quick Start

### 1) Install dependencies

```bash
# Host shell
cd host && npm install

# First micro app
cd ../app-page-first && npm install

# Second micro app
cd ../app-page-second && npm install

# Optional: Stencil calendar library
cd ../stencil-calendar && npm install
```

### 2) Start the apps in separate terminals

```bash
# Terminal 1
cd host && npm start

# Terminal 2
cd app-page-first && npm start

# Terminal 3
cd app-page-second && npm start
```

### 3) Open in browser

```text
http://localhost:3000
```

> ⚠️ Start `app-page-first` and `app-page-second` before `host` so remotes are available.

---

## 📦 Apps and Responsibilities

### `host/`
- Main shell app running on `http://localhost:3000`
- Loads remote microfrontends dynamically via Webpack Module Federation
- Provides common layout, navigation, and branding

### `app-page-first/`
- Remote microfrontend running on `http://localhost:3001`
- Demonstrates API error handling and monitoring
- Includes `src/apiInterceptor.js` for native `fetch` error interception
- Displays error banners and request status information

### `app-page-second/`
- Remote microfrontend running on `http://localhost:3002`
- Shows the calendar user interface
- Integrates the `stencil-calendar` component bundle
- Handles date selection, event markers, and month navigation

### `stencil-calendar/`
- Stencil component library for the calendar widget
- Can be built and consumed by the React remote app
- Adds reusable web component UI for calendar rendering

---

## 🧭 Architecture Diagram

```text
              +--------------------+
              |      Host Shell    |
              |  (localhost:3000)  |
              |  - loads remotes    |
              |  - navigation       |
              +----------+---------+
                         |
      +------------------+------------------+
      |                                     |
+-----v------+                       +------v-----+
| App Page   |                       | App Page   |
| First      |                       | Second     |
| (3001)     |                       | (3002)     |
| - API error |                       | - Calendar  |
|   monitoring|                       |   view      |
+------------+                       +------+-----+
                                              |
                                              v
                                   +----------------------+
                                   | stencil-calendar lib |
                                   | - reusable web comp  |
                                   +----------------------+
```

---

## 🛠️ Tech Stack and Packages

### Common packages used across apps
- `react`
- `react-dom`
- `webpack`
- `webpack-cli`
- `webpack-dev-server`
- `@babel/core`
- `@babel/preset-env`
- `@babel/preset-react`
- `babel-loader`
- `css-loader`
- `style-loader`
- `postcss`
- `postcss-loader`
- `tailwindcss`
- `html-webpack-plugin`

### Host / remotes
- React 18
- Webpack 5 + Module Federation
- Tailwind CSS v3
- Native `fetch` API for networking

### Stencil library
- `@stencil/core`
- `typescript`

---

## 📁 Important Files

- `app-page-first/src/apiInterceptor.js` — shared fetch interceptor and error handler
- `host/src/App.jsx` — shell app container and remote loader
- `app-page-second/src/components/StencilCalendarWrapper.jsx` — calendar wrapper component
- `stencil-calendar/src/components/lb-calendar/` — calendar web component source

---

## 🚀 Notes

- This repo uses a microfrontend-style layout, but it is managed as a single root repository.
- If you want separate Git repos per MFE later, each folder can become its own repository.
- For now, `host`, `app-page-first`, `app-page-second`, and `stencil-calendar` are all developed together in one monorepo-like workspace.
