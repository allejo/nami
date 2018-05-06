import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <footer className="border-top py-5">
                <div className="row">
                    <div className="col-md-6">Copyright &copy; {new Date().getFullYear()}</div>
                    <div className="col-md-6 text-md-right">
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href="https://www.allejo.io">Author</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://github.com/allejo/soda-fizz-buzz">GitHub</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        );
    }
}
