// @flow

type AlertType = 'Success' | 'Danger' | 'Warning' | 'Info';

/**
 * The structure of an error message to display
 */
export interface IAlertMessage {
    /**
     * The severity of the error.
     */
    type: AlertType;

    /**
     * A user-friendly message describing the error.
     */
    message: string;

    /**
     * Whether or not this alert can be dismissed
     */
    dismissible: boolean;
}
