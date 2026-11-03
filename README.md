# Anisha & Arnav — Wedding Invitation

A React app (Vite, Tailwind CSS v4, Framer Motion), ready to deploy on Netlify.

## Deploy on Netlify

1. Sign in at https://app.netlify.com, then choose **Add new site → Import an existing project → GitHub**.
2. Pick the `Sagar8085/Arnav-wedding` repository. `netlify.toml` fills in the build settings: `npm run build`, publish folder `dist`, Node 20.
3. Click **Deploy**. Every later `git push` to `main` redeploys the site automatically.
4. Optional: in **Site configuration → Change site name**, pick a name such as `anisha-arnav-wedding`.

## Run

```
npm install      # first time only
npm run dev      # open http://localhost:5173  (Hindi: http://localhost:5173/?lang=hi)
```

Phones on the same Wi-Fi can open `http://<this-PC-IP>:5173`.

To make an offline build, run `npm run build` and then `npm run preview`.

## Add photos and music

Put the files at these paths. The page picks them up on refresh, with no code change.

| File | Used for |
| --- | --- |
| `public/photos/couple.jpg` | Couple photo (Bride & Groom section) |
| `public/photos/venue.jpg` | Faded background on the Venue card |
| `public/photos/ganesha.png` | Medallion on the intro doors and the blessing card |
| `public/ganesh-mantra.mp3` | Background music (loops at 30% volume) |
| `public/golden_ganesh_animation.mp4` | Golden Ganesh animation in the intro medallion and blessing card |

Until a file exists, a placeholder appears instead: a gold mandala in place of a photo, and ॐ in place of the Ganesha image. If `music.mp3` is missing, the app plays a soft raga Bhupali melody over a tanpura drone, generated in the browser.

## Change the text

- Names, parents, schedule and venue: `src/i18n.jsx` (English and Hindi)
- Map link, calendar times and file paths: `src/config.js`

## Structure

```
src/
  App.jsx                 intro gate, music, language toggle, map button, auto-scroll
  i18n.jsx                English and Hindi strings, ?lang= support
  config.js               map URL, calendar event, photo and music paths
  lib/music.js            mp3 player with a Web Audio melody as fallback
  components/
    HeroIntro.jsx         "Tap to Open" royal door animation
    Sections.jsx          Welcome, Couple, Details, Schedule, Celebration, Thank You
    Decor.jsx             mandalas, petals, sparkles, frames, photo fallback
```
