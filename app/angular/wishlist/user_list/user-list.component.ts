/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

import {ChangeDetectionStrategy, Component} from '@angular/core';
import * as Immutable from 'immutable';

import {User} from '../user/user';
import {UserDisplayComponent} from '../user_display/user-display.component';
import {UserEditComponent} from '../user_edit/user-edit';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [
        UserDisplayComponent,
        UserEditComponent
    ],
    selector: 'wt-user-list',
    templateUrl: require('./user-list.component.html')
})
export class UserListComponent {

    static PROVIDERS = [
        UserDisplayComponent.PROVIDERS,
        UserEditComponent.PROVIDERS
    ];

    editedUser: User = null;

    userList: User[] = [
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

    editUser({user}: {user: User}) {
        this.editedUser = user;
    }

    onUserChange({user}: {user: User}) {

        let foundUser = this.userList.find(u => u.id === user.id);

        /* Update user if it's in the list. */
        if (foundUser != null) {
            this.userList = this.userList.map(u => (u.id === user.id) ? user : u);
        }

        /* Add user if it's a new user. */
        else {
            this.userList.push(user);
        }

        this.editedUser = null;

    }

    removeUser({user}: {user: User}) {
        this.userList = this.userList.filter(u => u !== user);
    }

}
