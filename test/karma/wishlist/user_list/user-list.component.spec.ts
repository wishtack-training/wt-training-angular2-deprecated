/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

import {provide} from '@angular/core';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {beforeEach, beforeEachProviders, describe, inject, it, tick, fakeAsync} from '@angular/core/testing';
import {ResponseOptions, Response, RequestOptions, Http, RequestMethod} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {By} from '@angular/platform-browser';
import {dispatchEvent} from '@angular/platform-browser/testing';

import {UserDisplayComponent} from '../../../../app/angular/wishlist/user_display/user-display.component';
import {UserEditComponent} from '../../../../app/angular/wishlist/user_edit/user-edit.component';
import {UserListComponent} from '../../../../app/angular/wishlist/user_list/user-list.component';


describe('wt-user-list component', () => {

    let spyConnection = null;

    /* @hack: Avoid using templateUrl and http requests. */
    let userDisplayTemplate = require('!raw-loader!../../../../app/angular/wishlist/user_display/user-display.component.html');
    let userEditTemplate = require('!raw-loader!../../../../app/angular/wishlist/user_edit/user-edit.component.html');

    /* @hack: Hack to disable routerLink directive. */
    let userListTemplate = require('!raw-loader!../../../../app/angular/wishlist/user_list/user-list.component.html')
        .replace('[routerLink]', 'routerLink');


    beforeEachProviders(() => [
        MockBackend,
        TestComponentBuilder,
    ]);

    beforeEach(inject([MockBackend], (mockBackend:MockBackend) => {

        mockBackend.connections.subscribe((connection:MockConnection) => {
            connection.mockRespond(new Response(new ResponseOptions(spyConnection({
                body: connection.request.text(),
                method: connection.request.method,
                url: connection.request.url
            }))));
        });

    }));

    beforeEach(inject([TestComponentBuilder], (testComponentBuilder: TestComponentBuilder) => {
        this.testComponentBuilder = testComponentBuilder
            // @hack https://github.com/angular/angular/issues/8306
            // .overrideTemplate(UserDisplayComponent, userDisplayTemplate)
            .overrideTemplate(UserEditComponent, userEditTemplate)
            .overrideTemplate(UserListComponent, userListTemplate)
            .overrideViewProviders(UserListComponent, [
                provide(Http, {
                    deps: [MockBackend, RequestOptions],
                    useFactory: (mockBackend, requestOptions) => {
                        return new Http(mockBackend, requestOptions);
                    }
                })
            ]);

    }));

    it('should load user list', fakeAsync(() => {

        let elementList = null;
        let fixture: ComponentFixture<UserListComponent> = null;

        spyConnection = jasmine.createSpy('connection');
        spyConnection.and.returnValue({
            body: {
                objects: [
                    {
                        id: 'USER_ID_1',
                        firstName: 'fOO',
                        lastName: 'bar',
                        email: 'foo.bar@wishtack.com'
                    },
                    {
                        id: 'USER_ID_2',
                        firstName: 'john',
                        lastName: 'woo',
                        email: 'john.woo@wishtack.com'
                    }
                ]
            },
            status: 200
        });

        fixture = this.testComponentBuilder
            .createFakeAsync(UserListComponent);

        fixture.detectChanges();

        elementList = fixture.debugElement.queryAll(By.css('wt-user-display'));

        expect(elementList.length).toEqual(2);
        expect(elementList[0].nativeElement.innerText.trim()).toEqual('Foo BAR foo.bar@wishtack.com');
        expect(elementList[1].nativeElement.innerText.trim()).toEqual('John WOO john.woo@wishtack.com');

        expect(spyConnection.calls.count()).toEqual(1);

        expect(spyConnection).toHaveBeenCalledWith({
            body: '',
            method: RequestMethod.Get,
            url: '/api/v1/users/'
        });

        /* @hack: Avoiding 'periodic timer(s) still in the queue' error due to rxjs timeout operator. */
        tick(5000);

        fixture.destroy();

    }));

    it('should add user', fakeAsync(() => {

        let elementList = null;
        let fixture: ComponentFixture<UserListComponent> = null;
        let input = null;
        let inputDict = {
            firstName: 'Guido',
            lastName: 'VAN ROSSUM',
            email: 'guido@python.org'
        };

        spyConnection = jasmine.createSpy('connection');
        spyConnection.and.returnValue({
            body: {
                objects: [
                    {
                        id: 'USER_ID_1',
                        firstName: 'fOO',
                        lastName: 'bar',
                        email: 'foo.bar@wishtack.com'
                    },
                    {
                        id: 'USER_ID_2',
                        firstName: 'john',
                        lastName: 'woo',
                        email: 'john.woo@wishtack.com'
                    }
                ]
            },
            status: 200
        });

        fixture = this.testComponentBuilder
            .createFakeAsync(UserListComponent);

        fixture.detectChanges();

        spyConnection = jasmine.createSpy('connection');
        spyConnection.and.returnValue({
            status: 200,
            body: {
                id: 'USER_ID_3',
                firstName: 'Guido',
                lastName: 'VAN ROSSUM',
                email: 'guido@python.org'
            }
        });

        /* Add user. */
        Object.keys(inputDict).forEach(key => {
            input = fixture.debugElement.query(By.css(`input[name="${key}"]`)).nativeElement;
            input.value = inputDict[key];
            dispatchEvent(input, 'input');
        });

        /* Update form status after validation. */
        fixture.detectChanges();

        dispatchEvent(fixture.debugElement.query(By.css('wt-user-edit form button[type="submit"]')).nativeElement, 'click');
        dispatchEvent(fixture.debugElement.query(By.css('wt-user-edit form')).nativeElement, 'submit');

        tick();

        expect(spyConnection.calls.count()).toEqual(1);

        expect(spyConnection).toHaveBeenCalledWith({
            body: JSON.stringify({
                id: null,
                firstName: 'Guido',
                lastName: 'VAN ROSSUM',
                email: 'guido@python.org'
            }),
            method: RequestMethod.Post,
            url: '/api/v1/users/'
        });

        /* Trigger change detection. */
        fixture.detectChanges();

        /* Check user list. */
        elementList = fixture.debugElement.queryAll(By.css('wt-user-display'));

        expect(elementList.length).toEqual(3);
        expect(elementList[0].nativeElement.innerText.trim()).toEqual('Foo BAR foo.bar@wishtack.com');
        expect(elementList[1].nativeElement.innerText.trim()).toEqual('John WOO john.woo@wishtack.com');
        expect(elementList[2].nativeElement.innerText.trim()).toEqual('Guido VAN ROSSUM guido@python.org');

        /* @hack: Avoiding 'periodic timer(s) still in the queue' error due to rxjs timeout operator. */
        tick(5000);

        fixture.destroy();

    }));

});