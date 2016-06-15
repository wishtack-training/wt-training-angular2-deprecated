/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnChanges} from '@angular/core';
import {Control, ControlGroup, FormBuilder, Validators} from '@angular/common';

import {UserValidators} from '../user/user-validators';
import {User} from '../user/user';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'wt-user-edit',
    templateUrl: require('./user-edit.component.html')
})
export class UserEditComponent implements OnChanges {

    @Input() disabled: boolean;
    @Input() user: User;
    @Output() userChange = new EventEmitter<User>();

    firstNameControl: Control;
    lastNameControl: Control;
    emailControl: Control;
    userControlGroup: ControlGroup;

    static PROVIDERS = [];

    constructor(private _formBuilder: FormBuilder) {
        this._buildForm();
    }

    ngOnChanges(changes) {

        /* Reset form if user changed. */
        if (changes.user != null) {
            this._buildForm({user: changes.user.currentValue});
        }

    }

    onSubmit() {

        /* Emit user to parent. */

        this.user = this.user || new User();

        /* Looping through user controls to avoid missing fields will add later. */
        Object.keys(this.userControlGroup.value).forEach(key => {
            this.user = this.user.set(key, this.userControlGroup.value[key]);
        });

        this.userChange.emit(this.user);

        this.user = null;
        this._buildForm();

    }

    private _buildForm(args?: {user: User}) {

        let user = args ? args.user : null;

        /* Initialize default values from user is present. */
        let defaultFirstName = user ? user.firstName : null;
        let defaultLastName = user ? user.lastName : null;
        let defaultEmail = user ? user.email : null;

        /* Create controls .*/
        this.firstNameControl = new Control(defaultFirstName, Validators.required);
        this.lastNameControl = new Control(defaultLastName, Validators.required);
        this.emailControl = new Control(defaultEmail, Validators.compose([
            Validators.required,
            UserValidators.email
        ]));

        /* Build form. */
        this.userControlGroup = this._formBuilder.group({
            firstName: this.firstNameControl,
            lastName: this.lastNameControl,
            email: this.emailControl
        });

    }

}
