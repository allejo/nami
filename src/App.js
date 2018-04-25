// @flow

import React, { Component } from 'react';
import './App.css';
import 'tabler-ui/dist/assets/css/dashboard.css';
import { QuerySelect } from './components/query-select';
import type { SocrataColumnDefinition } from './lib/socrata-column-definition';
import type { SocrataDatasetDefinition } from './lib/socrata-dataset';
import { DatasetSelector } from './components/dataset-selector';

type Props = {};
type State = {
    dataset: SocrataDatasetDefinition,
    columns: Array<SocrataColumnDefinition>
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

    handleNewDataset = (dataset: SocrataDatasetDefinition) => {
        if (dataset.valid) {
            this.setState({
                dataset: dataset
            });
        } else {
            console.error('Invalid dataset given');
        }
    };

    handleNewColumns = (columns: Array<SocrataColumnDefinition>) => {
        this.setState({
            columns: columns
        });
    };

    render() {
        return (
            <div className="container">
                <DatasetSelector onDatasetChange={this.handleNewDataset} onColumnsChange={this.handleNewColumns} />
                <QuerySelect columns={this.state.columns} />
            </div>
        );
    }
}

export default App;
