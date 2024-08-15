import request from 'request';

// WEATHER
const fetchWeatherData = (lat, lng, callback) => {
    const apiUrl = 'https://weatherapi-com.p.rapidapi.com/forecast.json';
    const apiKey = 'e2f2a0785bmsh99c39524ed0016ep12963ejsn3b96e13a4f74';
    const query = `${lat},${lng}`;
    
    const options = {
        method: 'GET',
        url: apiUrl,
        qs: { q: query },
        headers: {
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
            'x-rapidapi-key': apiKey
        },
        json: true
    };

    request(options, (error, response) => {
        if (error) {
            callback('Unable to connect to the weather API services', undefined);
        } else if (!response || !response.body || !response.body.current || !response.body.forecast) {
            callback('Unable to find weather for the location, please try another search', undefined);
        } else {
            const weatherData = response.body;
            const current = weatherData.current;
            const forecast = weatherData.forecast.forecastday[0].day;
            const { temp_c, condition } = current;
            const { daily_chance_of_rain, daily_will_it_rain } = forecast;
            callback(undefined, { temp_c, condition, daily_chance_of_rain, daily_will_it_rain });
        }
    });
};

// Exports
export default {
    fetchWeatherData
};
