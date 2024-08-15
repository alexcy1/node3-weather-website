import request from 'request';

// GEOCODING
const geocode = (address, callback) => {
    const url = 'https://api.opencagedata.com/geocode/v1/json?q=' + encodeURIComponent(address) + '&key=070be96bc5b24ac0b8b4649cb16e373e&language=en&pretty=1';
    
    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to the location services.');
        } else if (body.total_results === 0) {
            callback('Unable to find location, please try another search.');
        } else {
            const geometry = body.results[0].geometry;
            callback(undefined, {
                lat: geometry.lat,
                lng: geometry.lng,
                location: body.results[0].formatted
            });
        }
    });
};

// Exports
export default {
    geocode
};
