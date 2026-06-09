# stencil-calendar

Stencil.js web component — `<lb-calendar>` — for LearningBox EdTech platform.

## Build karo (ek baar karna hai)

```bash
cd stencil-calendar
npm install
npm run build
```

Build hone ke baad `dist/` folder banega.

## React mein use karne ke liye — dist copy karo

```bash
# stencil-calendar folder ke andar se run karo
cp dist/stencil-calendar/stencil-calendar.esm.js ../app-page-second/src/stencil-dist/stencil-calendar.js
```

Ya shortcut — root se:
```bash
mkdir -p app-page-second/src/stencil-dist
cp stencil-calendar/dist/stencil-calendar/stencil-calendar.esm.js app-page-second/src/stencil-dist/stencil-calendar.js
```

## Component Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `events` | JSON string | built-in events | Array of `{day, title, type, dot}` |
| `highlight-today` | boolean | true | Today ko highlight karo |

## Event

| Event | Detail | Description |
|---|---|---|
| `dateSelected` | ISO date string | Date select hone par fire hota hai |

## Direct HTML mein use (test ke liye)

```html
<script type="module" src="./dist/stencil-calendar/stencil-calendar.esm.js"></script>
<lb-calendar highlight-today="true"></lb-calendar>
```
