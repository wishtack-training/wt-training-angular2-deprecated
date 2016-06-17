/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {ResourceHelper} from '../common/resource-helper';
import {ResourceHelperFactory} from '../common/resource-helper-factory';
import {User} from './user';


@Injectable()
export class UserResourceHelper {

    static PROVIDERS = [
        UserResourceHelper,
        ResourceHelperFactory.PROVIDERS
    ];

    _resourceHelper: ResourceHelper;

    constructor(resourceHelperFactory: ResourceHelperFactory) {
        this._resourceHelper = resourceHelperFactory.create({resourceName: 'users', type: User});
    }

    delete({user}: {user: User}): Observable<any> {
        return this._resourceHelper.delete({resource: user});
    }

    get({userId}: {userId: string}): Observable<User> {
        return this._resourceHelper.get({resourceId: userId});
    }

    list(): Observable<User[]> {
        return this._resourceHelper.list();
    }

    save({user}: {user: User}): Observable<User> {
        return this._resourceHelper.save({resource: user});
    }

}
