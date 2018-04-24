// @flow

import React, { Component } from 'react';
import type { SocrataDatasetDefinition } from '../../lib/socrata-dataset';
import SocrataDataset from '../../lib/socrata-dataset';

type Props = {
    onDatasetChange: () => mixed
};

type State = {
    url: string
};

export class DatasetSelector extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            url: ''
        };
    }

    primitiveDatasetParser(): SocrataDatasetDefinition {
        let url = this.state.url;
        let datasetRegex = /.+\/\/([a-zA-Z.]+)\/.+\/([a-z0-9]{4}-[a-z0-9]{4})/g;
        let matches = datasetRegex.exec(url);

        if (matches == null) {
            return {
                host: '',
                resource: '',
                valid: false
            };
        }

        return {
            host: matches[1],
            resource: matches[2],
            valid: true
        };
    }

    handleInputChange = e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    updateDataset = e => {
        e.preventDefault();

        let dsd = this.primitiveDatasetParser();
        let ds = new SocrataDataset(dsd);

        ds.getMetadata().then(function(e) {
            console.log(e.data);
        });

        this.props.onDatasetChange(dsd);
    };

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Pick Your Dataset</h2>
                </div>

                <div className="card-body">
                    <form onSubmit={this.updateDataset}>
                        <label htmlFor="url">DataSet URL</label>
                        <input type="text" id="url" name="url" onChange={this.handleInputChange} />

                        <input type="submit" value="Use Dataset" />
                    </form>
                </div>
            </div>
        );
    }
}
