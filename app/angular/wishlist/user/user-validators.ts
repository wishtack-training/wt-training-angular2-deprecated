/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

import {Control} from '@angular/common';


export class UserValidators {

    static _EMAIL_REGEX = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

    static email(control: Control): {[error: string]: any} {

        if (!UserValidators._EMAIL_REGEX.test(control.value)) {
            /* Error object. */
            return {
                email: {
                    invalid: true
                }
            }
        }
        else {
            /* Success. */
            return null;
        }
    }

}
