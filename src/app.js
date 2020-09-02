const express = require('express'); //using express to call API or run a server
const hbs = require('hbs');
const path = require('path');
const app = express();

const weatherData = require('../utils/weatherData');

const port = process.env.PORT || 3000 //detecting the local port of system
// app.listen(port,()=>{
// console.log("server is up and running on port:",port)
// })

//return location of json file
const publicStaticDirPath = path.join(__dirname, '../public')   //giving reference of static file(html,stylesheet,images,media) stored
//this variable containing the path starting from the system upto public library

const viewsPath = path.join(__dirname, '../templates/views');      //this variable contains the path to view

const partialsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');                      //let our express server know that all the template files that are going to rendered are in the form of handle bars
app.set('views', viewsPath);                        //telling our express server about views
hbs.registerPartials(partialsPath);                 //with hbs it is easy to register partials
app.use(express.static(publicStaticDirPath));       //telling the express that, this variable contains the path to static/public data

//api1(this is how we define our end point or API or rest API using express command)
app.get('', (req,res) => {                  //creating a default route(res=response,req=request)
    //render files from frontend
    //res.send("hi this is weather app");
    res.render('index' , {
    title: 'Your Rain-Sun!!'
    })

})


//localhost:3000/weather?address=kanpur
app.get('/weather', (req, res) => {
    //res.send("This is weather end point.");
//     weatherData(address,(result)=>{
//         console.log(result)
//     })
    const address = req.query.address
    if(!address) {
        return res.send({
            error: "You must enter address in search text box"
        })
    }
     // to check incase no data returned by temp so giving 
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
 //page not found for illegal enteries (creating a route for particular end point that does not exist), this route should come after all the route written above
 app.get("*", (req, res) => {
     //res.send("Page not found");
    res.render('404' , {
        title: "404-page not found"
    })
})


app.listen(port, () => {
    console.log("Server is up and running on port: ", port);
})
