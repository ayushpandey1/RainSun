//This file create an object & its going to export that particular object & use this generic data in any of the file
const constants = {
    openWeatherMap: { 
        BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
        SECRET_KEY: "859510fd011c623e2a5ffaee5709c077"
    }
}

//exporting it as it has weather data
module.exports = constants;
