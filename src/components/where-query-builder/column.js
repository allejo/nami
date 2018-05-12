import forEach from 'lodash.foreach';
import React, { Component } from 'react';
import Select from 'react-select';
import type { ColumnDefinition } from '../../lib/socrata/column-definition';
import type { IWhereCondition } from '../../lib/query-builder/IWhereCondition';
import SoqlBuilder from '../../lib/soql/soql-builder';
import { Dataset } from '../../lib/socrata/dataset';

type SoqlOperator = {
    literal: '',
    supportsEverything: boolean,
    supportedFieldCount: number,
    supportedTypes?: Array<string>
};

const SoqlOperators: Array<SoqlOperator> = [
    {
        literal: 'is null',
        supportsEverything: true,
        supportedFieldCount: 0
    },
    {
        literal: 'is not null',
        supportsEverything: true,
        supportedFieldCount: 0
    },
    {
        literal: '=',
        supportsEverything: true,
        supportedFieldCount: 1
    },
    {
        literal: '!=',
        supportsEverything: true,
        supportedFieldCount: 1
    },
    {
        literal: '>',
        supportsEverything: true,
        supportedFieldCount: 1
    },
    {
        literal: '>=',
        supportsEverything: true,
        supportedFieldCount: 1
    },
    {
        literal: '<',
        supportsEverything: true,
        supportedFieldCount: 1
    },
    {
        literal: '<=',
        supportsEverything: true,
        supportedFieldCount: 1
    },
    {
        literal: 'like',
        supportsEverything: false,
        supportedFieldCount: 1,
        supportedTypes: ['text']
    },
    {
        literal: 'not like',
        supportsEverything: false,
        supportedFieldCount: 1,
        supportedTypes: ['text']
    }
];

type Props = {
    dataset: Dataset,
    columns: Array<ColumnDefinition>,
    onConditionReady: () => mixed,
    onClearCondition: () => mixed
};

export default class WhereCondition extends Component<Props, IWhereCondition> {
    constructor(props) {
        super(props);

        this.state = {
            column: null,
            operator: null,
            value: ''
        };
    }

    handleColumnChange = (selection: ColumnDefinition) => {
        this.setState(
            {
                column: selection
            },
            () => {
                this._maybeSubmitReady();
            }
        );
    };

    handleOperatorChange = (selection: SoqlOperator) => {
        this.setState(
            {
                operator: selection
            },
            () => {
                this._maybeSubmitReady();
            }
        );
    };

    handleValueChange = e => {
        this.setState(
            {
                value: e
            },
            () => {
                this._maybeSubmitReady();
            }
        );
    };

    handleClearAll = () => {
        this.setState(
            {
                column: null,
                operator: null,
                value: ''
            },
            () => {
                this.props.onClearCondition();
            }
        );
    };

    _maybeSubmitReady = () => {
        let condition = this.state;

        if (condition.column === null || condition.operator === null) {
            return false;
        }

        if (condition.value && condition.value.length === 0 && condition.operator.supportedFieldCount > 0) {
            return false;
        }

        this.props.onConditionReady(condition);

        return true;
    };

    _getOperatorsToDisplay = () => {
        const col = this.state.column;
        let operatorsToDisplay = [];

        forEach(SoqlOperators, function(operator: SoqlOperator) {
            const def = {
                label: operator.literal,
                value: operator
            };

            if (
                operator.supportsEverything ||
                (col !== null && operator.supportedTypes.indexOf(col.dataTypeName) >= 0)
            ) {
                operatorsToDisplay.push(def);
            }
        });

        return operatorsToDisplay;
    };

    _getColumnValues = () => {
        let dataset = this.props.dataset;
        let field = this.state.column.value.fieldName;
        let soql = new SoqlBuilder();

        soql
            .select({
                field: field
            })
            .where(`${field} IS NOT NULL`)
            .groupBy(field)
            .orderBy('field');

        return dataset.getRows(soql, 'json').then(function(json) {
            return {
                options: json.data
            };
        });
    };

    render() {
        const columns = this.props.columns.map(function(value) {
            return {
                value: value,
                label: value.name
            };
        });

        return (
            <div className="d-flex align-items-center">
                <div className="w-100">
                    <div className="row">
                        <div className="col-sm-9">
                            <Select options={columns} onChange={this.handleColumnChange} value={this.state.column} />
                        </div>
                        <div className="col-sm-3 pl-0">
                            <Select
                                options={this._getOperatorsToDisplay()}
                                onChange={this.handleOperatorChange}
                                value={this.state.operator}
                            />
                        </div>
                    </div>

                    {this.state.column && (
                        <div className="form-group mt-3 mb-0">
                            <Select.AsyncCreatable
                                multi={false}
                                value={this.state.value}
                                onChange={this.handleValueChange}
                                valueKey="id"
                                labelKey="field"
                                loadOptions={this._getColumnValues}
                                backspaceRemoves={true}
                            />
                        </div>
                    )}
                </div>
                <div className="text-danger pl-2" title="Clear filter">
                    <i className="fe fe-x" aria-hidden="false" onClick={this.handleClearAll} />
                </div>
            </div>
        );
    }
}
