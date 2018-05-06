import * as _ from 'lodash';
import L from 'leaflet';
import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';

const placeholderRegex = /(@\[.*?\]\(([a-zA-Z_]+)\))/g;

type Props = {
    geoJSON: Array<Object>,
    popupTemplate: string
};

export default class MapPreview extends Component<Props> {
    static defaultProps = {
        geoJSON: [],
        popupTemplate: ''
    };

    handlePoints = (point, latlng) => {
        const { popupTemplate } = this.props;

        const icon = L.divIcon();
        const marker = L.marker(latlng, {
            icon: icon
        });

        if (popupTemplate.length > 0) {
            let popup = popupTemplate;
            let m;

            while ((m = placeholderRegex.exec(popupTemplate)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === placeholderRegex.lastIndex) {
                    placeholderRegex.lastIndex++;
                }

                if (m.length === 3) {
                    popup = popup.replace(m[0], point.properties[m[2]]);
                }
            }

            popup = popup.replace(/(?:\r\n|\r|\n)/g, '<br>');

            marker.bindPopup(popup);
        }

        return marker;
    };

    render() {
        const center = [34.42645209549924, -118.49922180175783];
        const layers = this.props.geoJSON.map(
            function(layer) {
                // @todo Get rid of the epoch "unique" key
                return <GeoJSON data={layer.data} pointToLayer={this.handlePoints} key={new Date().getTime()} />;
            }.bind(this)
        );

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
