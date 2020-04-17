
const request = require('request')
const geocode = (address,callback) => {

    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoic2FhamlkIiwiYSI6ImNrOTAxb3BmaTBuMDYzZWw2b3lxMXhyZXEifQ.XkHhqG_fdvXy_aVjlfd_4g&limit=1"
    request({url:geocodeUrl,json:true}, (error,response) => {
      //  console.log(response)
        if(error){
            callback('Unable to connect to the weather API',undefined)
        }
        else if(response.body.features.length === 0){
            
            return callback('Location not found. Try again!',undefined)
        }
        else{
           
            callback(undefined,{
                latitude : response.body.features[0].center[0],
                longitude : response.body.features[0].center[1],
                
                location : response.body.features[0].place_name
            }  )
        }
    })
}

module.exports = geocode