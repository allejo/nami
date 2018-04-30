// @flow

import type { ColumnDefinition } from '../socrata/column-definition';

export interface IWhereCondition {
    column?: ColumnDefinition;
    operator?: SoqlOperator;
    value: any;
}
