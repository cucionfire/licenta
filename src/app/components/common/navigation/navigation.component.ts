import { Component } from '@angular/core';
import {Router} from '@angular/router';

declare var jQuery:any;

declare var $:any;

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.template.html'
})

export class NavigationComponent {

    constructor(private router: Router) {}

    ngAfterViewInit() {
        
    }

    activeRoute(routename: string): boolean{
        return this.router.url.indexOf(routename) > -1;
    }


}