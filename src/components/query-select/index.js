// @flow

import React, { Component } from 'react';
import { SelectColumn } from './column';
import type { SocrataColumn } from '../../lib/socrata-column';

type Props = {
    columns: Array<SocrataColumn>
};

type State = {
    selectedColumns: Array<boolean>
};

export class QuerySelect extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selectedColumns: Array(this.props.columns.length).fill(false)
        };
    }

    handleClick = (i: number) => {
        const columns = this.state.selectedColumns.slice();
        columns[i] = !columns[i];

        this.setState({
            selectedColumns: columns
        });
    };

    render() {
        let columns = this.props.columns.map((item: SocrataColumn, index: number) => (
            <SelectColumn
                key={index}
                item={item}
                selected={this.state.selectedColumns[index]}
                clicked={() => this.handleClick(index)}
            />
        ));

        return (
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Select Columns</h2>
                </div>

                <div className="card-body">{columns}</div>
            </div>
        );
    }
}
