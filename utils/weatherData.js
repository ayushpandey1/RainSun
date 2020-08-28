const request = require('request');
const constants = require('../config');

const weatherData = (address, callback) => {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
    request({url, json:true}, (error, {body})=> {
        if(error) {
            callback("Data can't be fetched from open weather map api ", undefined)
        } else if(!body.main || !body.main.temp || !body.name || !body.weather) {
            callback("Required data can't be found, try another location", undefined);
        } else {
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            })
        }
    })
}

module.exports = weatherData;