
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/timeout';

import {bootstrap} from '@angular/platform-browser-dynamic';

import {WishlistComponent} from './wishlist/wishlist.component';

bootstrap(WishlistComponent);
