# Mapping Recent Earthquakes: JS-Leaflet

![Map Demo](map_demo.gif)

This exercise makes use of data collected and published by the United States Geological Survey (USGS), the US federal agency responsible for providing scientific data about natural hazards, the health of ecosystems and the environment, and the impacts of climate and land-use change. USGA scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The purpose of this project was to visualize data on the most recent earthquakes worldwide, calling data from the USGS's website that is collected and updated daily. These types of visualizations allow us to better educate the public and other organizations in real-time, making quick use of data collected by large public agencies.

## Dataset Information
The USGS provides earthquake data in a number of different formats, updated every 5 minutes, and made available via the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).  Each dataset link available provides a JSON representation of that data, where the JSON url can be used to pull in the data to javascript for visualization. 

## Visualization
For this exercise, the data were visualized using the JavaScript Leaflet library. There are several datasets available at the USGS site, but for the purposes of this exercise, I chose earthquakes of magnitude 4.5 or greater that have occurred in the last 30 days. The data feeding into the map will adjust automatically as they are updated by the USGS.  

