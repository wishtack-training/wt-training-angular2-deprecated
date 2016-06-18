/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

import {ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef} from '@angular/core';

import {User} from '../user/user';
import {UserDisplayComponent} from '../user_display/user-display.component';
import {UserEditComponent} from '../user_edit/user-edit.component';
import {UserResourceHelper} from '../user/user-resource-helper';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [
        UserDisplayComponent,
        UserEditComponent
    ],
    providers: UserListComponent.PROVIDERS,
    selector: 'wt-user-list',
    templateUrl: require('./user-list.component.html')
})
export class UserListComponent implements OnInit {

    static PROVIDERS = [
        UserDisplayComponent.PROVIDERS,
        UserEditComponent.PROVIDERS,
        UserResourceHelper.PROVIDERS
    ];

    formDisabled: boolean = false;
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

    constructor(
        private _changeDetector: ChangeDetectorRef,
        private _userResourceHelper: UserResourceHelper
    ) {
    }

    ngOnInit() {
        this._userResourceHelper.list()
            .subscribe(userList => {

                this.userList = userList;

                this._changeDetector.markForCheck();

            });
    }

    onUserAdd({user}: {user: User}) {

        this.formDisabled = true;

        this._userResourceHelper.save({user: user})
            .finally(() => {

                this.formDisabled = false;

                /* Marking for check. */
                this._changeDetector.markForCheck();

            })
            .subscribe((user: User) => {

                this.userList.push(user);

                this.editedUser = null;

            });

    }

    removeUser({user}: {user: User}) {

        this._userResourceHelper.delete({user: user})
            .subscribe(() => {

                /* Removing user from list. */
                this.userList = this.userList.filter(u => u !== user);

                /* Marking for check. */
                this._changeDetector.markForCheck();

            });

    }

}
