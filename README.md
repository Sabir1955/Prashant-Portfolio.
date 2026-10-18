# Prashant Kumar — Personal Portfolio

A responsive, animated React personal portfolio for a B.A. graduate. This is a personal introduction website, not a developer portfolio.

## Requirements
- Node.js 18 or newer
- npm

## Run locally
1. Extract the project folder.
2. Open a terminal in this folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Create a production build
```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```

## Personalise the website
Open `src/main.jsx` and edit the `profile` object near the top:
- `college`
- `graduation`
- `location`
- `email`
- `phone`
- `linkedin`
- `instagram`
- `intro`
- `about`

Also update the `skills`, `interests`, and `milestones` arrays so they contain only real details about Prashant.

### Add a real profile photo
The hero currently displays an initials-based placeholder. In `src/main.jsx`, find the `portrait-placeholder` block inside `.hero-visual` and replace it with:
```jsx
<img className="profile-photo" src="/prashant.jpg" alt="Prashant Kumar" />
```
Then add `prashant.jpg` to the `public` folder and add this CSS to `src/styles.css`:
```css
.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}
```

## Interactions included
- Responsive mobile navigation
- Smooth scrolling and active section highlighting
- Scroll-triggered reveal animations
- Animated hero portrait/orbits and skill bars
- Download Profile button that creates a text profile file
- Contact form validation that prepares an email using the visitor's default email app (it does not send messages through a server)
- Friendly notices when placeholder contact details need replacing

## Notes
- Replace all bracketed placeholder details before publishing.
- Skill percentages are illustrative visual indicators, not verified assessments.
- Google Fonts are loaded online; the site uses fallback fonts if unavailable.
- The contact form uses `mailto:` and requires a configured email app. For a true online form, connect a backend or form service.
