import { Route, Routes } from 'react-router-dom'
import './css/style.css'

import Home from './pages/Home';
import MyAnime from './pages/MyAnime';
import Planned from './pages/Planned';
import Ranking from './pages/Ranking';
import Planner from './pages/Planner';
import Profile from './pages/Profile';
import React from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';


function App() {
  
  const [isShrinked, setIsShrinked] = React.useState(false)

  function handleShrink() {
    setIsShrinked(!isShrinked)
  }

  return (
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/signup" Component={SignUp} />
      <Route path="/home" element={<Home isShrinked={isShrinked} handleShrink={handleShrink} />} />
      <Route path="/my_anime" element={<MyAnime isShrinked={isShrinked} handleShrink={handleShrink} />} />
      <Route path="/planned" element={<Planned isShrinked={isShrinked} handleShrink={handleShrink} />} />
      <Route path="/ranking" element={<Ranking isShrinked={isShrinked} handleShrink={handleShrink} />} />
      <Route path="/planner" element={<Planner isShrinked={isShrinked} handleShrink={handleShrink} />} />
      <Route path="/profile" element={<Profile isShrinked={isShrinked} handleShrink={handleShrink} />} />
    </Routes>
  )
}

export default App
