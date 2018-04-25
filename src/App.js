// @flow

import React, { Component } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import 'tabler-ui/dist/assets/css/dashboard.css';
import { DatasetSelector } from './components/dataset-selector';
import { QuerySelect } from './components/query-select';
import type { ColumnDefinition } from './lib/socrata/column-definition';
import type { DatasetDefinition } from './lib/socrata/dataset-definition';
import MapPreview from "./components/map-preview";

type Props = {};
type State = {
    dataset: DatasetDefinition,
    columns: Array<ColumnDefinition>
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
            columns: []
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

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <DatasetSelector
                            onDatasetChange={this.handleNewDataset}
                            onColumnsChange={this.handleNewColumns}
                        />
                    </div>
                    <div className="col-md-8">
                        <MapPreview dataset={[]} />
                    </div>
                </div>
                <QuerySelect columns={this.state.columns} />
            </div>
        );
    }
}

export default App;
