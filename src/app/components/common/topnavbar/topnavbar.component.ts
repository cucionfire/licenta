import {Router} from '@angular/router';
import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
declare var jQuery:any;

@Component({
    selector: 'topnavbar',
    templateUrl: 'topnavbar.template.html'
})
export class TopnavbarComponent {

    constructor(private router: Router) {}

    toggleNavigation(): void {
        jQuery("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }

}
