import React, { Component } from 'react';
import { SelectColumn } from './column';

type Props = {};

type State = {
    columnsSelected: Array<boolean>
};

export class QuerySelect extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            columnsSelected: Array(this.props.columns.length).fill(false)
        };
    }

    handleClick = i => {
        const columns = this.state.columnsSelected.slice();
        columns[i] = !columns[i];

        this.setState({
            columnsSelected: columns
        });
    };

    render() {
        let columns = this.props.columns.map((item, index) => (
            <SelectColumn
                key={index}
                item={item}
                selected={this.state.columnsSelected[index]}
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
