import { Component } from '@angular/core';

declare var jQuery:any;

declare var $:any;

@Component({
    selector: 'basic',
    templateUrl: 'basic.template.html'
})
export class basicComponent {
    ngAfterViewInit() {
        (function($){
            $('.sidebar-collapse, #page-wrapper').slimScroll({
            height: '100%',
            railOpacity: 0.9
        })
    });

  }

    ngOnDestroy() {
      //  jQuery('body').removeClass('gray-bg');
    }
}
