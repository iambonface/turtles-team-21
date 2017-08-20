
var lat, long;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
     console.log(lat,  long);
      var apidata ='https://api.openweathermap.org/data/2.5/forecast/daily?lat='+ lat +'&lon='+ long +'&cnt=7&appid=86bbfdf2b6955b939ff05c17e5c28862';

fetch (apidata)
 .then(blob => blob.json())
 .then(function(data){
   console.log(data);
   // forecast location
   var loc = document.querySelector('#weatherLocation');
   loc.textContent = data.city.name;
   // location temp
   function tempconverter(temp){
     return (temp - 273).toFixed();
   }
   let ktemp = data.list["0"].temp.day;

   let temperature = document.querySelector('#currentTemp');
   temperature.textContent =  tempconverter(ktemp);
   // weather icon
   let iconCode = data.list["0"].weather["0"].icon;
   let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
   let  icon = document.querySelector('#currentweatherIcon');
   icon.innerHTML = ("<img src='" + iconUrl  + "'>");

   // forecast for the following 7 days

   for(i = 1; i < data.list.length; i++){
     let tempID = '#day'+i+'Temp';
     let iconID = '#day'+i+'Icon';
     //temp values for seven other days

     let newid = document.querySelector(tempID);
     newid.textContent = tempconverter(data.list[i].temp.day);
     // icons for other days

     let iconCode = data.list[i].weather["0"].icon;
     let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
     let  icon = document.querySelector(iconID);
     icon.innerHTML = ("<img src='" + iconUrl  + "'>");
   }



 });



  });

}
// days of the week and date
let days = ["Sun","Mon", "Tues","Wed", "Thu", "Fri", "Sat"];
let months =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec"];

let now = new Date();
let date = now.getDate();
let day = now.getDay();
let month = now.getMonth();
let year = now.getFullYear();

let  today = document.querySelector('#currentDate');
today.textContent = date +' '+ months[month]+', '+year;

 for ( let i = 1; i <= days.length; i++){
   let dayID = '#day'+i;
   let increment = (day + i)% days.length;
   if(increment !== day){
     console.log(increment);
     console.log(dayID);
     let newDayID = document.querySelector(dayID);
     newDayID.textContent = days[increment];
   }

 }
