
type HeartMood = {
    key: string
    label: string
    gradient: string
    baseColor?: string
}

export const hearts: HeartMood[] = [
    { key: 'sad', label: 'Sad', baseColor: '#1d1d1d', gradient: 'linear-gradient(135deg, #4b4b4b, #1d1d1d)' },
    { key: 'peaceful', label: 'Peaceful', baseColor: '#3a63ff', gradient: 'linear-gradient(135deg, #62a1ff, #3a63ff)' },
    { key: 'energetic', label: 'Energetic', baseColor: '#34a853', gradient: 'linear-gradient(135deg, #6dd365, #34a853)' },
    { key: 'joyful', label: 'Joyful', baseColor: '#f2b632', gradient: 'linear-gradient(135deg, #ffde70, #f2b632)' },
    { key: 'beloved', label: 'Beloved', baseColor: '#e53935', gradient: 'linear-gradient(135deg, #ff7676, #e53935)' },
]
