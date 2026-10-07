# About Us Page Design

## Goal

Add an About Us page to the existing MERN exercise app. The page must receive its text and image URL from a JSON route on the Express backend, as required by the README.

## Existing project context

- The Express app and existing JSON endpoints are defined in `back-end/app.js`.
- The React Router routes are defined in `front-end/src/App.jsx`.
- The shared navigation is in `front-end/src/Header.jsx`.
- Existing frontend API calls use Axios and `VITE_SERVER_HOSTNAME`, as shown in `front-end/src/Messages.jsx`.
- Vite serves static assets from `front-end/public`.

## Design

Add `GET /about` to the Express app. It returns a JSON object with `eyebrow`, `title`, `name`, `paragraphs`, `imageUrl`, and `imageAlt` fields. The text is static because it describes the app owner and does not need database storage. The image is copied into the frontend public directory. The route returns its root-relative URL, `/hassan-raza.jpeg`, so the browser loads it from the frontend origin.

Add an About page component that requests `/about` with Axios when it loads. It shows a loading message while waiting, a readable error message if the request fails, and the profile once the response arrives. The profile title, eyebrow, name, portrait URL and alt text, and paragraphs all come from the API response. Add `/about` to the React Router and add an About link to the shared header navigation.

## Bio content

Use three short paragraphs based on the user's facts and CV, with fresh wording:

1. "I'm Hassan Raza, a 20-year-old from Karachi, Pakistan, and a junior studying Computer Science at NYU Abu Dhabi. This semester, I'm studying away at NYU's New York campus and getting to know university life in a new city."
2. "At NYU Abu Dhabi, I worked on research into making machine learning more energy-efficient. I also built Niklo, a guide to places around Karachi. It was nice to work on something connected to the city I grew up in."
3. "I love playing football and try to get a game in whenever I can."

Do not include phone numbers, email addresses, or other CV contact details. Do not copy CV phrasing.

## Data flow and error handling

The About page makes one request to the backend after mounting. The frontend reads the response fields and renders the content. While loading, it shows a short status message. If the request fails, it shows a concise error and does not try to render incomplete profile data.

## Scope

This change does not add a database model, new dependencies, a contact section, or a profile editing interface. It does not alter existing routes or message behavior.

## Verification

Verify the backend route response, the frontend production build, and the page in the running app where the local environment allows. Do not add or run automated tests unless the user asks for them.
