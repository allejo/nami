// @flow

import * as _ from 'lodash';
import React, { Component } from 'react';
import moment from 'moment';
import { Dataset } from '../../lib/socrata/dataset';
import { DatasetDefinition } from '../../lib/socrata/dataset-definition';
import type { DatasetMetadata } from '../../lib/socrata/dataset-metadata';
import type { ColumnsPromise, MetadataPromise } from '../../lib/socrata/dataset';

type Props = {
    onColumnsChange: () => mixed,
    onDatasetChange: () => mixed,
    onGeoJsonChange: () => mixed
};

type State = {
    url: string,
    datasetMetadata: DatasetMetadata
};

export class DatasetSelector extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            datasetMetadata: {}
        };
    }

    primitiveDatasetParser(): DatasetDefinition {
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
        let ds = new Dataset(dsd);

        ds.initDataset().then(
            function() {
                ds.getMetadata().then(
                    function(e: MetadataPromise) {
                        this.setState({
                            datasetMetadata: e.data
                        });
                    }.bind(this)
                );

                ds.getColumns().then(
                    function(e: ColumnsPromise) {
                        this.props.onColumnsChange(e.data.columns);
                    }.bind(this)
                );

                ds.getRows(null, 'geojson').then(function (e) {
                    this.props.onGeoJsonChange(e.data);
                }.bind(this))
            }.bind(this)
        );

        this.props.onDatasetChange(dsd);
    };

    renderDatasetPreview = () => {
        let metadata = this.state.datasetMetadata;

        if (_.isEmpty(metadata)) {
            return '';
        }

        return (
            <div className="border-top pt-4 mt-4">
                <h2 className="mb-0">{metadata.name}</h2>
                <small>
                    <a href={metadata.webUri} target="_blank">
                        Homepage
                    </a>
                </small>

                <p className="my-3">{metadata.description}</p>

                <p className="m-0">
                    <strong>License:</strong> {metadata.license}
                </p>
                <p className="m-0">
                    <strong>Last Updated:</strong> {moment(metadata.dataUpdatedAt).format('MMMM Do YYYY, h:mm a')}
                </p>
            </div>
        );
    };

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Pick Your Dataset</h2>
                </div>

                <div className="card-body">
                    <div>
                        <form onSubmit={this.updateDataset}>
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
                    <div>{this.renderDatasetPreview()}</div>
                </div>
            </div>
        );
    }
}
