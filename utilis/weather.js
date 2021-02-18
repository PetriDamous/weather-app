const { convertPercent } = require('./utility_functions');
const request = require('postman-request');

// Weather API
const getWeather = ({location, long, lat}, callback) => {

    const weatherParams = {
        api: 'http://api.weatherstack.com/current',
        key: 'access_key=af0fe09a1dc5cdbfa0dc5b2ea99e03a5',
        locationName: `query=${encodeURIComponent(location)}`,
        locationCords: `query=${encodeURIComponent(lat)},${encodeURIComponent(long)}`,
        metric: 'units=m',
        scientific: 'units=s',
        fahrenheit: 'units=f'
    };

    const weatherUrl = `${weatherParams.api}?${weatherParams.key}&${weatherParams.locationCords}&${weatherParams.fahrenheit}`;

    request({url: weatherUrl, json: true}, (err, resp) => {
    
        if (err) {
            return callback('Unable to connect to weather service at this time.');
        } 
        
        if (resp) {
            const data = resp.body;
    
            if (data.error) {
                const { error } = data;
    
                return callback(error.info);
            } else {
                const currentWeather = data.current;
        
                const { weather_descriptions: descriptions, temperature: temp,  feelslike,  precip } = currentWeather;
            
                let [des_1, des_2] = descriptions;
            
                let percipPercent = convertPercent(precip);

                const weather = {
                    temp,
                    feelslike,
                    percipPercent,
                    des_1
                };

                return callback(undefined, weather);        
            }
        }        
    });
};

module.exports = getWeather;