
import {Component} from '@angular/core';
import {ROUTER_PROVIDERS, RouteConfig} from '@angular/router-deprecated';

import {wishlistRouteList} from './wishlist.routes';


@Component({
    directives: [],
    providers: [
        ROUTER_PROVIDERS
    ],
    selector: 'wt-app',
    templateUrl: require('./wishlist.component.html')
})
@RouteConfig(wishlistRouteList)
export class WishlistComponent {
}
