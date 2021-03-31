const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000
const {geocode} = require('./forecast')

let rawdata = fs.readFileSync('./config.json');
let config_obj = JSON.parse(rawdata);

const weather_stack_api_key = config_obj["weather-stack-api-token"]


console.log(__dirname);
console.log(path.join(__dirname, __filename));

// Define constant path
const publicDirectoryPath = path.join(__dirname, '/public');
const viewsPath = path.join(path.join(__dirname, "public"), "views");
const partialsPath = path.join(__dirname, "/public/partials");

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Setup handlebars engine and location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render("index", {"name": "Tejas Chauhan", "title": "Weather App"});
})

app.get('/help', (req, res) => {
    res.render("help", {"name": "Tejas Chauhan", "title": "Help"});
})

app.get('/about', (req, res) => {
    res.render("about", {"name": "Tejas Chauhan", "title": "About Me"});
})

app.get('/weather', (req, res) => {

    console.log(req.query.address);

    geocode(req.query.address, (error, data) => {
        console.log(data);
        return res.send({
            'Error': error,
            'Data': data
        })
    })
    // return res.render('weather', {"name": "Tejas Chauhan", "title": "Weather"});
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get("*", (req, res) => {
    res.render("404", {"name": "Tejas Chauhan", "title": "404", "errorMessage": "Page is not found"});
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})