const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#locationMsg');
const weatherInfo = document.querySelector('#weatherMsg');

const description = document.getElementById('description');
const weatherImg = document.getElementById('weatherImg');
const temperature = document.getElementById('temperature');
const feelsLike = document.getElementById('feelsLike');
const precipitation = document.getElementById('precipitation');
const humidity = document.getElementById('humidity');
const visibility = document.getElementById('visibility');

weatherForm.reset();

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {

                messageOne.textContent = data.error;

            } else {

                const forecast = data.forecastData;

                console.log(forecast);

                messageOne.textContent = data.geoLocationData;

                description.textContent = forecast.description;
                temperature.textContent = `Temperature: ${forecast.temperature}\u00B0C`;
                feelsLike.textContent = `Feels Like: ${forecast.feelsLike}\u00B0C`;
                precipitation.textContent = `Precipitation: ${forecast.precipitation*10}%`;
                humidity.textContent = `Humidity: ${forecast.humidity}%`;
                visibility.textContent = `Visibility: ${forecast.visibility}%`;

                //https://lokeshdhakar.com/projects/color-thief/
                weatherImg.src = `${forecast.weatherImg}`;

                weatherInfo.style.display="block";

            }
        });
    });
});


