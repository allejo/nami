// @flow

import * as _ from 'lodash';
import React, { Component } from 'react';

import 'leaflet/dist/leaflet.css';
import 'react-select/dist/react-select.css';
import 'tabler-ui/dist/assets/css/dashboard.css';
import './App.css';

import { Dataset } from './lib/socrata/dataset';
import SoqlBuilder from './lib/soql/soql-builder';

import DatasetSelector from './components/dataset-selector';
import DatasetPreview from './components/dataset-preview';
import WhereQuery from './components/where-query-builder';
import MapPreview from './components/map-preview';

import type { ColumnDefinition } from './lib/socrata/column-definition';
import type { ColumnsPromise } from './lib/socrata/dataset';
import type { DatasetDefinition } from './lib/socrata/dataset-definition';
import type { DatasetMetadata } from './lib/socrata/dataset-metadata';
import type { IWhereCondition } from './lib/query-builder/IWhereCondition';

type Props = {};
type State = {
    dataset: {
        definition: DatasetDefinition,
        object: Dataset,
        metadata: DatasetMetadata
    },
    query: { conditions: Array<IWhereCondition> },
    columns: Array<ColumnDefinition>,
    geojson: Object,
    error: boolean
};

export default class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            // Here's a dataset that we can use in testing
            //   https://data.lacity.org/A-Prosperous-City/Building-and-Safety-Permit-Information/yv23-pmwf
            dataset: {
                definition: {},
                object: {},
                metadata: {}
            },
            query: {
                conditions: []
            },
            columns: [],
            geojson: {},
            error: false
        };
    }

    handleDatasetError = () => {
        this.setState({
            error: false
        });
    };

    handleDatasetUpdate = e => {
        this.setState({
            dataset: e
        });

        this._fetchDatasetColumns();
        this._fetchGeoJsonLayer();
    };

    _fetchDatasetColumns = () => {
        let dataset = this.state.dataset.object;

        dataset.getColumns().then(
            function(e: ColumnsPromise) {
                this.setState({
                    columns: e.data.columns
                });
            }.bind(this)
        );
    };

    _fetchGeoJsonLayer = () => {
        let dataset = this.state.dataset.object;
        let query = new SoqlBuilder();

        query.limit(1000);

        dataset.getRows(query, 'geojson').then(
            function(e) {
                this.setState({
                    geojson: e.data
                });
            }.bind(this)
        );
    };

    handleNewWhereFilter = (conditions: Array<IWhereCondition>) => {
        console.log('@todo apply where filter');
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <DatasetSelector
                            onDatasetError={this.handleDatasetError}
                            onDatasetUpdate={this.handleDatasetUpdate}
                        />

                        {!_.isEmpty(this.state.dataset.metadata) && (
                            <DatasetPreview metadata={this.state.dataset.metadata} />
                        )}

                        <WhereQuery columns={this.state.columns} onNewFilter={this.handleNewWhereFilter} />
                    </div>
                    <div className="col-md-8">
                        <MapPreview dataset={this.state.geojson} />
                    </div>
                </div>
            </div>
        );
    }
}
