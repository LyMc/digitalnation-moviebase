import React from 'react';
import MovieModal from './MovieModal';

class Movies extends React.Component {
	state = {
		modalMovie: null
	};
	openMovie = movie => {
		this.setState({
			modalMovie: movie
		});
	};
	closeMovie = () => this.openMovie(null);

	render () {
		const {movies, favorites, toggleFavorite} = this.props;
		const {modalMovie} = this.state;
		return (
			<ul>
				<h2>Search results</h2>
				{movies.map(movie => (
					<li
						key={movie.imdbID}
						className={favorites.some(favorite => favorite.imdbID === movie.imdbID) ? 'favorite' : ''}
						onClick={() => this.openMovie(movie)}
					>
						{movie.Title} [{movie.Year}] <img src={movie.Poster} height={30}/>
					</li>
				))}
				{modalMovie && <MovieModal
					imdbID={modalMovie.imdbID}
					title={modalMovie.Title}
					toggleFavorite={toggleFavorite}
					favorite={favorites.some(favorite => favorite.imdbID === modalMovie.imdbID)}
					close={this.closeMovie}
				/>}
			</ul>
		);
	}
}

export default Movies;
