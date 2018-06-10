
var idList;
var input = document.getElementById('inp');
var butt = document.getElementById('butt');
var placeName = "";
var id;
var modalContent = document.getElementById('modalContent');
var modalTitle = document.getElementById('modalTitle');

var request1 = new XMLHttpRequest();
request1.open("GET","id.txt",true);
request1.responseType = 'json';
request1.onreadystatechange = function(){
    if(request1.readyState === 4 && request1.status === 200){
        idList = request1.response;
        console.log();                
    }
}
request1.send();

butt.addEventListener("click", function(event){
    
    placeName = input.value;
    input.value = "";
    console.log(placeName);
    
    var flag = false;
    for(let i = 0; i < idList.length ; i++){
        if(idList[i].name === placeName){
            id = idList[i].id;
            console.log(id);
            flag = true;
            break;
        } 
    }
    if (flag === true) {
        
        var request = new XMLHttpRequest();
        request.responseType = 'json';
        //replace weather by forecast to get forecast at every 3hours
        // find id somehow for each place
        var url = `http://api.openweathermap.org/data/2.5/weather?id=${id}&APPID=2571a8299a55cb71e3677177e917aa5d`;
        request.open("GET",url,true);
        var res= {};
        request.onreadystatechange = function(){
            if (request.readyState==4 && request.status==200) {
                res = request.response;
                console.log(res);
                var mySunrise = new Date(res.sys.sunrise*1000);
                var mySunriseTime = mySunrise.toTimeString();
                var mySunset = new Date( (res.sys.sunset)*1000);
                var mySunsetTime = mySunset.toTimeString();
                var str1 = `Location: ${res.name}`
                var str2 = ` <br> Weather: ${res.weather[0].main}<br>Description:${res.weather[0].description} <br> Current_Temp: ${Math.round(res.main.temp - 273.15)}&degC <br> Min_Temp: ${Math.round(res.main.temp_min - 273.15)}&degC <br> Max_Temp: ${Math.round(res.main.temp_max - 273.15)}&degC <br> Humidity: ${res.main.humidity} <br> Pressure: ${res.main.pressure}Pa <br> Wind Speed: ${res.wind.speed} <br> Sunrise Time: ${mySunriseTime} <br> Sunset Time: ${mySunsetTime} `;
                modalTitle.innerHTML = str1;
                modalContent.innerHTML = str2; 
                $('#modal').modal('show');              
            }
        }
        request.send(); 
    }else{
        var str1 = 'OOPS';
        var str2 = 'Data for the given city is not available in the database';
        modalTitle.innerHTML = str1;
        modalContent.innerHTML = str2;
        $('#modal').modal('show'); 
    }

    
});
