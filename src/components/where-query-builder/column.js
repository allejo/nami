// @flow

import * as _ from 'lodash';
import React, { Component } from 'react';
import Select from 'react-select';
import type { ColumnDefinition } from '../../lib/socrata/column-definition';
import type { IWhereCondition } from '../../lib/query-builder/IWhereCondition';

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
    columns: Array<ColumnDefinition>,
    onConditionReady: () => mixed
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
        this.setState({
            column: selection
        });

        this._maybeSubmitReady();
    };

    handleOperatorChange = (selection: SoqlOperator) => {
        this.setState({
            operator: selection
        });

        this._maybeSubmitReady();
    };

    handleValueChange = e => {
        this.setState({
            value: e.target.value
        });

        this._maybeSubmitReady();
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

        _.each(SoqlOperators, function(operator: SoqlOperator) {
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

    render() {
        const columns = this.props.columns.map(function(value) {
            return {
                value: value,
                label: value.name
            };
        });

        return (
            <div>
                <div className="row mb-3">
                    <div className="col-sm-9">
                        <Select options={columns} onChange={this.handleColumnChange} value={this.state.column} />
                    </div>
                    <div className="col-sm-3">
                        <Select
                            options={this._getOperatorsToDisplay()}
                            onChange={this.handleOperatorChange}
                            value={this.state.operator}
                        />
                    </div>
                </div>

                <div className="form-group mb-0">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Column value..."
                        value={this.state.value}
                        onChange={this.handleValueChange}
                    />
                </div>
            </div>
        );
    }
}
