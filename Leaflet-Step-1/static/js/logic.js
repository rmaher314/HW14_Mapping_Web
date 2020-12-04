// Creating map object
console.log("working")
var myMap = L.map("map", {
  center: [36.77, -119.41],
  zoom: 7
});
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

 // Use this link to get the geojson data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
    console.log(data);
    
    //Create Market clusters
    //To
    
    var earthquakeArray = data.features;
    var lat,lon, dep, mag, descriptor, hex, place, depthColor;
    var markers = L.circleMarker;




    for (var i = 0; i < earthquakeArray.length; i++) {
      // Set the data location of the earthquakes to a variable
      console.log(earthquakeArray[i]);
      var location = earthquakeArray[i].geometry;
      //var property = data.properties;
    
        if (location != null) {
          lat = location.coordinates[1];
          lon = location.coordinates[0];
          dep = location.coordinates[2];
          mag = earthquakeArray[i].properties.mag;
          place = earthquakeArray[i].properties.place;
          descriptor = "Magnitude: " + mag + " Location: " + place + " Depth: " + dep;
          hex = dep.toString(16);
          console.log(lat, lon, dep, mag, hex);
          //var marker = L.marker([lat, lon]).addTo(myMap);
          if (dep <5) {
            depthColor = "green";
          }
            else if (dep <10) {
            depthColor = "cyan";
          }
            else if (dep <50) {
            depthColor = "blue";
          }
            else if (dep <100) {
            depthColor = "purple";
          }
            else if (dep <150) {
            depthColor = "pink";
          }
            else if (dep <200) {
            depthColor = "yellow";
          }
            else if (dep <250) {
            depthColor = "orange";
          }
            else {
              depthColor = "red";
            }
          var circle = L.circleMarker([lat, lon], {
            color: depthColor,
            fillColor: depthColor,
            radius: mag * 5,
            fillOpacity: 0.5
          }).bindPopup(descriptor).addTo(myMap);

        
        }

      }
      

   
       
      var legend = L.control({position: 'bottomleft'});
      legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend');
      var labels = ['<strong>Depth</strong>']
      var categories = ['0 - 4.9 depth','5 - 9.9 depth','10 - 49.9 depth','50 - 99.9 depth','100 - 149.9 depth','150 - 199.9 depth','200 - 249.9 depth','250 or deeper'];
      var colors =['green','cyan','blue','purple','pink','yellow','orange','red']
      for (var i = 0; i < categories.length; i++) {
  
              div.innerHTML += 
              labels.push(
                  '<i style="background:' + colors[i] + '!Important;"></i> ' +
              (categories[i] ? categories[i] : '+'));
  
          }
          div.innerHTML = labels.join('<br>');
      return div;
      };
      legend.addTo(myMap);

    });