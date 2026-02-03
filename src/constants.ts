
type HeartMood = {
    key: string
    label: string
    gradient: string
    baseColor?: string
    imageUrl: string
}

export const hearts: HeartMood[] = [
    { key: 'sad', label: 'Sad', baseColor: '#1d1d1d', gradient: 'linear-gradient(135deg, #4b4b4b, #1d1d1d)', imageUrl: '/images/sad.png' },
    { key: 'peaceful', label: 'Peaceful', baseColor: '#3a63ff', gradient: 'linear-gradient(135deg, #62a1ff, #3a63ff)', imageUrl: '/images/peace.png' },
    { key: 'energetic', label: 'Energetic', baseColor: '#34a853', gradient: 'linear-gradient(135deg, #6dd365, #34a853)', imageUrl: '/images/energetic.png' },
    { key: 'joyful', label: 'Joyful', baseColor: '#f2b632', gradient: 'linear-gradient(135deg, #ffde70, #f2b632)', imageUrl: '/images/joyful.png' },
    { key: 'beloved', label: 'Beloved', baseColor: '#e53935', gradient: 'linear-gradient(135deg, #ff7676, #e53935)', imageUrl: '/images/beloved.png' },
]
