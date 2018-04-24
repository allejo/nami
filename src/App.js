// @flow

import React, { Component } from 'react';
import './App.css';
import 'tabler-ui/dist/assets/css/dashboard.css';
import { QuerySelect } from './components/query-select';
import type { SocrataColumnDefinition } from './lib/socrata-column';
import type { SocrataDatasetDefinition } from './lib/socrata-dataset';
import { DatasetSelector } from './components/dataset-selector';

type Props = {};
type State = {
    dataset: SocrataDatasetDefinition
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
            }
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

    render() {
        let columns: Array<SocrataColumnDefinition> = [
            {
                name: 'Accessor Book',
                api_name: 'accessor_book',
                type: 'Text'
            },
            {
                name: 'Tract',
                api_name: 'tract',
                type: 'Double'
            }
        ];

        return (
            <div className="container">
                <DatasetSelector onDatasetChange={this.handleNewDataset} />
                <QuerySelect columns={columns} />
            </div>
        );
    }
}

export default App;
