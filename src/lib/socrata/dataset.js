// @flow

import Axios from 'axios';
import type { DatasetDefinition } from './dataset-definition';
import type { DatasetMetadata } from './dataset-metadata';

export interface MetadataPromise {
    data: DatasetMetadata;
}

export class Dataset {
    constructor(definition: DatasetDefinition) {
        this.definition = definition;
    }

    getMetadata(): Promise<MetadataPromise> {
        if (!this.definition.valid) {
            throw new Error('Invalid SocrataDatasetDefinition: Cannot fetch metadata.');
        }

        const url = `https://${this.definition.host}/api/views/metadata/v1/${this.definition.resource}`;

        return Axios.get(url);
    }

    getColumns(): Promise {
        if (!this.definition.valid) {
            throw new Error('Invalid SocrataDatasetDefinition: Cannot fetch columns.');
        }

        const url = `https://${this.definition.host}/api/views/${this.definition.resource}.json`;

        return Axios.get(url);
    }
}
