const request = require('request');

//                         callback(error, response)
const geocode = (location, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiYWNoaXRqIiwiYSI6ImNrcjMzcWVrajJobjAyenFhYXc0OG5nOWwifQ.16b-YmlrBefAtnw2KuxHpg&limit=1`;

    request({ url, json: true}, (error, {body}) => {

        //low level errors, like internet issues
        if(error) 
        {
            callback("Cannot connect to the server.", undefined);
        }

        //error given from API like incorrect user input
        else if(!body.features.length)
        {
            callback("Cannot find the query.", undefined);
        }
        
        //if we receive correct data
        else
        {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode; 