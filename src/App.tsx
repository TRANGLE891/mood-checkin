import { Routes, Route } from 'react-router-dom'
import { CheckinPage } from './pages/CheckinPage'

import { GlobalContextProvider } from './context/GlobalContextProvider'
import { HeartPage } from './pages/HeartPage'
import { DiaryNotePage } from './pages/DiaryNotePage'

function App() {
  return (
    <GlobalContextProvider>
      <Routes>
        <Route path="/" element={<CheckinPage />} />
        <Route path="/heart" element={<HeartPage />} />
        <Route path="/diary/:mood" element={<DiaryNotePage />} />
      </Routes>
    </GlobalContextProvider>
  )
}

export default App
