const path = require('path');
const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000
const {geocode} = require('./forecast')

// Define constant path
const publicDirectoryPath = path.join(__dirname, 'public');
const viewsPath = path.join(publicDirectoryPath, "views");
const partialsPath = path.join(publicDirectoryPath, "partials");

// Creating express app
const app = express();

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Setup handlebars engine and location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath)


// home page route
app.get('', (req, res) => {
    res.render("index", {"name": "Tejas Chauhan", "title": "Weather App"});
})

// help page route
app.get('/help', (req, res) => {
    res.render("help", {"name": "Tejas Chauhan", "title": "Help"});
})

// about page route
app.get('/about', (req, res) => {
    res.render("about", {"name": "Tejas Chauhan", "title": "About Me"});
})

// weather forecasting api
app.get('/weather', (req, res) => {

    geocode(req.query.address, (error, data) => {
        return res.send({
            'Error': error,
            'Data': data
        })
    })
    // return res.render('weather', {"name": "Tejas Chauhan", "title": "Weather"});
})

// 404 page api
app.get("*", (req, res) => {
    res.render("404", {"name": "Tejas Chauhan", "title": "404", "errorMessage": "Page is not found"});
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})