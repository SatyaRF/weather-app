const form = document.querySelector('form');
const location = document.querySelector('#location');
const desc = document.querySelector('#description');
const humidity = document.querySelector('#humidity');
const temp = document.querySelector('#temperature');
const baseEndpoint = 'http://api.openweathermap.org/data/2.5/weather';
const proxy = 'https://cors-anywhere.herokuapp.com/';

async function fetchWeather(city, country){
    const res = await fetch(`${proxy}${baseEndpoint}?q=${city},${country}&appid=51662f6a2fe8b130731856a7f539bc9c`);
    const data = await res.json();
    return data;
}

function displayWeather({weather, main, sys, name}) {
    const tempval = 273.15;
    location.value = `${name}, ${sys.country}`;
    desc.value = weather[0].description.toUpperCase();
    humidity.value = `${main.humidity}%`;
    temp.value = `${main.temp - tempval}°C`;
    //console.log(weather, main, sys, name);
}

async function handleSubmit(e) {
    const cityName = document.getElementById('city_name').value;
    const countryName = document.querySelector('#country_name').value;
    e.preventDefault();
    if(!cityName || !countryName) return;
    form.submit.disabled = true;
    const weatherDetails = await fetchWeather(cityName, countryName);
    //console.log(weatherDetails);
    form.submit.disabled = false;
    form.reset();
    displayWeather(weatherDetails);
}



form.addEventListener('submit', handleSubmit);

// setInterval(createSnowFlake, 50);

// function createSnowFlake() {
// 	const snow_flake = document.createElement('i');
//     snow_flake.classList.add('material-icons');
//     snow_flake.classList.add('left');
//     snow_flake.textContent = "ac_unit";
// 	snow_flake.style.left = Math.random() * window.innerWidth + 'px';
// 	snow_flake.style.animationDuration = Math.random() * 3 + 2 + 's'; // between 2 - 5 seconds
// 	snow_flake.style.opacity = Math.random();
// 	snow_flake.style.fontSize = Math.random() * 10 + 10 + 'px';
	
// 	document.body.appendChild(snow_flake);
	
// 	setTimeout(() => {
// 		snow_flake.remove();
//     }, 5000)
    
//     console.log(snow_flake);
// }