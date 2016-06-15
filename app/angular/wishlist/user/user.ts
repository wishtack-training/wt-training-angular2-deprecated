/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

import {Record} from 'immutable';


/* This is the list of available properties and their default values. */
let UserRecord = Record({
    id: null,
    firstName: null,
    lastName: null,
    email: null
});

export class User extends UserRecord {

    constructor(args?: {
        id?: string,
        firstName?: string,
        lastName?: string,
        email?: string
    }) {

        args = args || {};

        super(args);

    }

    get id(): string { return this.get('id'); }
    setId(value: string): User { return this.set('id', value); }

    get firstName(): string { return this.get('firstName'); }
    setFirstName(value: string): User {return <User>this.set('firstName', value); }

    get lastName(): string { return this.get('lastName'); }
    setLastName(value: string): User { return <User>this.set('lastName', value); }

    get email(): string { return this.get('email'); }
    setEmail(value: string): User { return <User>this.set('email', value); }

    set(key: string, value: string) { return <User>super.set(key, value); }

    /* This will be overriden by `Resource`. */
    save() {}

}
