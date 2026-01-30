import axios from 'axios'
import { API_BASE_URL } from './common';

const API_PATH = API_BASE_URL + 'users';

export const getUsers = () => {
    return axios.get(`${API_PATH}`);
}

export const createUser = async (username: string, fullName: string | null = null) => {
    try {
        const response = await axios.post(`${API_PATH}`, {
            username: username,
            ...(fullName && { fullName: fullName })
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}