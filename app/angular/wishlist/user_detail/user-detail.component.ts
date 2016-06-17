/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

import {ChangeDetectionStrategy, Component, ChangeDetectorRef} from '@angular/core';
import {RouteParams, Router} from '@angular/router-deprecated';

import {User} from '../user/user';
import {UserResourceHelper} from '../user/user-resource-helper';
import {UserEditComponent} from '../user_edit/user-edit.component';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [
        UserEditComponent
    ],
    providers: [
        UserResourceHelper.PROVIDERS,
        UserEditComponent.PROVIDERS
    ],
    selector: 'wt-user-detail',
    templateUrl: require('./user-detail.component.html')
})
export class UserDetailComponent {

    user: User = null;

    constructor(
        private _changeDetector: ChangeDetectorRef,
        private _routeParams: RouteParams,
        private _router: Router,
        private _userResourceHelper: UserResourceHelper
    ) {

        this._userResourceHelper.get({userId: this._routeParams.params['userId']})
            .subscribe(user => {
                this.user = user;
                this._changeDetector.markForCheck();
            });

    }

    onUserChange(args: {user: User}) {
        this._userResourceHelper.save(args)
            .subscribe(() => {
                this._router.navigate(['../UserList']);
            });
    }

}
