import axios from 'axios'
import { API_BASE_URL } from './common';
import type { Mood } from '../types/Mood';

const API_PATH = API_BASE_URL + 'moods';

export const getMoods = () => {
    return axios.get(`${API_PATH}`) as Promise<{
        data: {
            count: number,
            data: Mood[],
            status: "success" | "error"
        }
    }>;
}
