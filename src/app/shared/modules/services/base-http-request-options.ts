import {BaseRequestOptions, Headers} from "@angular/http";

import {Injectable} from "@angular/core";

@Injectable()
export class BaseHttpRequestOptions extends BaseRequestOptions {

    headers:Headers = new Headers({
        'X-Requested-With': 'XMLHttpRequest'
    });
    withCredentials = false;

}
