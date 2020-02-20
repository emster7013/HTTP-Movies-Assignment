import React, { useState , useEffect} from "react";
import { Route } from "react-router-dom";
import axios from 'axios';
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const [movie, setMovie] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        console.log('this is your movie API',res.data)
        setMovie(res.data);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} movie={movie} editMovie={setMovie}  />;
        }}
      />
      <Route 
      path='/update-movie/:id'
      render={props => {
        return <UpdateMovie {...props} movies={movies} updateMovies={setMovies}/> 
        }}
        />
    </>
  );
};

export default App;
