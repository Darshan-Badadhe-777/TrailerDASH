import {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const API_URL = "https://api.themoviedb.org/3"
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {

    const {data: results } = await axios.get(`${API_URL}/discover/movie`, {

      params:{
        api_key: process.env.REACT_APP_MOVIE_API_KEY
      }


    })

    setMovies(results);

  }

  useEffect (() =>{

    fetchMovies();

  }, [])

  return (
    <div className="App">
      <h1>Darshan</h1>
    </div>
  );
}

export default App;
