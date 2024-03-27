import { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import World from './World';
import Coordinates from './Coordinates';
import SearchPeople from './SearchPeople';

function App() {
	//-------------2-----------
	const [data, setData] = useState(null);
	const [films, seFilms] = useState(null);
	const [randomId, setRandomId] = useState(1);
	const [randomFilmId, setRandomFilmId] = useState(1);

	const [characterCache, setCharacterCache] = useState({}); // для кэша

	const [dataById, setDataById] = useState(null);
	const [id, setId] = useState(1);
	const url = `https://swapi.dev/api/people/${randomId}`;
	const url2 = `https://swapi.dev/api/people/${id}`;

	useEffect(() => {
		async function fetchCharacterData() {
			try {
				const response = await fetch(url);
				const data = await response.json();
				setData(data);
			} catch (e) {
				return console.log(e);
			}
		}
		fetchCharacterData();
	}, [randomId]);

	useEffect(() => {
		async function fetchFilmData() {
			try {
				const response = await fetch(url);
				const data = await response.json();
				seFilms(data.films);
			} catch (e) {
				return console.log(e);
			}
		}
		fetchFilmData();
	}, [randomFilmId]);

	useEffect(() => {
		async function fetchDataById() {
			try {
				if (characterCache[id]) {
					setDataById(characterCache[id]);
				} else {
					const response = await fetch(url2);
					const data = await response.json();
					setCharacterCache((prevCache) => ({ ...prevCache, [id]: data }));
					setDataById(data);
				}
			} catch (e) {
				console.log(e);
			}
		}
		fetchDataById();
	}, [id, characterCache]);

	const handleRandomCharacter = () => {
		const newRandomId = Math.floor(Math.random() * 20) + 1;
		setRandomId(newRandomId);
	};

	const handleRandomFilm = () => {
		const newRandomFilmId = Math.floor(Math.random() * 20) + 1;
		setRandomFilmId(newRandomFilmId);
	};

	//--------------1------------------------------------
	const [showCoordinates, setShowCoordinates] = useState(false);
	const [coordinates, setCoordinates] = useState({ x: 120, y: 80 }); // начальные координаты

	function toggleButtonClick() {
		// переключатель для компонентов
		setShowCoordinates(!showCoordinates);
	}

	useEffect(() => {
		const handleGlobalMouseMove = (e) => {
			if (showCoordinates) {
				setCoordinates({ x: e.clientX, y: e.clientY });
			}
		};
		document.addEventListener('mousemove', handleGlobalMouseMove);
		return () => {
			document.removeEventListener('mousemove', handleGlobalMouseMove);
		};
	}, [showCoordinates]);

	//--------------3--------------------
	const increaseId = () => {
		setId((prevId) => prevId + 1);
	};

	const decreaseId = () => {
		setId((prevId) => prevId - 1);
	};

	return (
		<div>
			<h1>Hello</h1>
			<button onClick={toggleButtonClick}>Click</button>
			{showCoordinates ? <Coordinates coordinates={coordinates} /> : <World />}
			<p className='character'>
				random character {data?.birth_year} {data?.name}
			</p>
			<button onClick={handleRandomCharacter}>Get Random Character</button>
			<div className='buttons-block'>
				<button onClick={increaseId}>increase id</button>
				<button
					onClick={decreaseId}
					disabled={id <= 1}>
					decrease id
				</button>
				<p className='character'>
					character after click - {dataById?.birth_year}
					{dataById?.name}
				</p>
			</div>
			<SearchPeople />
			<button onClick={handleRandomCharacter}>Get Random Character</button>
			<button onClick={handleRandomFilm}>Get Random Film</button>
		</div>
	);
}

export default App;
