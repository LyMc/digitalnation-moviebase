import React from 'react';
import Modal from './Modal';
import {getJSON, API_KEY} from './App';

class MovieModal extends React.Component {
	state = {
		movie: null,
		loading: false,
		error: false
	};

	fetchMovie = () => {
		this.setState({ loading: true });
		fetch(`http://www.omdbapi.com/?i=${this.props.imdbID}&apikey=${API_KEY}`)
		.then(response => {
			if(response.status >= 400) {
				throw new Error(response.statusText);
			}
			return getJSON(response);
		})
		.then(movie => {
			this.setState({
				movie,
				loading: false
			});
		})
		.catch(error => {
			this.setState({
				error,
				loading: false
			})
		});
	}

	componentDidMount() {
		this.fetchMovie();
	}

	renderMovie() {
		const { movie, loading, error } = this.state;
		if (loading) {
			return 'Loading...';
		}
		if (error) {
			return 'Error. Couldn\'t load the movie';
		}
		if (!movie) {
			return 'Loading will start shortly';
		}
		return (
			<div className="clear">
				<img className="align-right" src={movie.Poster}/>
				<p>{movie.Plot}</p>
				<h3>Ratings</h3>
				<ul>
					{movie.Ratings.map(rating => <li>{rating.Source} [{rating.Value}]</li>)}
				</ul>
				<h3>More about this movie</h3>
				<ul>
					<li>Rated: {movie.Rated}</li>
					<li>Released: {movie.Released}</li>
					<li>Runtime: {movie.Runtime}</li>
					<li>Genre: {movie.Genre}</li>
					<li>Director: {movie.Director}</li>
					<li>Writer: {movie.Writer}</li>
					<li>Actors: {movie.Actors}</li>
					<li>Language: {movie.Language}</li>
					<li>Country: {movie.Country}</li>
					<li>Awards: {movie.Awards}</li>
				</ul>
			</div>
		);
	}

	render() {
		const { title, favorite, toggleFavorite, close } = this.props;
		const { movie } = this.state;
		return (
			<Modal
				open
				title={(favorite ? '♡ ' : '') + title + (movie ? ` [${movie.Year}]` : '')}
				onClose={close}
				onAction={() => {
					toggleFavorite(movie);
					close();
				}}
				action={favorite ? 'Remove from Favorites' : 'Add to Favorites'}
			>
				{this.renderMovie()}
			</Modal>
		);
	}
}

export default MovieModal;
