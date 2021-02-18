const request = require('postman-request');

// Geo Location API
const getLocation = (location, callback) => {

    const geoPrams = {
        api: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',    
        key: 'access_token=pk.eyJ1IjoicGV0cmlkIiwiYSI6ImNrbDlyeGRodjAzdjUyb3BjaWNkcjlmZXcifQ.IYVRfuu2SfnDxashv4zWGQ',
        location: `${encodeURIComponent(location)}.json?`,
        limit: 'limit=1'
    };

    const geoUrl = `${geoPrams.api}${geoPrams.location}${geoPrams.key}&${geoPrams.limit}`;

    request({url: geoUrl, json: true}, (err, resp) => {

        if (err) {
            return callback('Unable to connect to location services!');
        }

        if (resp) {

            const data = resp.body;

            if (data.message || data.features.length === 0) {
                return callback('Location cannot be found. Please try another search.');
            } else {  

                const { features } = data;
        
                const [ dataSet ] = features;
            
                const { center: cords, place_name: location } = dataSet;
            
                const [ long, lat ] = cords;

                const locationInfo = {
                    location,
                    long,
                    lat
                };

                return callback(undefined, locationInfo);
            }
        }
    });
};

module.exports = getLocation;