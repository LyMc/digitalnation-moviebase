import React from 'react';

const Favorite = ({favorites, toggleFavorite}) => (
	<ul>
		<h2>Favorites</h2>
		{favorites.map(movie => (
			<li
				key={movie.imdbID}
				className="favorite"
				onClick={() => toggleFavorite(movie.imdbID)}
			>
				{movie.Title} [{movie.Year}] <img src={movie.Poster} height={30}/>
			</li>
		))}
	</ul>
);

export default Favorite;
