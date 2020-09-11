import Axios from 'axios';
import SoqlBuilder from '../soql/soql-builder';
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

/**
 * A class representation of a Socrata dataset.
 */
export class Dataset {
    constructor(definition: DatasetDefinition) {
        this.definition = definition;
    }

    /**
     * Initialize the dataset object to be ready for use.
     *
     * This method will analyze the given dataset and check its backend. If it's using the old 2.0 backend, then it will
     * be updated to use the 2.1 backend.
     *
     * @returns {Promise<void>}
     */
    async initDataset() {
        if (!this.definition.valid) {
            throw new Error('Invalid Dataset URL: Cannot initialize dataset.');
        }
    }

    /**
     * Get the metadata belonging to this dataset.
     *
     * @returns {AxiosPromise<MetadataPromise>}
     */
    getMetadata(): Promise<MetadataPromise> {
        if (!this.definition.valid) {
            throw new Error('Invalid Dataset URL: Cannot fetch metadata.');
        }

        const url = `https://${this.definition.host}/api/views/metadata/v1/${this.definition.resource}`;

        return Axios.get(url);
    }

    /**
     * Get a dataset's column structure.
     *
     * @returns {AxiosPromise<ColumnsPromise>}
     */
    getColumns(): Promise<ColumnsPromise> {
        if (!this.definition.valid) {
            throw new Error('Invalid Dataset URL: Cannot fetch columns.');
        }

        // An older (maybe deprecated?) and now undocumented API endpoint that used for a dataset's metadata. This
        // endpoint will return the columns structure whereas the new "official" endpoint doesn't.

        const url = `https://${this.definition.host}/api/views/${this.definition.resource}.json`;

        return Axios.get(url);
    }

    /**
     * Get the dataset's rows.
     *
     * @param soql
     * @param format
     *
     * @returns {AxiosPromise<any>}
     */
    getRows(soql: SoqlBuilder = null, format: ResourceFormat = 'json'): Promise {
        if (!this.definition.valid) {
            throw new Error('Invalid Dataset URL: Cannot fetch rows.');
        }

        const url = `https://${this.definition.host}/resource/${this.definition.resource}.${format}`;
        const params = soql === null ? { $limit: 1000 } : soql.getQuery();

        return Axios.get(url, {
            params
        });
    }
}
