import React, { Component } from 'react';
import WhereCondition from './column';
import type { ColumnDefinition } from '../../lib/socrata/column-definition';
import type { IWhereCondition } from '../../lib/query-builder/IWhereCondition';
import { Dataset } from '../../lib/socrata/dataset';

type Props = {
    dataset: Dataset,
    columns: Array<ColumnDefinition>,
    onNewFilter: () => mixed
};

type State = {
    conditions: Array<IWhereCondition>
};

export default class WhereQuery extends Component<Props, State> {
    static defaultProps = {
        columns: []
    };

    constructor(props) {
        super(props);

        this.state = {
            conditions: []
        };
    }

    handleConditionReady = condition => {
        let conditions = this.state.conditions.splice();
        conditions.push(condition);

        this.setState({
            conditions: conditions
        });
    };

    doApplyFilter = () => {
        this.props.onNewFilter(this.state.conditions);
    };

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Where Filters</h2>
                </div>

                <div className="card-body">
                    <WhereCondition
                        columns={this.props.columns}
                        dataset={this.props.dataset}
                        onConditionReady={this.handleConditionReady}
                    />
                </div>

                <div className="card-footer">
                    <button className="btn btn-primary" onClick={this.doApplyFilter}>
                        Apply Filter
                    </button>
                </div>
            </div>
        );
    }
}
