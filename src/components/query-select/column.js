// @flow

import React, { Component } from 'react';
import type { SocrataColumn } from '../../lib/socrata-column';

type Props = {
    item: SocrataColumn,
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
                        {this.props.item.name} ({this.props.item.type})
                    </span>
                </div>
            </div>
        );
    }
}
