import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { getUserMoodsByUserId } from '../apis/userMoods';
import type { UserMood } from '../types/UserMood';
import './MoodAnalyticsPage.css';
import { useGlobalContext } from '../context/globalContext';
import { hearts } from '../constants';
import { useNavigate } from 'react-router-dom'
export function MoodAnalyticsPage() {
    const { user, signout } = useGlobalContext()
    const [userMoods, setUserMoods] = useState<UserMood[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate()
    const handleBack = () => {
        navigate('/heart')
    }

    const onUserMoodItemClicked = (item: UserMood) => {
        console.log('Clicked mood item:', item);
        navigate(`/diary/${item.id}`);
    }
    useEffect(() => {
        if (!user) {
            setError('User not logged in');
            setLoading(false);
            return;
        }

        const fetchUserMoods = async () => {
            try {
                setLoading(true);
                const data = (await getUserMoodsByUserId(user.id)).data.data;
                setUserMoods(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch moods');
                console.error('Error fetching user moods:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserMoods();
    }, [user]);

    const chartDataHash = userMoods.reduce((acc, item) => {
        const existing = acc[item.mood.name];
        if (existing) {
            acc[item.mood.name] += 1;
        } else {
            acc[item.mood.name] = 1;
        }
        return acc;
    }, {} as Record<string, number>);
    const chartData = Object.entries(chartDataHash)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => hearts.findIndex(h => h.label === a.name) - hearts.findIndex(h => h.label === b.name));

    if (loading) {
        return <div className="mood-analytics-container">Loading mood data...</div>;
    }

    if (error) {
        return <div className="mood-analytics-container error">Error: {error}</div>;
    }

    if (chartData.length === 0) {
        return <div className="mood-analytics-container">No mood data available</div>;
    }

    const sortedUserMoods = [...userMoods].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div className="mood-analytics-container">
            <h1>Mood Analytics</h1>
            <button className="dairy-back" onClick={handleBack} aria-label="Back to Hearts">
                ← Back
            </button>
            <div className="dairy-user">User: {user?.username}</div>
            <div><button onClick={signout}>Sign out</button></div>

            <p className="mood-summary">Total check-ins: {userMoods.length}</p>

            <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value, percent }) => `${name}: ${value} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={hearts.find(h => h.key === entry.name)?.baseColor || '#8884d8'} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value} check-ins`} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className='mood-details'>
                <h2>Note for each moods</h2>
                <div style={{ display: 'flex' }}>
                    {sortedUserMoods.map((item) => {
                        return (
                            <div style={{
                                padding: '12px',
                                margin: '4px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                // background opacity: 0.6,
                                background: `${hearts.find(h => h.key === item.mood.name.toLowerCase())?.baseColor || '#f0f0f0'}70`,
                            }} key={item.createdAt} onClick={() => onUserMoodItemClicked(item)}>
                                <h5>{new Date(item.createdAt).toLocaleString()}</h5>
                                <div>{item.note ? item.note : <em>No notes</em>}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div >
    );
}
