import React from 'react';
import MovieModal from './MovieModal'

class Favorite extends React.Component {
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
		const {favorites, toggleFavorite} = this.props;
		const {modalMovie} = this.state;
		return (
			<ul>
				<h2>Favorites</h2>
				{favorites.map(movie => (
					<li
						key={movie.imdbID}
						className="favorite"
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

export default Favorite;
