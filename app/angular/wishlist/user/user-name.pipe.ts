/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

import {Pipe, PipeTransform} from '@angular/core';

/* @hack: should be imported like this: import * as _ from 'lodash' but typings seem broken as `truncate` does not exist. */
const _ = require('lodash');

import {User} from './user';


@Pipe({
    name: 'wtUserName'
})
export class UserNamePipe implements PipeTransform {

    static PROVIDERS = [];

    transform(user: User) {

        let truncateOptions = {
            length: 10,
            omission: '...'
        };
        let firstName = _.truncate(user.firstName, truncateOptions);
        let lastName = _.truncate(user.lastName, truncateOptions);

        firstName = _.capitalize(firstName);
        lastName = lastName.toUpperCase();

        return `${firstName} ${lastName}`;

    }

}