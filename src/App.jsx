import MovieCard from './components/MovieCard.jsx'
import Home from './pages/Home.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import Favorite from './pages/Favorites.jsx'
import NavBar from './components/NavBar.jsx'
import { Route, Routes } from 'react-router-dom';
import { MovieProvider } from './contexts/MovieContext.jsx';
import './css/App.css'

function App() {



  const movieNumber = 1;



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
