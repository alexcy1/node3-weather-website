import express from 'express';
import hbs from 'hbs';
const app = express();
const port = 3000
// Imports paths
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import geocodeUtils from '../src/utils/geocode.js';
import forecastUtils from '../src/utils/forecast.js';



// Resolve __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define path for express config
app.use(express.static(path.join(__dirname, '../public')));
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up Handlebars (hbs) engine as the view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Register the 'eq' helper for Handlebars
hbs.registerHelper('eq', function (a, b) {
    return a === b;
});

// Route using hbs
app.get('/', function (req, res) {
    res.render('index', { 
        title: 'Weather App',
        name: 'Alexander Cyril. 🌺',
        company: 'Erruki Weather Forecast 🌺',
        activePage: 'weather'
    });
})

app.get('/about', function (req, res) {
    res.render('about', { 
        title: 'About Me',
        name: 'Alexander Cyril. 🌺',
        company: 'Erruki Weather Forecast 🌺',
        activePage: 'about'
    });
})

app.get('/help', function (req, res) {
    res.render('help', { 
        title: 'Help',
        help_text: 'How to Use Erruki Weather Forecast!',
        name: 'Alexander Cyril. 🌺',
        company: 'Erruki Weather Forecast 🌺',
        activePage: 'help'
    });
})


app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    // GEOCODING
    geocodeUtils.geocode(address, (error, { lat, lng, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        // WEATHER
        forecastUtils.fetchWeatherData(lat, lng, (weatherError, weatherData) => {
            if (weatherError) {
                return res.send({ error: weatherError });
            }

            const { temp_c, condition, daily_chance_of_rain, daily_will_it_rain } = weatherData;
            const rainResponse = daily_will_it_rain ? 'Yes' : 'No';

            // Sending back the real forecast and location
            res.send({
                forecast: `It is currently ${temp_c}°C. ${condition.text} at the moment. There's a ${daily_chance_of_rain}% chance of rain.`,
                location,
                address
            });
        });
    });
});

        

app.get('/help/*', (req, res) => {
    res.render('404',{ 
        title: '404',
        name: 'Alexander Cyril',
        error_message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Alexander Cyril',
        error_message: 'Oops! Error 404. Page Not Found'
    })
})


// Start the server on port 3000
app.listen(port, (err, res) => {
    if(err) {
        console.error('Error starting server', err);
        process.exit(1);
    }
    console.log(`Server is running on port ${port}`);
});

// Run app server using specified command bellow:
// nodemon app.js -e js,hbs