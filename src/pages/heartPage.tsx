import { Link, useNavigate } from 'react-router-dom'
import './heartPage.css'
import { useGlobalContext } from '../context/globalContext.tsx'
import { createUserMood } from '../apis/userMoods.ts'

type HeartMood = {
    key: string
    label: string
    gradient: string
}

const hearts: HeartMood[] = [
    { key: 'sad', label: 'Sad', gradient: 'linear-gradient(135deg, #4b4b4b, #1d1d1d)' },
    { key: 'peaceful', label: 'Peaceful', gradient: 'linear-gradient(135deg, #62a1ff, #3a63ff)' },
    { key: 'energetic', label: 'Energetic', gradient: 'linear-gradient(135deg, #6dd365, #34a853)' },
    { key: 'joyful', label: 'Joyful', gradient: 'linear-gradient(135deg, #ffde70, #f2b632)' },
    { key: 'beloved', label: 'Beloved', gradient: 'linear-gradient(135deg, #ff7676, #e53935)' },
]

export const HeartPage = () => {
    const { user, setUserMood, signout } = useGlobalContext();
    const navigate = useNavigate();

    const handleHeartClick = async (moodKey: string) => {
        if (!user) {
            throw new Error('User not logged in');
        }
        const createdUserMood = (await createUserMood({
            userId: user.id,
            moodName: moodKey,
            note: '',
            suggestedActivity: ''
        })).data.data

        if (!createdUserMood) {
            throw new Error('Failed to create user mood entry');
        }

        setUserMood(createdUserMood);
        navigate(`/diary/${moodKey}`);
    };

    if (!user) {
        navigate('/');
        return <div>User not logged in. Redirect</div>
    }

    return (
        <div className="heart-page">
            <div className="device">
                <header className="top-bar">
                    <Link to="/" className="back" aria-label="Back to Home">
                        ← Back to Home
                    </Link>
                    <div>User: {user?.username}</div>
                    <button onClick={signout}>Sign out</button>
                </header>

                <section className="hearts-row" aria-label="Heart moods">
                    {hearts.map((heart) => (
                        <button
                            className="heart-item"
                            key={heart.key}
                            onClick={() => handleHeartClick(heart.key)}
                            aria-label={`Select ${heart.label} mood`}
                            type="button"
                        >
                            <span className="heart-shape" style={{ background: heart.gradient }} aria-hidden="true" />
                            <span className="heart-label">{heart.label}</span>
                        </button>
                    ))}
                </section>

                <h1 className="question">How is your heart today?</h1>

                <section className="quote-card" role="figure" aria-label="Calming ocean with quote">
                    <p className="quote">
                        You don’t have to force life to be different to feel peace. Sometimes peace comes from gently accepting what is.
                    </p>
                </section>



                <footer className="footer">Keep this stillness with you.</footer>
            </div>
        </div>
    )
}
