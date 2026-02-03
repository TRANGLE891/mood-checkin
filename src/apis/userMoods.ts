import axios from 'axios'
import { API_BASE_URL } from './common';
import type { UserMood } from '../types/UserMood';

const API_PATH = API_BASE_URL + 'user-moods';

export const getUserMoodsByUserId = (userId: string) => {
    return axios.get(`${API_PATH}/user/${userId}`) as Promise<{ data: { data: UserMood[] } }>;
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

export const updateUserMood = async (payload: Partial<Pick<UserMood, 'id' | 'note' | 'suggestedActivity'>>) => {
    if (!payload.id) {
        throw new Error('UserMood ID is required for update');
    }

    return axios.put(`${API_PATH}/${payload.id}`, payload, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}       