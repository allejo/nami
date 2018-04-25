// @flow

import React, { Component } from 'react';
import type { ColumnDefinition } from '../../lib/socrata/column-definition';
import Select from 'react-select';

type Props = {
    columns: Array<ColumnDefinition>
};

type State = {
    column?: ColumnDefinition,
    matcher: string,
    value: any
};

type ComparisonOperator = '=' | '!=' | '>' | '>=' | '<' | '<=' | 'like' | 'not like';
type BooleanOperator = 'is null' | 'is not null';

export default class WhereCondition extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            column: null,
            matcher: '',
            value: null
        };
    }

    handleChange = selection => {
        this.setState({
            column: selection
        });
    };

    render() {
        let columns = this.props.columns.map(function(value) {
            return {
                value: value,
                label: value.name
            };
        });

        return (
            <div>
                <Select options={columns} onChange={this.handleChange} value={this.state.column} />
            </div>
        );
    }
}
