import React from 'react';

const Movies = ({movies, favorites, toggleFavorite}) => (
	<ul>
		<h2>Search results</h2>
		{movies.map(movie => (
			<li
				key={movie.imdbID}
				className={favorites.some(favorite => favorite.imdbID === movie.imdbID) ? 'favorite' : ''}
				onClick={() => toggleFavorite(movie.imdbID)}
			>
				{movie.Title} [{movie.Year}] <img src={movie.Poster} height={30}/>
			</li>
		))}
	</ul>
);

export default Movies;
