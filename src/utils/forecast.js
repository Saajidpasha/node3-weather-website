const request = require('request')

const forecast = (latitude,longitude, callback) => {
    
  const url = 'http://api.weatherstack.com/current?access_key=8766d2a47bfdd2f8bfaccdc949e940c1&query='+longitude+ ','+latitude
    request({url:url,json:true},(error,response) => {
      
        if(error) {
            callback('There is a problem with the network!',undefined)
        }
        else if(response.body.error){
            callback('Unable to find location',undefined)
        }
        else{
            
           callback(undefined,
            " Current Humidity is "+response.body.current.humidity + 
            
            " and the weather is "+response.body.current.weather_descriptions[0]+" .It is currently "+response.body.current.temperature+" degree celsius outside .There is  " + response.body.current.precip+" % chance of rain")
        }
    })
    
}

module.exports = forecast
