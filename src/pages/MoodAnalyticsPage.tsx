import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { getUserMoodsByUserId } from '../apis/userMoods';
import type { UserMood } from '../types/UserMood';
import './MoodAnalyticsPage.css';
import { useGlobalContext } from '../context/globalContext';
import { hearts } from '../constants';

const COLORS = hearts.map(heart => heart.baseColor);

export function MoodAnalyticsPage() {
    const { user } = useGlobalContext()
    const [userMoods, setUserMoods] = useState<UserMood[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div className="mood-analytics-container">
            <h1>Mood Analytics</h1>
            <p className="mood-summary">Total check-ins: {userMoods.length}</p>

            <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
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

            <div className="mood-details">
                <h2>Note for each moods</h2>
                {chartData.map((mood) => {
                    const moodNotes = userMoods.filter(um => um.mood.name === mood.name);
                    const nonEmptyNotes = moodNotes.filter(um => um.note && um.note.trim() !== '');

                    return (
                        <div key={mood.name} style={{ marginBottom: '24px' }}>
                            <h3>{mood.name} ({moodNotes.length} check-ins)</h3>
                            <ul>
                                {nonEmptyNotes.length ? nonEmptyNotes.map((um, index) => (
                                    <li key={`${um.id}-${index}`}>
                                        {um.note}
                                    </li>
                                )) : <li><em>No notes</em></li>}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
