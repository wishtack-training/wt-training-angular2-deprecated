/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

export class User {

    firstName: string;
    lastName: string;
    email: string;

    constructor({firstName, lastName, email}: {firstName?: string, lastName?: string, email?: string}) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

}
