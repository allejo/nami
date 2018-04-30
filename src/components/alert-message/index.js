// @flow

import React, { Component } from 'react';
import type { IAlertMessage } from '../../lib/IAlertMessage';

type Props = {
    error: IAlertMessage
};

export default class AlertMessage extends Component<Props> {
    render() {
        let error = this.props.error;

        let classes = ['alert', `alert-${error.type.toLowerCase()}`];
        error.dismissible && classes.push('alert-dismissible');

        let icon = '';
        if (error.type === 'Danger') {
            icon = 'alert-octagon';
        } else if (error.type === 'Info') {
            icon = 'info';
        } else if (error.type === 'Success') {
            icon = 'circle-check';
        } else if (error.type === 'Warning') {
            icon = 'alert-triangle';
        }

        return (
            <div className={classes.join(' ')} role="alert">
                {error.dismissible && <button type="button" className="close" data-dismiss="alert" />}

                {icon.length > 0 && <i className={`fe fe-${icon} mr-2`} aria-hidden="true" />}

                {error.message}
            </div>
        );
    }
}
