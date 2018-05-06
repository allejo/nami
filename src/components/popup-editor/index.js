import React, { Component } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import type { ColumnDefinition } from '../../lib/socrata/column-definition';

type Props = {
    columns: Array<ColumnDefinition>,
    onPopupUpdate: (template: string) => mixed
};

type State = {
    value: string
};

const editorStyle = {
    control: {
        backgroundColor: '#fff',

        fontSize: 12,
        fontWeight: 'normal'
    },

    highlighter: {
        overflow: 'hidden'
    },

    input: {
        margin: 0
    },

    '&singleLine': {
        control: {
            display: 'inline-block',

            width: 130
        },

        highlighter: {
            padding: 1,
            border: '2px inset transparent'
        },

        input: {
            padding: 1,

            border: '2px inset'
        }
    },

    '&multiLine': {
        control: {
            fontFamily: 'monospace',

            border: '1px solid silver'
        },

        highlighter: {
            padding: 9
        },

        input: {
            padding: 9,
            minHeight: 63,
            outline: 0,
            border: 0
        }
    },

    suggestions: {
        list: {
            backgroundColor: 'white',
            border: '1px solid rgba(0,0,0,0.15)',
            fontSize: 10
        },

        item: {
            padding: '5px 15px',
            borderBottom: '1px solid rgba(0,0,0,0.15)',

            '&focused': {
                backgroundColor: '#cee4e5'
            }
        }
    }
};

const mentionStyle = {
    backgroundColor: '#cee4e5'
};

export default class PopupEditor extends Component<Props, State> {
    static defaultProps = {
        columns: []
    };

    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    }

    handleChange = e => {
        this.setState({
            value: e.target.value
        });
    };

    doUpdatePopup = () => {
        this.props.onPopupUpdate(this.state.value);
    };

    render() {
        let columns = this.props.columns.map(function(value: ColumnDefinition) {
            return {
                display: value.name,
                id: value.fieldName
            };
        });

        let displayTransform = function(id, display) {
            return `{{ ${display} }}`;
        };

        return (
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Popup Template</h2>
                </div>

                <div className="card-body">
                    <p>
                        Write out the structure you'd like popups to have for each feature. Use <code>@</code> to see a
                        list of column placeholders that'll be filled in with values for each feature.
                    </p>
                    <p>
                        <small>You may use full HTML in these popup templates.</small>
                    </p>

                    <MentionsInput
                        value={this.state.value}
                        onChange={this.handleChange}
                        displayTransform={displayTransform}
                        style={editorStyle}
                    >
                        <Mention trigger="@" data={columns} style={mentionStyle} appendSpaceOnAdd={true} />
                    </MentionsInput>
                </div>

                <div className="card-footer">
                    <button className="btn btn-primary" onClick={this.doUpdatePopup}>
                        Update Popup
                    </button>
                </div>
            </div>
        );
    }
}
