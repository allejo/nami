import React, { Component } from 'react';
import './App.css';
import 'tabler-ui/dist/assets/css/dashboard.css';
import { QuerySelect } from './components/query-select';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        let columns = [
            {
                name: 'Accessor Book',
                type: 'string'
            },
            {
                name: 'Tract',
                type: 'string'
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
