
import {Component} from '@angular/core';
import {UserSelectorComponent} from './user_selector/user-selector.component';

@Component({
    directives: [
        UserSelectorComponent
    ],
    providers: [
        UserSelectorComponent.PROVIDERS
    ],
    selector: 'wt-app',
    templateUrl: require('./wishlist.component.html')
})
export class WishlistComponent {

}
