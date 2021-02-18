const request = require('postman-request');
const { convertPercent } = require('./utilis.js');


// Weather API
// const weatherParams = {
//     api: 'http://api.weatherstack.com/current',
//     key: 'access_key=af0fe09a1dc5cdbfa0dc5b2ea99e03a5',
//     location: 'query=San Antonio',
//     metric: 'units=m',
//     scientific: 'units=s',
//     fahrenheit: 'units=f'
// }

// const weatherUrl = `${weatherParams.api}?${weatherParams.key}&${weatherParams.location}&${weatherParams.fahrenheit}`;

// request({url: weatherUrl, json: true}, (err, resp) => {

//     if (err) {
//         console.log('Unable to connect to weather service at this time.');
//     } 
    
//     if (resp) {
//         const data = resp.body;

//         if (data.error) {
//             const { error } = data;

//             console.log(error.info);
//         } else {
//             const currentWeather = data.current;
    
//             const { weather_descriptions: descriptions, temperature: temp,  feelslike,  precip } = currentWeather;
        
//             let [des_1] = descriptions;
        
//             let percipPercent = convertPercent(precip);
    
//             console.log(`${des_1}. It is ${temp} degrees outside. It feels like ${feelslike} degrees with a ${percipPercent} chance of rain.`);
//         }
//     }
    
// });


// Geo Location API
const geoPrams = {
    api: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',    
    key: 'access_token=pk.eyJ1IjoicGV0cmlkIiwiYSI6ImNrbDlyeGRodjAzdjUyb3BjaWNkcjlmZXcifQ.IYVRfuu2SfnDxashv4zWGQ',
    // location: 'Los%20Angeles.json',
    location: 'dogsalt234421`11',
    limit: 'limit=1'
};

const geoUrl = `${geoPrams.api}${geoPrams.location}?${geoPrams.key}&${geoPrams.limit}`;

request({url: geoUrl, json: true}, (err, resp) => {

    if (err) {
        console.log('Unable to connect to location services!');
    }

    if (resp) {

        const data = resp.body;

        if (data.message) {
            console.log(`Location ${data.message.toLowerCase()}.`);
        } else {

            const { features } = data;
    
            const [ dataSet ] = features;
        
            const { center: cords } = dataSet;
        
            const [ long, lat ] = cords;
        
            console.log(`latitude: ${lat}, longitude: ${long}`);

        }
    }

});