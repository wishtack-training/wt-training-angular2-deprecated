/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

import {Injectable} from '@angular/core';
import {HTTP_PROVIDERS, Http} from '@angular/http';

import {ResourceHelper} from './resource-helper.ts';


@Injectable()
export class ResourceHelperFactory {

    static PROVIDERS = [ResourceHelperFactory, HTTP_PROVIDERS];

    constructor(private _http: Http) {
    }

    create({
        resourceName,
        type
    }: {
        resourceName: string,
        type: any
    }) : ResourceHelper {
        return new ResourceHelper({
            http: this._http,
            resourceName: resourceName,
            type: type
        })
    }

}
