// Creating map object
var myMap = L.map("map", {
    center: [40.7128, -74.0059]
    
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

    for (var i = 0; i < response.length; i++) {
        var location = response[i].geometry;
    
        if (location) {
          L.marker([geometry.coordinates[1], geometry.coordinates[0]]).addTo(myMap);
        }
      }
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
  