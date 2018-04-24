// @flow

type SocrataColumnType =
    | 'Checkbox'
    | 'Double'
    | 'Line'
    | 'Location'
    | 'Money'
    | 'MultiLine'
    | 'MultiPoint'
    | 'MultiPolygon'
    | 'Number'
    | 'Point'
    | 'Polygon'
    | 'Text'
    | 'Timestamp';

export interface SocrataColumn {
    /**
     * The human understandable name for this column
     */
    name: string;

    /**
     * The column name used in API calls
     */
    api_name: string;

    /**
     * The type of column
     */
    type: SocrataColumnType;
}
