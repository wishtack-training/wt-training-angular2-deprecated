/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

import {UserListComponent} from './user_list/user-list.component';


export const wishlistRouteList = [
    {
        loader: () => require('es6-promise!./user_detail/user-detail.component')('UserDetailComponent'),
        name: 'UserDetail',
        path: '/users/:userId'
    },
    {
        loader: () => require('es6-promise!./user_list/user-list.component')('UserListComponent'),
        name: 'UserList',
        path: '/users',
        useAsDefault: true
    }
];