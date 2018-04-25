// @flow

export interface ColumnDefinition {
    /**
     * The ID for the column
     */
    id: number;

    /**
     * The human understandable name for this column
     */
    name: string;

    /**
     * The data type of the column
     */
    dataTypeName: string;

    /**
     * A description of the column content
     */
    description: string;

    /**
     * The slugified name of the column used in API calls
     */
    fieldName: string;
}
