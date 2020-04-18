const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

//set up handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Saajid pasha'
    })
})

//about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Saajid pasha'
    })
})

//help page

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Saajid pasha',
        helpText: 'Help text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please enter a search term'
        })
    }
    res.send({
        products: []
    })
})


//Error Message Pages
app.get('/help/*', (req, res) => {
    res.render('error.hbs', {
        title: "404",
        name: "Saajid Pasha",
        errorMessage: "Help Article Not Found!"
    })
})


//Generic Error Message
app.get('*', (req, res) => {
    res.render('error.hbs', {
        title: "404",
        name: "Saajid Pasha",
        errorMessage: "Page Not Found!"
    })
})


app.listen(port, () => {
    console.log('Server is up and running on ' + port)
})