import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Map, CircleMarker, TileLayer, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapChart() {
  const [values, setValues] = useState({
    mapData: '',
  });

  const { mapData } = values;

  useEffect(() => {
    let name = [];
    axios
      .get('https://corona.lmao.ninja/v2/jhucsse')
      .then((res) => {
        res.data.map((dataValue) => {
          let country;
          if (dataValue.province) {
            country = dataValue.province;
          } else {
            country = dataValue.country;
          }
          let cordinates = [
            Number(dataValue.coordinates.latitude),
            Number(dataValue.coordinates.longitude),
          ];
          let confirmed = dataValue.stats.confirmed;
          let deaths = dataValue.stats.deaths;
          let recovered = dataValue.stats.recovered;

          let mapData = {
            name: country,
            coordinates: cordinates,
            confirmed,
            deaths,
            recovered,
          };
          name.push(mapData);
        });
        setValues({ ...values, mapData: name });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let mapLatData = {
    minLat: -6.1751,
    maxLat: 55.7558,
    minLong: 37.6173,
    maxLong: 139.6917,
  };

  // Zoom
  let centerLat = (mapLatData.minLat + mapLatData.maxLat) / 2;
  let distanceLat = mapLatData.maxLat - mapLatData.minLat;
  let bufferLat = distanceLat * 0.05;
  let centerLong = (mapLatData.minLong + mapLatData.maxLong) / 2;
  let distanceLong = mapLatData.maxLong - mapLatData.minLong;
  let bufferLong = distanceLong * 0.15;
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ textAlign: 'center', margin: '1rem 0' }}>
        Regions Affected by COVID-19
      </h2>
      <Map
        style={{ height: '60vh', width: '100%', marginBottom: '1rem' }}
        zoom={1}
        center={[centerLat, centerLong]}
        bounds={[
          [mapLatData.minLat - bufferLat, mapLatData.minLong - bufferLong],
          [mapLatData.maxLat + bufferLat, mapLatData.maxLong + bufferLong],
        ]}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

        {mapData === '' ? (
          <div>Loading...</div>
        ) : (
          mapData.map((city, k) => {
            return (
              <CircleMarker
                key={k}
                center={city.coordinates}
                radius={2 * Math.log(Number(city.confirmed) / 10)}
                fillOpacity={0.5}
                stroke={false}
              >
                <Tooltip direction='top'>
                  <h3>{city.name}</h3>
                  <hr />
                  <div>Confirmed Cases: {city.confirmed}</div>
                  <div>Death: {city.deaths}</div>
                  <div>Recovered: {city.recovered}</div>
                </Tooltip>
              </CircleMarker>
            );
          })
        )}
      </Map>
    </div>
  );
}
