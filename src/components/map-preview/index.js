import L from 'leaflet';
import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'

export default class MapPreview extends Component {
    render() {
        const center = [34.42645209549924, -118.49922180175783];
        const icon = L.divIcon();

        return (
            <Map center={center} zoom={12}>
                <TileLayer
                    url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />

                {this.props.dataset.map((ds, i) => (
                    <GeoJSON data={ds} key={i} />
                ))}

                <Marker position={center} icon={icon}>
                    <Popup>
                        <span>A pretty CSS3 popup.<br />Easily customizable.</span>
                    </Popup>
                </Marker>
            </Map>
        );
    }
}
