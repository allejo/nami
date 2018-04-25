import React, { Component } from 'react';
import type { ColumnDefinition } from '../../lib/socrata/column-definition';
import WhereCondition from './column';

type Props = {
    columns: Array<ColumnDefinition>
};

type State = {};

export default class WhereQuery extends Component<Props, State> {
    static defaultProps = {
        columns: []
    };

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Where Filters</h2>
                </div>

                <div className="card-body">
                    <WhereCondition columns={this.props.columns} />
                </div>
            </div>
        );
    }
}
