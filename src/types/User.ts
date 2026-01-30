export type User = {
    id: string;
    username: string;
    fullName?: string | null;
}

export type UserMood = {
    id: string;
    user: User;
    mood: {
        name: string;
        quotes?: string[];
        image_url?: string;
    };
    note?: string;
    suggestedActivity?: string;
}