import {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import YouTube from 'react-youtube';

function App() {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const API_URL = "https://api.themoviedb.org/3";
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});
  const [playTrailer, setPlayTrailer] = useState(false);


  const fetchMovies = async (searchKey) => {

    const type = searchKey ? "search" : "discover"
    const {data} = await axios.get(`${API_URL}/${type}/movie`, {

      params:{
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        query: searchKey
      }


    })

    
    setMovies(data.results);
    await selectMovie(data.results[0])

  }

  const fetchMovie = async (id) => {
    const {data} = await axios.get(`${API_URL}/movie/${id}`, {

      params:{
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        append_to_response: 'videos'
       
      }


    })

    return data
  }

  const selectMovie = async (movie) =>{

    setPlayTrailer(false)
    const data = await fetchMovie(movie.id)
    setSelectedMovie({...movie, videos: data.videos});
  }   

  useEffect (() =>{

    fetchMovies();

  }, [])

  const renderMovies = () => (
    
    movies.map(movie =>(
      <MovieCard 
       key={movie.id}
       movie={movie}
       selectMovie={selectMovie}
      
      />
    ))

  )

  const searchMovies = (e) =>{

    e.preventDefault()
    fetchMovies(searchKey)

  }

  const renderTrailer = () =>{

    const trailer = selectedMovie.videos.results.find(vid => vid.name === 'Official Trailer')
    const key =trailer ? trailer.key : selectedMovie.videos.results[0].key
    return(
      <div  className="youtube-container">
      <YouTube
      
        videoId={key}
        opts = {{
          width: "100%",
          height: "100%",
          playerVars:{
            autoplay: 1,
            controls: 0
          }
        }}
      />
    </div>

    )
  
  }

  return (
    <div className="App">
      <header className='header'>
        <div className="header-content max-center">

            <span>TrailerDASH</span>
            <form onSubmit={searchMovies}>
             <input type="text" onChange={(e) =>{setSearchKey(e.target.value)}} />
            <button type={"submit"}>Search</button>
            </form>
        </div>
      </header>

      <div className="hero" style={{ backgroundImage: `url('${IMAGE_PATH}${selectedMovie.backdrop_path}')` }}>

          <div className="hero-content max-center"  >
            { playTrailer ? <button  className={"button button-close"} onClick={() => setPlayTrailer(false)}>Close</button>  : null}
            {selectedMovie.videos && playTrailer ? renderTrailer() : null}
            <button className={"button"} onClick={() => setPlayTrailer(true)}>Play Trailer</button>
              <h1 className={"hero-title"}>{selectedMovie.title}</h1>
              {selectedMovie.overview ? <p className={"hero-overview"}> {selectedMovie.overview}</p> : null}
          </div>

          

      </div>
 
      
      <div className="container max-center ">

        {renderMovies()}
      </div>
    </div>
  );
}

export default App;
