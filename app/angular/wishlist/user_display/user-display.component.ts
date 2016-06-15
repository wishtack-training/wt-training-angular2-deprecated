/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {User} from '../user/user';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'wt-user-display',
    templateUrl: require('./user-display.component.html')
})
export class UserDisplayComponent {

    @Input() user: User;

    static PROVIDERS = [];

}
