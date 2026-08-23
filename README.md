# Wedding Invitation

An interactive wedding invitation built with Angular.

## Features

- Save-the-date cover with an interactive seal
- Wedding story and family invitation details
- Scratch card revealing the wedding date and time
- Event timeline
- Venue section with Google Maps link
- Live countdown to November 22, 2026
- Responsive design for mobile and desktop screens

## Requirements

- Node.js 20 or newer
- npm

## Getting Started

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the Angular development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run watch` | Build in development mode and watch for changes |

## Project Structure

```text
src/
  app/
    app.component.html  Invitation markup
    app.component.scss  Invitation styles
    app.component.ts    Invitation behavior and countdown
  index.html             Application entry page
  main.ts                Angular bootstrap file
  styles.scss            Global styles
```

## Customization

Invitation details such as names, date, time, venue, and story are defined in `src/app/app.component.ts`. The main invitation layout is in `src/app/app.component.html`, with component-specific styling in `src/app/app.component.scss`.

## GitHub

The project remote is:

```text
https://github.com/AdithyaBhandary/wedding-invitation.git
```

To publish local commits:

```bash
git push -u origin main
```
