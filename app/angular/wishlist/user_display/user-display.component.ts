/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {User} from '../user/user';
import {UserNamePipe} from '../user/user-name.pipe';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    pipes: [UserNamePipe],
    selector: 'wt-user-display',
    templateUrl: require('./user-display.component.html')
})
export class UserDisplayComponent {

    @Input() user: User;

    static PROVIDERS = [
        UserNamePipe.PROVIDERS
    ];

}
