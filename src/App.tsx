import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home'
import Country_details from './components/country-details'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about_country' element={<Country_details />} />
        {/* <Route path='/second_page/*' element={<Second_page authorized={false} />} /> */}
      </Routes>
    </HashRouter>
  )
}

export default App
