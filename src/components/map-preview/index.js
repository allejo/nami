import * as _ from 'lodash';
import L from 'leaflet';
import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';

type Props = {
    geoJSON: Array<Object>
};

export default class MapPreview extends Component<Props> {
    static defaultProps = {
        geoJSON: []
    };

    static handlePoints(point, latlng) {
        const icon = L.divIcon();

        // @todo Use user-supplied template for bindPopup()
        return L.marker(latlng, {
            icon: icon
        }).bindPopup(`${point.properties.permit_type}`);
    }

    render() {
        const center = [34.42645209549924, -118.49922180175783];
        const layers = this.props.geoJSON.map(function(layer) {
            // @todo Get rid of the epoch "unique" key
            return <GeoJSON data={layer.data} pointToLayer={MapPreview.handlePoints} key={new Date().getTime()} />;
        });

        return (
            <Map center={center} zoom={12}>
                <TileLayer
                    url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />

                {!_.isEmpty(layers) && layers}
            </Map>
        );
    }
}
