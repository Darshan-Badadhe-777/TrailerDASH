import {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import MovieCard from './components/MovieCard';

function App() {

  const API_URL = "https://api.themoviedb.org/3";
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");


  const fetchMovies = async (searchKey) => {

    const type = searchKey ? "search" : "discover"
    const {data} = await axios.get(`${API_URL}/${type}/movie`, {

      params:{
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        query: searchKey
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

  const searchMovies = (e) =>{

    e.preventDefault()
    fetchMovies(searchKey)

  }

  return (
    <div className="App">
      <header>

        <h1>Darshan</h1>
        <form onSubmit={searchMovies}>
          <input type="text" onChange={(e) =>{setSearchKey(e.target.value)}} />
          <button type={"submit"}>Search</button>
        </form>
        
      </header>
 
      
      <div className="container">

        {renderMovies()}
      </div>
    </div>
  );
}

export default App;
