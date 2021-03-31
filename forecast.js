const request = require('request');
//
// const url = 'http://api.weatherstack.com/current?access_key=b9355f7ad18766c9054be029bad9c4db&query=London'
//

const api_key = "b9355f7ad18766c9054be029bad9c4db"

const weather_stack_url = "http://api.weatherstack.com/current"

weather_stack_custom_url = `${weather_stack_url}?access_key=${api_key}&query=`
// request({url: url, json: true}, (error, response) => {
//     if (error) {
//         console.log("Unable to connect location services")
//     } else if (response.body.features.length === 0) {
//         console.log('Unable to find location. Try another search');
//     } else {
//         console.log(response.body);
//     }
// })

const geocode = async (address, callback) => {
    let custom_url = `${weather_stack_url}?access_key=${api_key}&query=${address}`;

    request({url: custom_url, json: true}, (error, response) => {
        if (error) {
            callback("Request failed, please try again!", undefined);

        } else if (response.body.error) {
            callback("Unable to connect the location!", undefined);
        } else {
            // console.log();
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

geocode("New2Y2kljljlkjkjl2ork", (error, response) => {
    console.log('Error', error);
    console.log('Data', response);
})

// const add = (a, b, callback) => {
//     setTimeout(() => {
//         callback(a + b);
//     }, 2000)
// }
//
// add(1, 4, (sum) => {
//     console.log(sum);
// })

module.exports = {
    geocode
}