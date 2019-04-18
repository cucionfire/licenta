import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class GlobalService {

    private _colorScheme: Subject<string>;

    private _lang: Subject<string>;

    constructor() {
        this._colorScheme = <Subject<string>>new Subject();
        this._lang = <Subject<string>>new Subject();
    }

    get colorScheme() {
        return this._colorScheme.asObservable();
    }

    get lang() {
        return this._lang.asObservable();
    }

    updateColorScheme(color) {
        this._colorScheme.next(color);
    }

    updateLang(lang) {
        this._lang.next('en');
        this._lang.next(lang);
    }

}
