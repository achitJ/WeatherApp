const request = require('request');

//                                     callback(error, response)
const forecast = (longitude, latitude, callback) => {
    
    const url = `http://api.weatherstack.com/current?access_key=f224feae2145726722c1d8aea7cb49fc&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=m`;

    request({ url, json: true}, (error, {body}) => {
        
        //low level errors, like internet issues
        if(error)
        {
            callback("Cannot connect to the server", undefined);
        }

        //error given from API like incorrect user input
        else if(body.error)
        {
            callback("Cannot find the query", undefined);
        }

        else
        {
            callback(undefined, {
                temperature: body.current.temperature,
                precipitation: body.current.precip,
                feelsLike: body.current.feelslike,
                location: `${body.location.name}, ${body.location.region}, ${body.location.country}`,
                description: body.current.weather_descriptions[0]
            });
        }
    });
};

module.exports = forecast;