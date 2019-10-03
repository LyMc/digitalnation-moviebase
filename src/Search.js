import React from 'react';

const Search = ({value, handler}) => (
	<input placeholder="Search" value={value} onChange={handler}/>
);

export default Search;
