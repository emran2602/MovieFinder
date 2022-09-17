import {useEffect, useState} from 'react';
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';

const film1 = {Poster: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
    Title: "Joker",
    Type: "movie",
    Year: "2019",
    imdbID: "tt7286456"}


 const API_URL = 'https://omdbapi.com/?apikey=debd48f0';

const App = () => {
    const [Movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);

    }
    useEffect(() => {
        searchMovies('Joker');
    },[]);

    return(
        <div className='app'>
            <h1>World of Films</h1>
            <div className='search'>
                <input
                    placeholder='Search for Films'
                    value = {searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value)

                    }}
                
                />
                <img src={SearchIcon} 
                alt='Search' 
                onClick={(e) => { searchMovies(searchTerm)}

                }
                />
            </div>
            {
                Movies?.length > 0
                ? (  <div className='container'>
                        {Movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                  ) :
                  (
                    <div className='empty'>
                        <h2>No results</h2>
                    </div>
                  )

            }


        </div>
    );
}

export default App;