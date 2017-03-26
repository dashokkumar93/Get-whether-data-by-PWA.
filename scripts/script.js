function initFunction()
{
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
  }
  initButton();

}

function initButton()
{  var location;
  $("#whetherButton").on("click",function(){
getLocationInfo(getWhetherData);
$(".loader").css("visibility","visible")

  })

}
function getLocationInfo(callback)
{

return new Promise(function (resolve, reject) {
   navigator.geolocation.getCurrentPosition(function (position) {
     callback(position)
   });
 });



}
function showPosition(position) {

return position;
}
function getWhetherData(position)
{console.log(position)
var latitude,longitude;
  latitude=position.coords.latitude;
  longitude=position.coords.longitude;
  var promise=$.get("https://query.yahooapis.com/v1/public/yql", {
    q: 'select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="('+latitude+","+longitude+')")',
    format: "json"
   });
   promise.done(function(data)
 {
   showWhetherInfo(data)
 })
}
function showWhetherInfo(data)
{
 $(".loader").css("visibility","hidden")
  $("#whetherButton").remove();
  var p=$("<p>",{
    class:"locationDescription"
  });
  var description=data.query.results.channel.description;
$(p).html(description);
$(".container").append(p);
console.log(data)
var currentTemperature=data.query.results.channel.item.condition.temp;
console.log(currentTemperature)
p=$("<p>",{
  class:"currentTemperature"
});
$(".container").append(p);
$(p).html("Current Temperature:"+currentTemperature+"&#8457");
var sunRiseTime=data.query.results.channel.astronomy.sunrise;
p=$("<p>",{
  class:"sunRiseTime"
});
$(".container").append(p);
$(p).html("SunRise Time:"+sunRiseTime);
var sunSetTime=data.query.results.channel.astronomy.sunset;
p=$("<p>",{
  class:"sunSetTime"
});
$(".container").append(p);
$(p).html("SunSet Time:"+sunSetTime);
}
