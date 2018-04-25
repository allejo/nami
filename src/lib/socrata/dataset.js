// @flow

import * as _ from 'lodash';
import Axios from 'axios';
import SoqlBuilder from "../soql/soql-builder";
import type { ColumnDefinition } from './column-definition';
import type { DatasetDefinition } from './dataset-definition';
import type { DatasetMetadata } from './dataset-metadata';

type ResourceFormat = 'json' | 'geojson';

export interface MetadataPromise {
    data: DatasetMetadata;
}

export interface ColumnsPromise {
    data: {
        columns: Array<ColumnDefinition>
    };
}

export class Dataset {
    constructor(definition: DatasetDefinition) {
        this.definition = definition;
    }

    async initDataset() {
        const url = `https://${this.definition.host}/api/migrations/${this.definition.resource}.json`;
        const response = await Axios.get(url);

        this.definition.resource = response.data.nbeId;
    }

    getMetadata(): Promise<MetadataPromise> {
        if (!this.definition.valid) {
            throw new Error('Invalid DatasetDefinition: Cannot fetch metadata.');
        }

        const url = `https://${this.definition.host}/api/views/metadata/v1/${this.definition.resource}`;

        return Axios.get(url);
    }

    getColumns(): Promise<ColumnsPromise> {
        if (!this.definition.valid) {
            throw new Error('Invalid DatasetDefinition: Cannot fetch columns.');
        }

        const url = `https://${this.definition.host}/api/views/${this.definition.resource}.json`;

        return Axios.get(url);
    }

    getRows(soql: SoqlBuilder = null, format: ResourceFormat = 'json'): Promise {
        if (!this.definition.valid) {
            throw new Error('Invalid DatasetDefinition: Cannot fetch rows.');
        }

        const url = `https://${this.definition.host}/resource/${this.definition.resource}.${format}`;
        const params = (_.isNull(soql)) ? { $limit: 1000 } : soql.getQuery();

        return Axios.get(url, {
            params
        });
    }
}
