import isEmpty from 'lodash.isempty';
import React, { Component } from 'react';
import AlertMessage from '../alert-message';
import { Dataset } from '../../lib/socrata/dataset';
import { DatasetDefinition } from '../../lib/socrata/dataset-definition';
import type { DatasetMetadata } from '../../lib/socrata/dataset-metadata';
import type { MetadataPromise } from '../../lib/socrata/dataset';
import type { IAlertMessage } from '../../lib/IAlertMessage';

type Props = {
    onColumnsChange: () => mixed,
    onDatasetChange: () => mixed,
    onDatasetUpdate: () => mixed,
    onDatasetError: () => mixed,
    onGeoJsonChange: () => mixed
};

type State = {
    url: string,
    datasetMetadata: DatasetMetadata,
    errorMessage: IAlertMessage
};

export default class DatasetSelector extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            datasetMetadata: {},
            errorMessage: {}
        };
    }

    _guessDataset(): DatasetDefinition {
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

    handleDatasetError = (e: IAlertMessage) => {
        this.setState({
            errorMessage: e
        });
    };

    triggerDatasetUpdate = e => {
        e.preventDefault();

        let fourByFour = this._guessDataset();
        let ds = new Dataset(fourByFour);

        ds
            .initDataset()
            .then(
                function() {
                    // We've got a valid dataset, so let's clear out our error state
                    this.setState({
                        errorMessage: {}
                    });

                    // Let's fetch the dataset's metadata
                    ds.getMetadata().then(
                        function(e: MetadataPromise) {
                            this.props.onDatasetUpdate({
                                definition: fourByFour,
                                object: ds,
                                metadata: e.data
                            });
                        }.bind(this)
                    );
                }.bind(this)
            )
            .catch(
                function(e) {
                    this.handleDatasetError({
                        type: 'Danger',
                        message: e.message
                    });
                }.bind(this)
            );
    };

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Pick Your Dataset</h2>
                </div>

                <div className="card-body">
                    {!isEmpty(this.state.errorMessage) && <AlertMessage error={this.state.errorMessage} />}
                    <div>
                        <form onSubmit={this.triggerDatasetUpdate}>
                            <div className="form-group">
                                <label htmlFor="url">DataSet URL</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="url"
                                    name="url"
                                    onChange={this.handleInputChange}
                                />
                            </div>

                            <input type="submit" className="btn btn-primary" value="Search for Dataset" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
