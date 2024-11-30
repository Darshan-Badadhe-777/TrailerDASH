import {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import MovieCard from './components/MovieCard';

function App() {

  const API_URL = "https://api.themoviedb.org/3"
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {

    const {data} = await axios.get(`${API_URL}/discover/movie`, {

      params:{
        api_key: process.env.REACT_APP_MOVIE_API_KEY
      }


    })

    setMovies(data.results);

  }

  useEffect (() =>{

    fetchMovies();

  }, [])

  const renderMovies = () => (
    
    movies.map(movie =>(
      <MovieCard 
       key={movie.id}
       movie={movie}
      
      />
    ))

  )

  return (
    <div className="App">
      <h1>Darshan</h1>
      <div className="container">

        {renderMovies()}
      </div>
    </div>
  );
}

export default App;
