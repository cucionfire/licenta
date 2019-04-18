import { BaseComponent } from '../../shared/BaseComponent';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

declare var jQuery:any;

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.component.html'
})

export class NavigationComponent extends BaseComponent {

    constructor(private router: Router) {
        super();
    }

    ngAfterViewInit() {
        (function(jQuery){
          jQuery('#side-menu').metisMenu()
    });
  }

    /* app.controller('mainController', function($scope, Config) {
      $('#side-menu').metisMenu();
    }); */

    activeRoute(routename: string): boolean{
        return this.router.url.indexOf(routename) > -1;
    }


}
