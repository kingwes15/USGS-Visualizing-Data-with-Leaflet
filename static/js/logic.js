// Creating map object
var map = L.map("map", {
  center: [37.7783, -112.4179],
  zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(map);

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";


// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a GeoJSON layer with the retrieved data
  // L.geoJson(data).addTo(map);

  var features =data.features

  for(var i = 0; i < features.length; i++){
    var mag = features[i]["properties"]["mag"]
    var coordinates = features[i]["geometry"]["coordinates"]
    // console.log(coordinates)
    // console.log(mag)
    if (mag > 5){
      var fill = "red"
    } else if (mag > 4){
      var fill = "brown"
    } else if (mag > 3){
      var fill = "coral"
    } else if (mag > 2){
      var fill = "orange"
    }  else if (mag > 1){
      var fill = "yellow"
    } else {
      var fill = "greenyellow"
    }

    var circle = L.circle([coordinates[1], coordinates[0]] ,{
      color: "none",
      fillColor: fill,
      fillOpacity: .8,
      radius: mag*20000
    }).addTo(map)
    circle.bindPopup("<strong>Location: </strong>"+features[i]["properties"]["place"] + "<br>"+
    "<strong>Magnitude: </strong>"+mag)

  }


});

var legend = L.control({
  position: "bottomright",
})

legend.onAdd = function(){
  var div = L.DomUtil.create("div", "legend")
  var grades = [0,1,2,3,4,5]
  var colorGrid = ["greenyellow", "yellow",  "orange", "coral", "brown", "red"]
  var labels = []
  
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML += '<i style="background:' + colorGrid[i] + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }

  return div
}

legend.addTo(map)

