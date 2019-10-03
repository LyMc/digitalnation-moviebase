import React from 'react';
import './App.css';
import Search from './Search';
import Movies from './Movies';
import Favorite from './Favorite';

const API_KEY = 'aa422559';
const getJSON = response => response.json();

class App extends React.Component {
  state = {
    search: '',
    movies: [],
    page: 'movies', // movies || favorites
    favorites: []
  };

  searchHandler = e => {
    this.setState({
      search: e.target.value
    });
  };

  fetchSearch = () => {
    fetch(`http://www.omdbapi.com/?s=${this.state.search}&apikey=${API_KEY}`)
    .then(getJSON)
    .then(results => {
      this.setState({
        movies: results.Response === 'True' ? results.Search : []
      });
    })
    .catch(e => console.error(e));
  };

  toggleFavorite = imdbID => {
    const {favorites} = this.state;
    if (favorites.some(favorite => favorite.imdbID === imdbID)) {
      this.setState({
        favorites: favorites.filter(movie => movie.imdbID !== imdbID)
      });
    } else {
      this.fetchMovieAndAddToFavorites(imdbID);
    }
  }

  fetchMovieAndAddToFavorites = imdbID => {
    fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`)
    .then(getJSON)
    .then(movie => {
      console.log('Movie added to favorite', movie);
      this.setState({
        favorites: [...this.state.favorites, movie]
      });
    })
  }

  render() {
    const {search, movies, page, favorites} = this.state;
    return (
      <div className="App">
        <div>
          <button onClick={() => this.setState({page: 'movies'})}>Movies</button>
          <button onClick={() => this.setState({page: 'favorites'})}>Favorites</button>
        </div>
        <div>
          <Search value={search} handler={this.searchHandler}/>
        </div>
        {page === 'movies' && <Movies movies={movies} favorites={favorites} toggleFavorite={this.toggleFavorite}/>}
        {page === 'favorites' && <Favorite favorites={favorites} toggleFavorite={this.toggleFavorite}/>}
      </div>
    );
  }

  componentDidUpdate(_, prevState) {
    if (this.state.search !== prevState.search) {
      this.fetchSearch();
    }
  }
}

export default App;
