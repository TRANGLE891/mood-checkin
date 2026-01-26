import { Link } from 'react-router-dom'
import './heartPage.css'

type HeartMood = {
    key: string
    label: string
    gradient: string
}

const hearts: HeartMood[] = [
    { key: 'lonely', label: 'Lonely', gradient: 'linear-gradient(135deg, #4b4b4b, #1d1d1d)' },
    { key: 'peaceful', label: 'Peaceful', gradient: 'linear-gradient(135deg, #62a1ff, #3a63ff)' },
    { key: 'energetic', label: 'Energetic', gradient: 'linear-gradient(135deg, #6dd365, #34a853)' },
    { key: 'joyful', label: 'Joyful', gradient: 'linear-gradient(135deg, #ffde70, #f2b632)' },
    { key: 'beloved', label: 'Beloved', gradient: 'linear-gradient(135deg, #ff7676, #e53935)' },
]

export const HeartPage = () => {
    return (
        <div className="heart-page">
            <div className="device">
                <header className="top-bar">
                    <Link to="/" className="back" aria-label="Back to Home">
                        ← Back to Home
                    </Link>
                    <div className="user">User: "userName" </div>
                </header>

                <section className="hearts-row" aria-label="Heart moods">
                    {hearts.map((heart) => (
                        <div className="heart-item" key={heart.key}>
                            <span className="heart-shape" style={{ background: heart.gradient }} aria-hidden="true" />
                            <span className="heart-label">{heart.label}</span>
                        </div>
                    ))}
                </section>

                <h1 className="question">How is your heart today?</h1>

                <section className="quote-card" role="figure" aria-label="Calming ocean with quote">
                    <p className="quote">
                        You don’t have to force life to be different to feel peace. Sometimes peace comes from gently accepting what is.
                    </p>
                </section>

                <section className="cta-area">
                    <p className="cta-question">Would you like suggestion for an activity?</p>
                    <button className="cta-button" type="button">
                        Yes, please.
                    </button>
                </section>

                <footer className="footer">Keep this stillness with you.</footer>
            </div>
        </div>
    )
}
