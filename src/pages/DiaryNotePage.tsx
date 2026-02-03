import { useNavigate, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import './DiaryNotePage.css'
import { useGlobalContext } from '../context/globalContext.tsx'
import { updateUserMood } from '../apis/userMoods.ts'

type MoodContent = {
    gradient: string
    imageUrl: string
}

const moodContents: Record<string, MoodContent> = {
    sad: {
        gradient: 'linear-gradient(135deg, #4b4b4b, #1d1d1d)',
        imageUrl: '/images/sad.png',
    },
    peaceful: {
        gradient: 'linear-gradient(135deg, #62a1ff, #3a63ff)',
        imageUrl: '/images/peace.png',
    },
    energetic: {
        gradient: 'linear-gradient(135deg, #6dd365, #34a853)',
        imageUrl: '/images/energetic.png',
    },
    joyful: {
        gradient: 'linear-gradient(135deg, #ffde70, #f2b632)',
        imageUrl: '/images/joyful.png',
    },
    beloved: {
        gradient: 'linear-gradient(135deg, #ff7676, #e53935)',
        imageUrl: '/images/beloved.png',
    }
}

export const DiaryNotePage = () => {
    const { mood } = useParams<{ mood: string }>()
    const navigate = useNavigate()
    const { user, moods, userMood, signout } = useGlobalContext()

    const currentMoodObj = mood ? moods[mood] : undefined;
    const randomQuote = useMemo(() => {
        // eslint-disable-next-line react-hooks/purity
        return currentMoodObj?.quotes[Math.floor(Math.random() * currentMoodObj.quotes.length)];
    }, [currentMoodObj?.quotes])

    const [note, setNote] = useState('')
    const [isSaved, setIsSaved] = useState(false)

    const content = mood ? moodContents[mood] : undefined;

    const handleSave = () => {
        if (!userMood) {
            throw new Error('No user mood entry to update');
        }

        console.log(`Saved note for ${mood}:`, note)
        setIsSaved(true)
        updateUserMood({
            id: userMood.id,
            note: note
        })
    }

    const handleBack = () => {
        navigate('/heart')
    }

    if (!user) {
        navigate('/');
        return <div>User not logged in. Redirect</div>
    }

    if (!userMood) {
        navigate('/');
        return <div>No user mood entry.</div>
    }

    if (!currentMoodObj) {
        return <div>Unknown mood entry. {mood}</div>
    }

    if (!content) {
        return <div>Missing content for mood entry {mood}</div>
    }


    return (
        <div className="dairy-page" style={{ background: content?.gradient }}>
            <div className="dairy-device">
                <header className="dairy-top-bar">
                    <button className="dairy-back" onClick={handleBack} aria-label="Back to Hearts">
                        ← Back
                    </button>
                    <div className="dairy-user">User: {user?.username}</div>
                    <div><button onClick={signout}>Sign out</button></div>
                </header>
                <div className="dairy-image-container">
                    <img
                        src={content.imageUrl}
                        alt={`Mood: ${mood}`}
                        className="dairy-image"
                    />
                </div>

                <div className="dairy-quote-section">
                    <p className="dairy-quote">{randomQuote}</p>
                </div>

                <div className="dairy-note-section">
                    <textarea
                        className="dairy-textarea"
                        placeholder="My Daily Note..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        aria-label="Daily note text area"
                    />
                </div>

                <div className="dairy-actions">
                    <button
                        className="dairy-save-button"
                        onClick={handleSave}
                        disabled={!note.trim()}
                    >
                        {isSaved ? '✓ Saved!' : 'Save Note'}
                    </button>
                </div>

                <section className="cta-area">
                    <p className="cta-question">Would you like suggestion for an activity?</p>
                    <button className="cta-button" type="button">
                        Yes, please.
                    </button>
                </section>

                <footer className="dairy-footer">Life is like a box of chocolates—you never know what flavor you’ll get tomorrow. Live to discover.</footer>
            </div>
        </div>
    )
}
