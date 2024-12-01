import React from 'react'

function MovieCard({movie, selectMovie}) {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
    console.log(movie);
  return (
    
    <div className={'movie-card'} onClick={()=>selectMovie(movie)}>
        {movie.poster_path ?<img className={"movie-cover"} src={`${IMAGE_PATH}${movie.poster_path}`}/>
        
    : 
        <div className="movie-placeholder">No Image Found</div>
    
    }
        <h5 className={"movie-title"}>{movie.title}</h5>
    </div>
  )
}

export default MovieCard;
