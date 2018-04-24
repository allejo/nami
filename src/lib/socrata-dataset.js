// @flow

import Axios from 'axios';
import type { SocrataDatasetDefinition } from './socrata-dataset-definition';

export default class SocrataDataset {
    constructor(definition: SocrataDatasetDefinition) {
        this.definition = definition;
    }

    getMetadata() {
        if (!this.definition.valid) {
            throw new Error('Invalid SocrataDatasetDefinition: Cannot fetch metadata.');
        }

        const url = `https://${this.definition.host}/api/views/metadata/v1/${this.definition.resource}`;

        return Axios.get(url);
    }
}
