import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CheckinPage.css'
import { createUser, getUserByUsername } from '../apis/users'
import { useGlobalContext } from '../context/globalContext.tsx'

const avatarSrc =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none"><defs><linearGradient id="hair" x1="20" y1="20" x2="100" y2="20" gradientUnits="userSpaceOnUse"><stop stop-color="%23925B39"/><stop offset="1" stop-color="%2375482E"/></linearGradient></defs><circle cx="60" cy="60" r="55" fill="%23FFE6E0" stroke="%23F9B4B4" stroke-width="4"/><path d="M25 50C25 35 38 22 60 22C82 22 95 35 95 50" fill="url(%23hair)"/><path d="M32 53C32 43 43 36 60 36C77 36 88 43 88 53" fill="%23FFE6E0"/><circle cx="45" cy="64" r="6" fill="%23232323"/><circle cx="75" cy="64" r="6" fill="%23232323"/><circle cx="43" cy="62" r="2.5" fill="white"/><circle cx="73" cy="62" r="2.5" fill="white"/><path d="M47 78C50 82 54 84 60 84C66 84 70 82 73 78" stroke="%23F57AA3" stroke-width="4" stroke-linecap="round"/><circle cx="32" cy="68" r="3" fill="%23F7B7B7"/><circle cx="88" cy="68" r="3" fill="%23F7B7B7"/><path d="M39 48H81" stroke="%23E29F7C" stroke-width="4" stroke-linecap="round"/></svg>'

export const CheckinPage = () => {
    const { user, setUser } = useGlobalContext()
    const [username, setUserName] = useState('')
    const navigate = useNavigate();

    const createUserIfNotExists = useCallback(async () => {

        console.log(`Checking if user ${username} exists and creating if not.`);

        let user = (await getUserByUsername(username, {
            // Allow 404, don't throw error 
            validateStatus: (status) => status === 404 || (status >= 200 && status < 300)
        })).data?.data
        if (user) {
            console.log(`User ${username} already exists.`);
            localStorage.setItem('username', username);
        } else {
            console.log(`User ${username} does not exist. Creating user.`);
            user = await createUser(username);
            console.log(`User ${user?.username} created.`);
        }
        if (user) {
            setUser(user)
            localStorage.setItem('username', user.username);
        } else {
            throw new Error('User creation failed')
        };

    }, [setUser, username]);

    if (user) {
        navigate('/heart')
        return <div>User already logged in. Redirecting</div>;
    }

    return (
        <div className="checkin-page">
            <div className="checkin-card">
                <img className="avatar" src={avatarSrc} alt="Smiling avatar" />

                <h1 className="title">How is your feeling today?</h1>

                <label className="label" htmlFor="userName">
                    Your Name
                </label>
                <input
                    id="userName"
                    name="userName"
                    type="text"
                    className="input"
                    placeholder="Enter your name..."
                    autoComplete="name"
                    value={username}
                    onChange={(event) => setUserName(event.target.value)}
                />

                <button className="cta" type="submit" onClick={createUserIfNotExists}>
                    Check In
                </button>
            </div>
        </div>
    )
}