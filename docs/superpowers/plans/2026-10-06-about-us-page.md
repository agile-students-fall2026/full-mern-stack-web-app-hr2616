# About Us Page Implementation Plan

> **For agentic workers:** Implement the steps in order in the current repository. Do not add or run automated tests unless the user asks for them.

**Goal:** Add an About page whose bio and portrait URL come from a new backend JSON route.

**Architecture:** Express serves a static `GET /about` JSON object. The image is stored under Vite's public directory and referenced with a root-relative URL. A React page fetches the response with the existing Axios dependency and is linked through React Router and the shared header.

**Tech Stack:** Express, React, React Router, Axios, Vite.

## Global Constraints

- The page content and image URL must come from JSON data retrieved from a new backend route.
- Do not add database models or dependencies.
- Do not copy CV phrasing or include its private contact details.
- Do not add or run automated tests unless the user asks for them.

---

### Task 1: Add the profile data route and portrait

**Files:**
- Modify: `back-end/app.js`
- Create: `front-end/public/hassan-raza.jpeg`

**Interfaces:**
- Produces: `GET /about`, returning `{ eyebrow: string, title: string, name: string, paragraphs: string[], imageUrl: string, imageAlt: string }`.
- The `imageUrl` value is `/hassan-raza.jpeg`.

- [ ] **Step 1: Copy the user-provided photo into the public assets folder**

Run from the repository root:

```bash
cp "/Users/hassan/Documents/Personal/Face/Copy of IMG_6794.jpeg" front-end/public/hassan-raza.jpeg
```

Expected: `front-end/public/hassan-raza.jpeg` exists.

- [ ] **Step 2: Add the static JSON route**

In `back-end/app.js`, add this route after the model imports and before the message routes:

```js
app.get('/about', (req, res) => {
  res.json({
    eyebrow: 'ABOUT',
    title: 'About Us',
    name: 'Hassan Raza',
    paragraphs: [
      "I'm Hassan Raza, a 20-year-old from Karachi, Pakistan, and a junior studying Computer Science at NYU Abu Dhabi. This semester, I'm studying away at NYU's New York campus and getting to know university life in a new city.",
      "At NYU Abu Dhabi, I worked on research into making machine learning more energy-efficient. I also built Niklo, a guide to places around Karachi. It was nice to work on something connected to the city I grew up in.",
      'I love playing football and try to get a game in whenever I can.',
    ],
    imageUrl: '/hassan-raza.jpeg',
    imageAlt: 'Hassan smiling in a snowy mountain setting',
  })
})
```

Expected: the endpoint returns the profile without depending on MongoDB.

### Task 2: Add the About page and navigation

**Files:**
- Create: `front-end/src/About.jsx`
- Create: `front-end/src/About.css`
- Modify: `front-end/src/App.jsx`
- Modify: `front-end/src/Header.jsx`

**Interfaces:**
- Consumes: `GET ${import.meta.env.VITE_SERVER_HOSTNAME}/about`.
- Produces: a page at `/about` that displays the API-provided name, paragraphs, and image URL.

- [ ] **Step 1: Create a data-fetching page component**

Create `front-end/src/About.jsx` with:

```jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import './About.css'

const About = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_HOSTNAME}/about`)
      .then(response => setProfile(response.data))
      .catch(() => setError('About information could not be loaded.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="About-status" role="status">Loading about information...</p>
  }

  if (error) {
    return <p className="About-error" role="alert">{error}</p>
  }

  if (!profile) {
    return null
  }

  return (
    <section className="About-page" aria-labelledby="about-title">
      <div className="About-copy">
        <p className="About-eyebrow">{profile.eyebrow}</p>
        <h1 id="about-title">{profile.title}</h1>
        <h2 className="About-name">{profile.name}</h2>
        <div className="About-paragraphs">
          {profile.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <img
        className="About-portrait"
        src={profile.imageUrl}
        alt={profile.imageAlt}
      />
    </section>
  )
}

export default About
```

- [ ] **Step 2: Add responsive page styling**

Create `front-end/src/About.css` with:

```css
.About-page {
  align-items: center;
  display: grid;
  gap: clamp(2rem, 6vw, 5rem);
  grid-template-columns: minmax(0, 1fr) minmax(250px, 0.78fr);
  margin: 0 auto;
  max-width: 980px;
  padding: 2rem 1rem;
  text-align: left;
}

.About-eyebrow {
  color: #68707c;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  margin-bottom: 0.75rem;
}

.About-copy h1 {
  color: #20242c;
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 1.5rem;
}

.About-paragraphs {
  color: #414853;
  line-height: 1.75;
  max-width: 38rem;
}

.About-paragraphs p + p {
  margin-top: 1rem;
}

.About-portrait {
  aspect-ratio: 4 / 5;
  border-radius: 1rem;
  display: block;
  max-height: 480px;
  object-fit: cover;
  width: 100%;
}

.About-status,
.About-error {
  margin: 2rem auto;
  max-width: 40rem;
}

.About-error {
  color: #a32121;
}

@media (max-width: 680px) {
  .About-page {
    grid-template-columns: 1fr;
    max-width: 38rem;
    padding: 1.5rem 0.5rem;
  }

  .About-portrait {
    max-height: 520px;
  }
}
```

- [ ] **Step 3: Register the page route**

Import `About` in `front-end/src/App.jsx` and add:

```jsx
<Route path="/about" element={<About />} />
```

- [ ] **Step 4: Add the shared navigation link**

In `front-end/src/Header.jsx`, add a navigation item with `<Link to="/about">About</Link>`.

### Task 3: Run the app and check the new route

**Files:**
- No further source changes expected.

- [ ] **Step 1: Install existing dependencies if needed**

Run `npm ci` in `back-end` and `front-end` if their `node_modules` folders are missing. Do not change package manifests or lockfiles.

- [ ] **Step 2: Build the frontend**

Run `npm run build` in `front-end`.

Expected: TypeScript and Vite complete successfully.

- [ ] **Step 3: Start the backend and frontend locally**

Run `npm start` in `back-end` and `npm run dev` in `front-end`. The backend may log a MongoDB connection error if Docker is unavailable. The About endpoint does not use the database.

- [ ] **Step 4: Check the feature in the browser**

Open the frontend at `http://localhost:7002/about`. Confirm the About navigation link works, the portrait loads, and all three paragraphs appear. Open `http://localhost:5002/about` and confirm it returns the expected JSON fields.
