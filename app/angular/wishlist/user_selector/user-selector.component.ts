/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

import {ChangeDetectionStrategy, Component} from '@angular/core';

import {User} from '../user/user';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'wt-user-selector',
    templateUrl: require('./user-selector.component.html')
})
export class UserSelectorComponent {

    static PROVIDERS = [];

    userSelected = null;
    userList = [
        new User({
            firstName: 'Foo',
            lastName: 'BAR',
            email: 'foo.bar@wishtack.com'
        }),
        new User({
            firstName: 'Guido',
            lastName: 'VAN ROSSUM',
            email: 'guido.van-rossum@wishtack.com'
        })
    ];

    constructor() {
        this.userSelected = this.userList[0];
    }

    selectUser({user}: {user: User}) {
        this.userSelected = user;
    }

}
