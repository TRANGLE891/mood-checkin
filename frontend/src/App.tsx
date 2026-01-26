import { Routes, Route } from 'react-router-dom'
import { CheckinPage } from './pages/CheckinPage'
import { HeartPage } from './pages/heartPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CheckinPage />} />
      <Route path="/heart" element={<HeartPage />} />
    </Routes>
  )
}

export default App
