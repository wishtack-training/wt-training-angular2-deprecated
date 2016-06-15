/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";


export class ResourceHelper {

    _http: Http;
    _resourceName: String;
    _type;

    constructor(
        args: {
            http: Http,
            resourceName: String,
            type
        }
    ) {
        this._http = args.http;
        this._resourceName = args.resourceName;
        this._type = args.type;
    }

    delete({resource}: {resource: {id: string}}): Observable<any> {
        return this._http.delete(this._resourcePath({resource: resource}));
    }

    list(): Observable<any[]> {

        return this._transformObservable({observable: this._http.get(this._resourceListPath())})
            .map(data => data['objects'])
            .map(itemList => {
                return itemList.map(this._convertToObject.bind(this))
            });

    }

    save({resource}: {resource: {id: string}}): Observable<any> {

        let observable: Observable<Response> = null;
        let body = JSON.stringify(resource);
        let options = {
            headers: new Headers({
                'content-type': 'application/json'
            })
        };

        if (resource.id != null) {
            observable = this._http.put(this._resourcePath({resource: resource}), body, options);
        }
        else {
            observable = this._http.post(this._resourceListPath(), body, options);
        }

        observable = this._transformObservable({observable: observable});
        return observable
            .map(this._convertToObject.bind(this));

    }

    private _convertToObject(data: {[key: string]: string}) {
        return new (this._type)(data);
    }

    private _parseResponse(response: Response): any {

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Bad response status: ${response.status}`)
        }

        return response.json();

    }

    private _resourcePath({resource}: {resource: any}) {
        return `${this._resourceListPath()}${resource.id}/`;
    }

    private _resourceListPath() {
        return `/api/v1/${this._resourceName}/`;
    }

    private _transformObservable({observable}: {observable: Observable<Response>}) {

        return observable
            .retryWhen(errors => {
                console.log(errors);
                return errors.delay(1000);
            })
            .timeout(5000, new Error('Timeout!'))
            .map(this._parseResponse);

    }

}