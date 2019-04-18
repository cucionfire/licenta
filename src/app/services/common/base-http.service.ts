import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';

declare var java_api_base_url: any;
declare var Materialize: any;

@Injectable()
export class BaseHttpService {

    private storageName = 'http_error';

    private connectionKey = 'default';

    private type = '';

    private options;

    private sessionKey = 'sessionID';

    constructor(private http: Http, private ar: Router) {
        this.http = http;
        this.ar = ar;
    }

    setConnectionKey(key: string) {
        this.connectionKey = key;
    }


    prepareRequest(type) {
        const headers = new Headers();
        headers.append('LoginID', sessionStorage.getItem('auth_token'));
        this.options = new RequestOptions({ headers });
        this.type = type;
        const keyUrl = this.ar.url.replace('/', '-').substring(1);
        if (keyUrl.length < 2) {
            this.connectionKey = 'default';
        } else {
            if (this.connectionKey !== 'default') {
            } else {
                this.connectionKey = keyUrl;
            }
        }
    }

    /// start old do get
    doGet(url, type, data, process = false) {
        this.prepareRequest(type);
        if (process) {
            return this.http.get(this.getPrefix(type) + url, { search: this.getParams(data) }).toPromise().then(res => (<any>data._body))
                .then(data => {
                    this.onSuccess();
                    return data;
                }, error => {
                    this.processError(error);
                    return error;
                });
        } else {
            return this.http.get(this.getPrefix(type) + url, { search: this.getParams(data) }).toPromise().then(res => res.json())
                .then(data => {
                    this.onSuccess();
                    return data;
                }, error => {
                    this.processError(error);
                    return error;
                });
        }


    }
    ///// end oold do get

    /**
     * extecute a server POST request
     * @param url
     * @param type
     * @param data
     * @returns {any}
     */
    doPost(url, type, data: Object, process = false) {
        this.prepareRequest(type);
        return this.http.post(this.getPrefix(type) + url, data, this.options).toPromise().then(res => {
            if (process) {
                return res;
            } else {
                return res.json();
            }
        })
            .then(data => {
                if (data.msg && data.msg === 'invalidLogin') {
                    sessionStorage.removeItem('auth_token');
                    this.ar.navigateByUrl('/login');
                    return;
                }
                this.onSuccess();
                return data;
            }, error => {
                this.processError(error);
                return error;
            });
    }

    doDelete(url, type, data: Object) {
        this.prepareRequest(type);
        return this.http.delete(this.getPrefix(type) + url, data).toPromise().then(res => res.json())
            .then(data => {
                this.onSuccess();
                return data;
            }, error => {
                this.processError(error);
                return error;
            });
    }

    doPut(url, type, data: Object) {
        this.prepareRequest(type);
        return this.http.put(this.getPrefix(type) + url, data).toPromise().then(res => res.json())
            .then(data => {
                this.onSuccess();

                return data;
            }, error => {
                this.processError(error);
                return error;
            });
    }
    showError(error) {
        if (error[0].message) {
            Materialize.toast('<i class="material-icons">error</i>' + error[0].message, 4000, 'error-toast');
        }
    }
    getParams(data) {
        const params: URLSearchParams = new URLSearchParams();
        for (const x in data) {
            params.set(x, data[x]);
        }
        return params;
    }

    getPrefix(type: string) {
        let prefix = '';
        if (type === 'local') {
            prefix = environment.api_json;
        } else if (type === 'node') {
            prefix = environment.api_node;
        } else if (type === 'server') {
            prefix = environment.api_url;
        }
        return prefix;
    }

    private onSuccess() {
        if (this.type === 'server') {
            sessionStorage.setItem(this.sessionKey, 'true');
        }
    }

    private processError(error) {
        error.at = this.getFormattedDate();
        const currentErrors = sessionStorage.getItem(this.storageName);
        let errors = [];
        if (currentErrors) {
            errors = JSON.parse(currentErrors);
        }
        console.log(error);
        errors.push(error);
        sessionStorage.setItem(this.storageName, JSON.stringify(errors));
        if (error.status === 403) {
            sessionStorage.setItem(this.sessionKey, 'false');
            window.location.href = java_api_base_url + '/login';
        }
    }

    private getFormattedDate() {
        const date = new Date();
        const str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        return str;
    }

}
