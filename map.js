var mymap = L.map('mapid').setView([28.67, 77.22], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
        }).addTo(mymap);



function onMapClick(event) {

    var lat = event.latlng.lat;
    var lng = event.latlng.lng;
    console.log(event.latlng    );
    var min = 999999;
    for(let i=0 ;i<idList.length;i++){
        var temp = Math.abs(idList[i].coord.lat - lat) + Math.abs(idList[i].coord.lon - lng);
        if(temp < min){
            id = idList[i].id;
            min = temp;
        }
    }
    console.log('sdfghjhredc');
    console.log(id);
    var request = new XMLHttpRequest();
    var url = `http://api.openweathermap.org/data/2.5/weather?id=${id}&APPID=2571a8299a55cb71e3677177e917aa5d`;
    request.open("GET",url,true);
    request.responseType = 'json';
    request.onreadystatechange = function(){
        if (request.readyState==4 && request.status==200) {
            res = request.response;
            
            console.log(res);
            var mySunrise = new Date(res.sys.sunrise*1000);
            var mySunriseTime = mySunrise.toTimeString();
            var mySunset = new Date( (res.sys.sunset)*1000);
            var mySunsetTime = mySunset.toTimeString();
            var str1 = `Location: ${res.name}`
            var str2 = `Weather: ${res.weather[0].main}<br>Description:${res.weather[0].description} <br> Current_Temp: ${Math.round(res.main.temp - 273.15)}&degC <br> Min_Temp: ${Math.round(res.main.temp_min - 273.15)}&degC <br> Max_Temp: ${Math.round(res.main.temp_max - 273.15)}&degC <br> Humidity: ${res.main.humidity} <br> Pressure: ${res.main.pressure}Pa <br> Wind Speed: ${res.wind.speed} <br> Sunrise Time: ${mySunriseTime} <br> Sunset Time: ${mySunsetTime} `;
            modalTitle.innerHTML = str1;
            modalContent.innerHTML = str2;
            $('#modal').modal('show');                 
        }else{
            var str1 = 'OOPS';
            var str2 = 'Data for the given city is not available in the database';
            modalTitle.innerHTML = str1;
            modalContent.innerHTML = str2;
            $('#modal').modal('show'); 
        }

    }
    request.send(); 
}

mymap.on('click', onMapClick);