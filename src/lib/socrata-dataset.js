// @flow

export interface SocrataDataset {
    /**
     * Whether or not this dataset is valid
     */
    valid: boolean;

    /**
     * The domain for the dataset
     */
    host: string;

    /**
     * The 4x4 ID for the dataset
     */
    resource: string;
}
