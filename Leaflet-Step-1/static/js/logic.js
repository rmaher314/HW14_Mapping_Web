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
    var lat,lon, dep, mag, descriptor, hex, place;
    var markers = L.circleMarker;

  //   var circle = L.circle([51.508, -0.11], {
  //     color: 'red',
  //     fillColor: '#f03',
  //     fillOpacity: 0.5,
  //     radius: 500
  // }).addTo(mymap);


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
          descriptor = mag + " " + place + " " + dep;
          hex = dep.toString(16);
          console.log(lat, lon, dep, mag, hex);
          //var marker = L.marker([lat, lon]).addTo(myMap);

          var circle = L.circleMarker([lat, lon], {
            // color: 'red',
            fillColor: hex,
            radius: mag * 10
          }).bindPopup(descriptor).addTo(myMap);

          // var marker = L.marker(lat, lon{
          //   icon: dep
          // })
        }

      }
      

    });
    // Creating a geoJSON layer with the retrieved data
//     geoJson = L.geoJson(data, {
//       // Style for each feature (in this case a neighborhood)
//       style: function(feature) {
//         return {
//           color: "white",
//           // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
//           fillColor: chooseColor(feature.properties.borough),
//           fillOpacity: 0.5,
//           weight: 1.5
//         };
//       },
//       // Called on each feature
//       onEachFeature: function(feature, layer) {
//         // Setting various mouse events to change style when different events occur
//         layer.on({
//           // On mouse over, make the feature (neighborhood) more visible
//           mouseover: function(event) {
//             layer = event.target;
//             layer.setStyle({
//               fillOpacity: 0.9
//             });
//           },
//           // Set the features style back to the way it was
//           mouseout: function(event) {
//             geoJson.resetStyle(event.target);
//           },
//           // When a feature (neighborhood) is clicked, fit that feature to the screen
//           click: function(event) {
//             myMap.fitBounds(event.target.getBounds());
//           }
//         });
//         // Giving each feature a pop-up with information about that specific feature
//         layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");
//       }
//     }).addTo(myMap);
//   });