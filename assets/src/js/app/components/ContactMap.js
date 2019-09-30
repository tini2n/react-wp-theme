import React from 'react';

import 'leaflet';
import { Map, Marker, TileLayer } from 'react-leaflet';

const ContactMap = ({ zoom, position }) => (
    <Map zoom={zoom} center={position} style={{ height: '480px' }}
         attributionControl={true}
         zoomControl={true}
         doubleClickZoom={true}
         scrollWheelZoom={false}
         dragging={true}
         animate={true}
         easeLinearity={0.35}>
        <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} />
    </Map>
);

export default ContactMap