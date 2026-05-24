# Timer & Stopwatch

A responsive React + TypeScript time utility app with two tools in one interface: a countdown timer and a stopwatch with lap tracking. The app uses a custom CSS theme with a dark scenic background, glass-style panels, warm gold accents, and a centered time display.

## Features

- Timer and Stopwatch tabs in a single app shell.
- Countdown timer with editable hours, minutes, and seconds.
- Timer controls for start, pause, and reset.
- Stopwatch controls for start, pause, lap, and reset.
- Lap list that shows the most recent lap first.
- Accessible tab markup using `role="tablist"`, `role="tab"`, and `role="tabpanel"`.
- Live time display with `aria-live="polite"`.
- Responsive CSS layout for desktop and mobile screens.

## Tech Stack

- React
- TypeScript
- Vite
- CSS

## Project Structure

```text
.
├── public/
│   └── bg.png
├── src/
│   ├── components/
│   │   ├── Stopwatch.tsx
│   │   └── Timer.tsx
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
└── README.md
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Runs TypeScript build checks and creates a production build. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | Runs ESLint on the project files. |

## How The App Works

### App Tabs

`src/App.tsx` stores the active tab in React state. It renders either the `Timer` component or the `Stopwatch` component based on the selected tab.

### Timer

`src/components/Timer.tsx` starts with a default duration of 5 minutes. The user can update the duration through hour, minute, and second inputs.

Timer behavior:

- The timer counts down once per second.
- It automatically stops at zero.
- Updating any time input resets the remaining time and pauses the timer.
- The timer button toggles between `Start` and `Pause`.
- The reset button restores the current selected duration.

### Stopwatch

`src/components/Stopwatch.tsx` tracks elapsed time in milliseconds and updates every 10 milliseconds.

Stopwatch behavior:

- The stopwatch can be started and paused.
- The reset button clears elapsed time and saved laps.
- The lap button records the difference between the current elapsed time and the total of previous laps.
- New laps are displayed at the top of the lap list.

## Styling

Global styling is defined in `src/index.css`. It sets the font stack, full-page layout, and background image from `public/bg.png`.

Component styling is defined in `src/App.css`. It controls:

- Centered app layout.
- Glass-style timer panel.
- Tab buttons.
- Time display.
- Timer input fields.
- Primary and secondary buttons.
- Stopwatch lap list.
- Responsive mobile behavior.

## Notes

- The app is private and currently configured as a Vite frontend project.
- No backend server or database is required.
- The background image is referenced as `/bg.png` because it is stored in the `public` directory.

## Future Improvements

- Add sound or browser notification when the timer ends.
- Add keyboard shortcuts for start, pause, reset, and lap.
- Save preferred timer duration in local storage.
- Add light and dark theme options.
- Add automated component tests.
