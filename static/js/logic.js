// IMPORT JSON DATA
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
var platesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";


// CREATE TILE LAYERS/BASEMAPS
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 50,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox/dark-v10",
    accessToken: API_KEY
  });

var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox/satellite-streets-v11",
    accessToken: API_KEY
  });

var baseMaps = {
    "Street Map": streetmap,
    "Satellite View": satellite,
    "Dark Map": darkmap
  };

//---------------------------------------------------------

// CREATE OVERLAY LAYERS
// 1) Tectonic plate boundary layer
var platesLayer = new L.LayerGroup();

d3.json(platesUrl, function (plates) {
  L.geoJSON(plates, {
    color: '#1247d8',
    weight: 2,
    fillOpacity: 0.01
  }).addTo(platesLayer);
});

//---------------------------------------------------------

// 2) Earthquakes layer
var earthquakesLayer = new L.LayerGroup();

d3.json(queryUrl, function(data) {
  function mapEarthquakes(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
    "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
    "<p>" + "Magnitude: " + feature.properties.mag + "</p>");
  }
  
  function colorMarkers(feature) {
    // console.log(feature.properties.mag)
    var color = "";
    if (feature.properties.mag > 6) {
        color = "#b10026";
    }
    else if (feature.properties.mag >= 5.5) {
        color = "#d84f19";
    }
    else if (feature.properties.mag >= 5) {
        color = "#fca420";
    }
    else {
        color = "#ffffb2";
    }

    var style = {
      color: "black",
      fillColor: color,
      fillOpacity: 0.60,
      radius: feature.properties.mag * 3,
      weight: 1
    }

    return style
  }

  L.geoJSON(data,{
    pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng);
    },
    style: colorMarkers,
    onEachFeature: mapEarthquakes
  }).addTo(earthquakesLayer);
});

var overlayMaps = {
  "Earthquakes": earthquakesLayer,
  "Tectonic Plates": platesLayer
  };

//---------------------------------------------------------

//CREATE MY MAP
var myMap = L.map("map", {
  center: [35.095192, 33.203430],
  zoom: 4,
  layers: [streetmap, earthquakesLayer, platesLayer]
});


//ADD CONTROL
L.control.layers(baseMaps, overlayMaps).addTo(myMap);


// ADD LEGEND
var legend = L.control({ position: "bottomright" });

legend.onAdd = function(myMap) {
  var div = L.DomUtil.create('div', 'info legend');
  var mag = [4.5,5,5.5,6];

  var colors = [
    "#ffffb2",
    "#fca420",
    "#d84f19",
    "#b10026"
  ];

  div.innerHTML = "<h4>Earthquake Magnitude</h4>";
  
  for (var i = 0; i < mag.length; i++) {
    div.innerHTML += 
      "<i style='background: "+colors[i]+"'></i>"+mag[i]+(mag[i+1] ? "&ndash;"+mag[i+1]+"<br>":"+");
  }

  return div;
}

legend.addTo(myMap);