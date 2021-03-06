import isEmpty from 'lodash.isempty';
import React, { Component } from 'react';

import 'leaflet/dist/leaflet.css';
import 'react-select/dist/react-select.css';
import 'tabler-ui/dist/assets/css/dashboard.css';
import './App.css';

import { Dataset } from './lib/socrata/dataset';
import SoqlBuilder from './lib/soql/soql-builder';

import Footer from './layout/footer';

import DatasetSelector from './components/dataset-selector';
import DatasetPreview from './components/dataset-preview';
import PopupEditor from './components/popup-editor';
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
    geoJsonLayers: Array<Object>,
    popupTemplate: string,
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
            soql: new SoqlBuilder(),
            query: {
                conditions: []
            },
            columns: [],
            geoJsonLayers: [],
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
        let layers = this.state.geojson;
        let dataset = this.state.dataset.object;
        let soql = this.state.soql;

        soql.limit(1000);

        dataset.getRows(soql, 'geojson').then(
            function(e) {
                layers = [e];

                this.setState({
                    geoJsonLayers: layers
                });
            }.bind(this)
        );
    };

    handlePopupUpdate = (template: string) => {
        this.setState({
            popupTemplate: template
        });
    };

    handleNewWhereFilter = (conditions: Array<IWhereCondition>) => {
        let soql = new SoqlBuilder();

        conditions.forEach(function(condition: IWhereCondition) {
            soql.andWhere(
                `${condition.column.value.fieldName} ${condition.operator.value.literal} "${condition.value.field}"`
            );
        });

        this.setState(
            {
                soql: soql
            },
            () => {
                this._fetchGeoJsonLayer();
            }
        );
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 scrollable viewport-height">
                        <DatasetSelector
                            onDatasetError={this.handleDatasetError}
                            onDatasetUpdate={this.handleDatasetUpdate}
                        />

                        {!isEmpty(this.state.dataset.metadata) && (
                            <div>
                                <DatasetPreview metadata={this.state.dataset.metadata} />

                                <PopupEditor columns={this.state.columns} onPopupUpdate={this.handlePopupUpdate} />

                                <WhereQuery
                                    columns={this.state.columns}
                                    dataset={this.state.dataset.object}
                                    onNewFilter={this.handleNewWhereFilter}
                                />
                            </div>
                        )}

                        <Footer />
                    </div>
                    <div className="col-md-8">
                        <MapPreview geoJSON={this.state.geoJsonLayers} popupTemplate={this.state.popupTemplate} />
                    </div>
                </div>
            </div>
        );
    }
}
