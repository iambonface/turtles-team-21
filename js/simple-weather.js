if("geolocation" in navigator) {
        $("#GetLocation").show();
    } else {
        $("#GetLocation").hide();
    }

   var currentLocation = localStorage.getItem('currentLocation');
   console.log("mm", currentLocation)

    $("#GetLocation").click(function(){
        navigator.geolocation.getCurrentPosition(function(position){
            localStorage.setItem('currentLocation', position.coords.latitude+','+position.coords.longitude );
            loadWeather(position.coords.latitude+','+position.coords.longitude);
        });
    });

$(document).ready(function(){
    var lat, long, coordinate;

$.getJSON('https://ipinfo.io/geo', function(response){
    var loc = response.loc.split(',');
    coords = {
        latitude: loc[0],
        longitude: loc[1]
    };
    lat = coords.latitude;
    long = coords.longitude;
    console.log(long, lat)
    cordinate = lat + ',' + long;
    if (localStorage.getItem("currentLocation") === null) {
        loadWeather(cordinate, ''); 
    } else {
        loadWeather(currentLocation, ''); 
    }
    
 });
       
});

function loadWeather(location, woeid) {
    $.simpleWeather({
        location: location,
        woeid: woeid,
        units: 'f',
        success: function(weather) {
            html = '<h2><i id="weatherIcon" class="wi wi-yahoo-'+weather.code+'"></i><span class="temp">'+weather.temp+'&deg;'+weather.units.temp+
            '</span><span class="alt-temp">'+weather.alt.temp+'&deg;C</span></h2>';
            html += '<ul class="list-inline text-center"><li class="list-inline-item">'+weather.city+', '+weather.region+'</li>';
            html += '<li class="list-inline-item text-center">'+weather.currently+'</li></ul>';
            $("#weather").html(html);
        },
        error: function(error) {
            $("#weather").html('<p>'+error+'</p>');
        }
    });
}