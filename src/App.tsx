import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Favorite from './pages/Favorites'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom';
import { MovieProvider } from './contexts/MovieContext';
import './css/App.css'

function App() {

  return (

    <MovieProvider>
      <NavBar />

      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/favorites" element={<Favorite />}></Route>
          <Route path="/MovieDetails/:ID" element={<MovieDetails />}></Route>
        </Routes>

      </main>
    </MovieProvider>


  )
}

export default App
