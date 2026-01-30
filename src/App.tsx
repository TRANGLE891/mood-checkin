import { Routes, Route } from 'react-router-dom'
import { CheckinPage } from './pages/CheckinPage'

import { GlobalContextProvider } from './context/GlobalContextProvider'
import { HeartPage } from './pages/heartPage'

function App() {
  return (
    <GlobalContextProvider>
      <Routes>
        <Route path="/" element={<CheckinPage />} />
        <Route path="/heart" element={<HeartPage />} />
      </Routes>
    </GlobalContextProvider>
  )
}

export default App
