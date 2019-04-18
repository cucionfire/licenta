import { Component } from '@angular/core';

declare var jQuery:any;

declare var $:any;

@Component({
    selector: 'basic',
    templateUrl: 'basic.template.html'
})
export class basicComponent {
    ngAfterViewInit() {
        jQuery('body').addClass('gray-bg');
    }

    ngOnDestroy() {
        jQuery('body').removeClass('gray-bg');
    }
}