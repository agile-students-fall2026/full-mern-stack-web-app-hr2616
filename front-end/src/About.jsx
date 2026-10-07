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
    return (
      <p className="About-status" role="status">
        Loading about information...
      </p>
    )
  }

  if (error) {
    return (
      <p className="About-error" role="alert">
        {error}
      </p>
    )
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
