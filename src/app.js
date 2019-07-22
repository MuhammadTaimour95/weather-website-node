const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forcast')

//const 
const app = express()
const publicDirectoryPath =path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Muhammad Taimour'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name: 'Muhammad Taimour'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})



app.get('/weather', (req, res) => {
if(!req.query.address){
    return res.send({
        error:'You must provide a valid address'
    })
}

geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
        return res.send({
            error:error
        })
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({
                error:error
            })
        }

        res.send({
            forecastData: forecastData,
            location: location,
            address: req.query.address
        })

       
    })
})



})



app.listen(3000, () => {
    console.log("Server is up on port 3000")
})