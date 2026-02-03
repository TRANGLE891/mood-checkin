import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import './DiaryNotePage.css'
import { useGlobalContext } from '../context/globalContext.tsx'
import { getUserMoodsByUserId, updateUserMood } from '../apis/userMoods.ts'
import type { UserMood } from '../types/UserMood.ts'
import { hearts } from '../constants.ts'

export const DiaryNotePage = () => {
    const { userMoodId } = useParams<{ userMoodId: string }>()
    const navigate = useNavigate()
    const { user, signout } = useGlobalContext()
    const [userMood, setUserMood] = useState<UserMood>()
    const [isLoadingUserMood, setIsLoadingUserMood] = useState(true)
    const [note, setNote] = useState('')
    const [isSaved, setIsSaved] = useState(false)

    const randomQuoteIndex = useMemo(() => {
        // eslint-disable-next-line react-hooks/purity
        return Math.random();
    }, [])

    useEffect(() => {
        if (!userMoodId || !user?.id) {
            setIsLoadingUserMood(false);
            return;
        }

        getUserMoodsByUserId(user.id).then(response => {
            const foundUserMood = response.data?.data?.find(item => `${item.id}` === userMoodId);
            if (foundUserMood) {
                setUserMood(foundUserMood);
                setNote(foundUserMood.note || '');
            } else {
                console.warn(`UserMood with id ${userMoodId} not found for user.`);
            }
        }).finally(() => {
            setIsLoadingUserMood(false);
        })
    }, [user?.id, userMoodId])

    if (isLoadingUserMood) {
        return <div>Loading user mood...</div>;
    }

    if (!user) {
        navigate('/');
        return <div>User not logged in. Redirect</div>
    }

    if (!userMood) {
        navigate('/');
        return <div>No user mood entry.</div>
    }

    const content = hearts.find(h => h.key === userMood.mood.name.toLowerCase());
    if (!userMood) {
        return <div>Missing user mood entry</div>
    }
    if (!content) {
        return <div>Unsupported mood type: {userMood.mood.name}</div>
    }
    const randomQuote = userMood?.mood?.quotes?.[Math.floor((userMood?.mood?.quotes?.length ?? 0) * randomQuoteIndex)];

    const handleSave = () => {
        if (!userMood) {
            throw new Error('No user mood entry to update');
        }

        console.log(`Saved note for ${userMood.mood?.name}:`, note)
        setIsSaved(true)
        updateUserMood({
            id: userMood.id,
            note: note
        })
    }

    const handleBack = () => {
        navigate('/heart')
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
                        alt={`Mood: ${userMood.mood.name}`}
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
