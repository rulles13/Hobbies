import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';



const Map = ({data}) => {
  let latitude = data.geoPos.latitude
  let longitude = data.geoPos.longitude

  console.log("lat :" + latitude + " long : " + longitude);


  var meIcon = L.icon({
    iconUrl: '../../img/street-view.png',
    iconSize:     [50, 50],
    iconAnchor:   [25, 50],
    popupAnchor:  [-3, -76]
});

  return (
    <MapContainer center={[latitude, longitude]} zoom={16} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} icon={meIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      
    </MapContainer>
  );
};

export default Map;