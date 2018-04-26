// @flow

import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import 'react-select/dist/react-select.css';
import 'tabler-ui/dist/assets/css/dashboard.css';
import './App.css';
import DatasetSelector from './components/dataset-selector';
import MapPreview from './components/map-preview';
import WhereQuery from './components/where-query-builder';
import type { ColumnDefinition } from './lib/socrata/column-definition';
import type { DatasetDefinition } from './lib/socrata/dataset-definition';
import type { IWhereCondition } from "./lib/query-builder/IWhereCondition";

type Props = {};
type State = {
    dataset: DatasetDefinition,
    query: { conditions: Array<IWhereCondition> },
    columns: Array<ColumnDefinition>,
    geojson: Object
};

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            // Here's a dataset that we can use in testing
            //   https://data.lacity.org/A-Prosperous-City/Building-and-Safety-Permit-Information/yv23-pmwf
            dataset: {
                host: '',
                resource: '',
                valid: false
            },
            query: {
                conditions: []
            },
            columns: [],
            geojson: {}
        };
    }

    handleNewDataset = (dataset: DatasetDefinition) => {
        if (dataset.valid) {
            this.setState({
                dataset: dataset
            });
        } else {
            console.error('Invalid dataset given');
        }
    };

    handleNewColumns = (columns: Array<ColumnDefinition>) => {
        this.setState({
            columns: columns
        });
    };

    handleNewLayer = geojson => {
        this.setState({
            geojson: geojson
        });
    };

    handleNewWhereFilter = (conditions: Array<IWhereCondition>) => {
        console.log('@todo apply where filter');
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <DatasetSelector
                            onDatasetChange={this.handleNewDataset}
                            onColumnsChange={this.handleNewColumns}
                            onGeoJsonChange={this.handleNewLayer}
                        />

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

export default App;
