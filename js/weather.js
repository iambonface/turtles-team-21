
var lat, long;

$.getJSON('https://ipinfo.io/geo', function(response) {
    var loc = response.loc.split(',');
    var coords = {
        latitude: loc[0],
        longitude: loc[1]
    };
    lat = coords.latitude;
    long = coords.longitude;
    console.log(lat , long );
    var apidata ='https://api.openweathermap.org/data/2.5/forecast/daily?lat='+ lat +'&lon='+ long +'&cnt=7&units=metric&appid=86bbfdf2b6955b939ff05c17e5c28862';

    fetch (apidata)
    .then(blob => blob.json())
    .then(function(data){
     console.log(data);
     // forecast location
     var location = document.querySelector('#weatherLocation');
     location.textContent = data.city.name;

     // forecast for the following 7 days

     for(let i = 0; i < data.list.length; i++){
       let tempID = '#day'+i+'Temp';
       let iconID = '#day'+i+'Icon';
       //temp values for seven  days

       let newid = document.querySelector(tempID);
       newid.innerHTML = (data.list[i].temp.day).toFixed() + "&#8451";
       // icons for other days

       let iconCode = data.list[i].weather["0"].id;
       let  icon = document.querySelector(iconID);
       icon.innerHTML = ("<i class = 'owf owf-" + iconCode + "-n owf-2x owf-pull-right' data-toggle = 'tooltip' data-placement = 'bottom' title = "+ data.list[i].weather["0"].description +"></i>");
       /*

       let iconCode = data.list[i].weather["0"].icon;
       let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
       let  icon = document.querySelector(iconID);
       icon.innerHTML = ("<img src='" + iconUrl  + "'>");
       */
     }
      // convert celsius to fahrenheit and vice versa
     function cel2fah(ctemp) {
       return ((9 * ctemp)/5) + 32;
     }


     let changeUnit = document.querySelector('#changeTempUnits');
     let toggle = 1;
     changeUnit.addEventListener("click", function(){

       if(toggle){
         changeUnit.innerHTML = "&#8451";
         for(let i = 0; i < data.list.length; i++){
           let tempID = '#day'+i+'Temp';
           let newid = document.querySelector(tempID);
           newid.innerHTML = cel2fah(data.list[i].temp.day).toFixed() + "&#8457";

         }
         toggle = !toggle;
       }
       else if(!toggle) {
         changeUnit.innerHTML = "&#8457";
         for(let i = 0; i < data.list.length; i++){
           let tempID = '#day'+i+'Temp';
           let newid = document.querySelector(tempID);
           newid.innerHTML = (data.list[i].temp.day).toFixed() + "&#8451";

         }
         toggle = !toggle;
       }
     });
    });

});

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
