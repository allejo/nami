// @flow

import React, { Component } from 'react';
import type { ColumnDefinition } from '../../lib/socrata/column-definition';

type Props = {
    item: ColumnDefinition,
    clicked: () => mixed
};

export class SelectColumn extends Component<Props> {
    render() {
        return (
            <div className="row">
                <div className="col-md-auto">
                    <input type="checkbox" value={false} onChange={this.props.clicked} />
                </div>

                <div className="col-md">
                    <span>
                        {this.props.item.name} ({this.props.item.dataTypeName})
                    </span>
                    <p>{this.props.item.description}</p>
                </div>
            </div>
        );
    }
}
