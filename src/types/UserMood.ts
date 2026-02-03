import type { User } from "./User";

export type UserMood = {
    id: number;
    user: User;
    mood: {
        name: string;
        quotes?: string[];
        image_url?: string;
    };
    createdAt: string;
    updatedAt: string;
    note?: string;
    suggestedActivity?: string;
}