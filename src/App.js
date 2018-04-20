// @flow

import React, { Component } from 'react';
import './App.css';
import 'tabler-ui/dist/assets/css/dashboard.css';
import { QuerySelect } from './components/query-select';
import type { SocrataColumn } from './lib/socrata-column';

type Props = {};
type State = {
    dataset: {
        host: string,
        resource: string
    }
};

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            dataset: {
                host: 'data.lacity.org',
                resource: 'yv23-pmwf'
            }
        };
    }

    render() {
        let columns: Array<SocrataColumn> = [
            {
                name: 'Accessor Book',
                api_name: 'accessor_book',
                type: 'Text'
            },
            {
                name: 'Tract',
                api_name: 'tract',
                type: 'Double'
            }
        ];

        return (
            <div className="container">
                <QuerySelect columns={columns} />
            </div>
        );
    }
}

export default App;
