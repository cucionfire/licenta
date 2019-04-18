import 'rxjs'

import { Headers, Http, Response } from '@angular/http';

import { BaseHttpService } from './../common/base-http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: BaseHttpService) {
        // set token if saved in local storage
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(user: Object) {
        return this.http.doPost('user/login', "server", user)
            .then(response => {
                if (response && response.error === false) {
                    this.token = response.LoginID;
                    sessionStorage.setItem('auth_token', '' + this.token);
                    return true;
                } else {
                    return false;
                }
            });
    }

    logout() {
        return this.http.doPost("user/doLogout", "server", { LoginID: sessionStorage.getItem('auth_token') }).then(data => {
            sessionStorage.removeItem('auth_token');
        })
    }
}