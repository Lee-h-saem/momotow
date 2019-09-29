const weather = document.querySelector('.js-weather');
const API_KEY = '20572b6769fe98adf7833ba6111b0282';
const COORDS = 'coords';

function getWeather(lat, lng) {
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			const temperature = json.main.temp;
			const place = json.name;
			weather.innerText = `${temperature} @ ${place}`;
		});
}

function saveCoords(coordsObj) {
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude,
	};
	saveCoords(coordsObj);
	saveCoords(latitude, longitude);
}

function handleGeoError() {
	console.log('위치 정보 찾을 수 없음.');
}

function askForCoords() {
	navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
	const loadCoords = localStorage.getItem(COORDS);
	if (loadCoords === null) {
		askForCoords();
	} else {
		// get Weather
		const parsedCoords = JSON.parse(loadCoords);
		getweather(parsedCoords.latitude, parsedCoords.longitude);
	}
}

function init() {
	loadCoords();
}

init();
