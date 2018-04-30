import React, { Component } from 'react';
import moment from 'moment/moment';
import type { DatasetMetadata } from '../../lib/socrata/dataset-metadata';

type Props = {
    metadata: DatasetMetadata
};

export default class DatasetPreview extends Component<Props> {
    render() {
        let metadata = this.props.metadata;

        return (
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Current Dataset</h2>
                </div>

                <div className="card-body">
                    <h2 className="mb-0">{metadata.name}</h2>
                    <small>
                        <a href={metadata.webUri} target="_blank">
                            <i className="fe fe-home" aria-hidden="true" /> Homepage
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
            </div>
        );
    }
}
