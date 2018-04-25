// @flow

/**
 * The structure of the metadata a Socrata's dataset has.
 *
 * @link https://socratametadataapi.docs.apiary.io/#introduction/available-metadata
 */
export interface DatasetMetadata {
    /**
     * The unique identifier for the asset (xxxx-xxxx)
     */
    id: string;

    /**
     * The site the asset belongs to
     */
    domain: string;

    /**
     * The full URI to the /resource/ endpoint, a.k.a the SODA API endpoint (see here for more information)
     */
    dataUri: string;

    /**
     * The URI to the human-readable representation of this asset
     */
    webUri: string;

    /**
     * The timestamp at which the asset was created (ISO-8601)
     */
    createdAt: string;

    /**
     * The timestamp at which the asset's data or metadata was last updated (ISO-8601)
     */
    updatedAt: string;

    /**
     * The timestamp at which the asset's data was last updated (ISO-8601)
     */
    dataUpdatedAt: string;

    /**
     * The timestamp at which the asset's metadata was last updated (ISO-8601)
     */
    metadataUpdatedAt: string;

    /**
     * The provenance of the asset, i.e. "OFFICIAL" or "COMMUNITY" (indicating whether this asset is owned by a member of the publishing organization, or a member of the community)
     */
    provenance: string;

    /**
     * Whether this asset is explicitly omitted from the domain's public catalog
     */
    hideFromCatalog: boolean;

    /**
     * Whether this asset is explicitly omitted from the domain's /data.json file (which lists a site's public assets according to the Project Open Data Metadata schema, for federation into Data.gov
     */
    hideFromDataJson: boolean;

    /**
     * The title of the asset
     */
    name: string;

    /**
     * The description for the asset, if one has been provided
     */
    description: string;

    /**
     * The asset's category classification
     */
    category: string;

    /**
     * An array of tags given to the asset
     */
    tags: Array<string>;

    /**
     * The license that is used for this asset (available options)
     */
    license: string;

    /**
     * The attribution of the asset, if one has been provided
     */
    attribution: string;

    /**
     * The source or attribution URL for this asset
     */
    attributionLink: string;

    /**
     * The identifier of the external asset, if this asset is an 'External Dataset' which links to an asset hosted elsewhere
     */
    externalId: string;

    /**
     * An additional set of custom fields configured by the publishing organization
     */
    customFields: Object;
}
