import { Routes, Route } from 'react-router-dom'
import { CheckinPage } from './pages/CheckinPage'

import { GlobalContextProvider } from './context/GlobalContextProvider'
import { MoodPage } from './pages/MoodPage'
import { DiaryNotePage } from './pages/DiaryNotePage'
import { MoodAnalyticsPage } from './pages/MoodAnalyticsPage'
import { useGlobalContext } from './context/globalContext'

const InternalApp = () => {
  const { isLoadingUser } = useGlobalContext();

  if (isLoadingUser) {
    return <div>Loading...</div>;
  }

  return <Routes>
    <Route path="/" element={<CheckinPage />} />
    <Route path="/heart" element={<MoodPage />} />
    <Route path="/diary/:userMoodId" element={<DiaryNotePage />} />
    <Route path="/mood-analytics" element={<MoodAnalyticsPage />} />
  </Routes>
}

function App() {
  return (
    <GlobalContextProvider>
      <InternalApp />
    </GlobalContextProvider>
  )
}

export default App
