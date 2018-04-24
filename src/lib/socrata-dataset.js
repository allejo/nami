// @flow

import Axios from 'axios';
import type { SocrataDatasetDefinition } from './socrata-dataset-definition';
import type { DatasetMetadata } from './dataset-metadata';

export interface MetadataPromise {
    data: DatasetMetadata;
}

export default class SocrataDataset {
    constructor(definition: SocrataDatasetDefinition) {
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

        const url = `https://${this.definition.host}/resource/${this.definition.resource}.json?$limit=0`;

        return Axios.get(url);
    }
}
