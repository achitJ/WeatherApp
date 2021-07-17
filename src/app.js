const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// This method is used for serving up data to websites

//         req -> used fetching data from website
//         res -> used for sending data to website 
/*
app.get('', (req, res) => {
    res.send("Hello World LMAO!");
});
*/

const app = express();

//paths for the config
const publicDirPath = path.join(__dirname, '../public');
const templatesPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//for changing settings of the app(setup handlebars)
app.set('view engine', 'hbs');
app.set('views', templatesPath);
hbs.registerPartials(partialsPath);

//setup static directory to server
app.use(express.static(publicDirPath));

//home page
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Achit Jain"
    });
});

//about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Achit Jain"
    });
});

//help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        helpText: "This is some helpful text"
    })
})

//for error handling from help page
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Error",
        rootName: "Help Page",
        rootPage: "/help",
        errorMsg: "404 Page Not Found."
    })
});

/*
app.get('/products', (req, res) => {

    //Website.com/products?search=Value -> this 'Value' is what is returned
    //                                     if we do req.query.search
    //NOTE: You can change the name of search
    // console.log(req.query.search);

    if(!req.query.search)
    {
        //if we do not return here, the node will send the request after 
        //this one too, which creates an error since http can only send 
        //one request and recieve one response only.
        return res.send({
            error: "Enter a value in search field."
        })
    }

    res.send({
        products: []
    });
});
*/

app.get('/weather', (req, res) => {

    if(!req.query.address)
    {
        return res.send({error: "You must provide an address"});
    }
    //                                 while destructing, we make it equal to empty obj by default
    //                                 because we cannot destruct empty object.            
    geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {

        if(error)
        {
            return res.send({error});
        }

        forecast(longitude, latitude, (forecastError, weatherData) => {

            if(forecastError)
            {
                return res.send({forecastError});
            }

            res.send({
                geoLocationData: place,
                forecastData: weatherData  
            })
        });

    });
});

//for error handling
app.get('*', (req, res) => {
    res.render('404', {
        title: "Error",
        rootName: "Home Page",
        rootPage: "/",
        errorMsg: "404 Page Not Found."
    });
});

//3000 -> localhost port
app.listen(3000, () => { //creates a server on given port
    console.log("Server is running...");
});

//run on: http://localhost:3000/