const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {

                const forecast = data.forecastData;

                console.log(forecast);

                messageOne.textContent = data.geoLocationData;
                messageTwo.textContent = `${forecast.description}. The temperature is ${forecast.temperature}\u00B0C but it Feels Like ${forecast.feelsLike}\u00B0C. Chances of Rain ${forecast.precipitation*100}%`;
            }
        });
    });
});

