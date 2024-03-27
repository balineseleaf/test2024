import React, { useState, useEffect } from 'react';
import './SearchPeople.css';

function SearchPeople() {
	const [searchText, setSearchText] = useState('');
	const [people, setPeople] = useState([]);

	useEffect(() => {
		if (searchText.trim() !== '') {
			const fetchPeople = async () => {
				try {
					const response = await fetch(
						`https://swapi.dev/api/people/?format=json&search=${searchText}`
					);
					const data = await response.json();
					setPeople(data.results.map((person) => person.name));
				} catch (e) {
					console.error(e);
				}
			};
			fetchPeople();
		} else {
			setPeople([]);
		}
	}, [searchText]);

	const handleInputChange = (e) => {
		setSearchText(e.target.value);
	};

	return (
		<div>
			<input
				type='text'
				value={searchText}
				onChange={handleInputChange}
				className='input'
			/>
			<ul className='person-list'>
				{people.map((person, index) => (
					<li
						className='person-item'
						key={index}>
						{person}
					</li>
				))}
			</ul>
		</div>
	);
}

export default SearchPeople;
