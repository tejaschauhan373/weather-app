const request = require('request');
const fs = require('fs');

// Getting configuration variables
const rawdata = fs.readFileSync('./config.json');
const config_obj = JSON.parse(rawdata);
const api_key = config_obj["weather-stack-api-token"]
const weather_stack_url = "http://api.weatherstack.com/current"

//
// const url = 'http://api.weatherstack.com/current?access_key=b9355f7ad18766c9054be029bad9c4db&query=London'
//


const weather_stack_custom_url = `${weather_stack_url}?access_key=${api_key}&query=`


const geocode = async (address, callback) => {
    let custom_url = `${weather_stack_custom_url}${address}`;

    request({url: custom_url, json: true}, (error, response) => {
        if (error) {
            callback("Request failed, please try again!", undefined);

        } else if (response.body.error) {
            callback("Unable to connect the location!", undefined);
        } else {
            callback(undefined, {

                "type": response.body["request"]["type"],
                "location": response.body["request"]["query"],
                "language": "en",
                "temperature": response.body["current"]["temperature"],
                "observation_time": response.body["current"]["observation_time"],
                "weather_descriptions": response.body["current"]["weather_descriptions"][0],
                "icon": response.body["current"]["weather_icons"][0],
            })
        }
    })
}

module.exports = {
    geocode
}