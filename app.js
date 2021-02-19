const getLocation  = require('./utilis/location');
const getWeather = require('./utilis/weather');

const [,,location] = process.argv;

if (!location || location.trim() === '') {
    console.log('Please enter a location.')

} else {
    getLocation(location, (error, locationData=undefined) => {

        console.log(locationData)
        if (error) {
            return console.log(error);
        }
    
        getWeather(locationData, (error, weatherData=undefined) => {
            if (error) {
                return console.log(error);
            }
    
            console.log('Weather Data: ', weatherData);
        }); 
    });
}