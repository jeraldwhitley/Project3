import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import NewEntry from './pages/NewEntry';

function App() {
  return (
    <>
      <div>
        <h1>Welcome, User!</h1>
      </div>
      <Router>
      <Routes>
        <Route path="/" element={<NewEntry />} />
      </Routes>
      </Router>
    </>
  )
}

export default App
