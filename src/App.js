import React, { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import US from './pages/US'
import Arts from './pages/Arts'
import Home from './pages/Home'
import World from './pages/World'
import Science from './pages/Science'
import PageNotFound from './pages/404'
import Navigation from './components/navigation/Navigation'

export const ContextApi = createContext()

const App = () => {
  const [searchContext, setSearchContext] = useState('')

  return (
    <>
      <ContextApi.Provider value={{ searchContext, setSearchContext }}>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/us' element={<US />} />
            <Route path='/world' element={<World />} />
            <Route path='/science' element={<Science />} />
            <Route path='/arts' element={<Arts />} />
            <Route path='/*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ContextApi.Provider>
    </>
  )
}

export default App
