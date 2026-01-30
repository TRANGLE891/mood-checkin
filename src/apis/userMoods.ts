import axios from 'axios'
import { API_BASE_URL } from './common';

const API_PATH = API_BASE_URL + '/api/user-moods';

export const getUserMoodsByUserId = (userId: string) => {
    return axios.get(`${API_PATH}/user/${userId}`);
}

export const createUserMood = async ({
    userId,
    moodName,
    note,
    suggestedActivity
}: { userId: string, moodName: string, note: string, suggestedActivity: string }) => {
    const userMoodData = {
        user: {
            id: userId
        },
        mood: {
            name: moodName
        },
        ...(note && { note: note }),
        ...(suggestedActivity && { suggestedActivity: suggestedActivity })
    };

    return axios.post(`${API_PATH}`, userMoodData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}