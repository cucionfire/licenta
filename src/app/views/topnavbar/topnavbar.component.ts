import { AuthenticationService } from './../../services/security/auth.guard.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { smoothlyMenu } from '../../app.helpers';

declare var jQuery: any;

@Component({
    selector: 'topnavbar',
    templateUrl: 'topnavbar.template.html'
})
export class TopnavbarComponent {

    private lang: string = 'en';

    constructor(private authSrv: AuthenticationService, private router: Router) {

    }

    toggleNavigation(): void {
        jQuery("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }
    logOut() {
        this.authSrv.logout().then(data => {
            this.router.navigateByUrl("login");
        })

    }

}
