const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();

const weatherData = require('../utils/weatherData');

const port = process.env.PORT || 3000 

//return location of json file
const publicStaticDirPath = path.join(__dirname, '../public')


const viewsPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

//api1
app.get('', (req,res) => {
    //render files from frontend
    res.render('index' , {
    title: 'Your Rain-Sun!!'
    })

})


//localhost:3000/weather?address=kanpur
app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: "You must enter address in search text box"
        })
    }
     // to chheck incase no data returned by temp so giving 
    weatherData(address, (error, {temperature, description, cityName} = {}) => {
        if(error) {
           //to check if any error is returned
        //returning sp as not to execute tehe statements outside the if
        return res.send({
            error
        })
    }
    console.log(temperature, description, cityName);
    res.send({
        temperature,
        description,
        cityName
    })
})
});
 //pagenotfound for illegal enteries
 app.get("*", (req, res) => {
    res.render('404' , {
        title: "404-page not found"
    })
})


app.listen(port, () => {
    console.log("Server is up and running on port: ", port);
})