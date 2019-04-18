import {BrowserModule} from '@angular/platform-browser';
import {FooterModule} from '../footer/footer.module';
import {NavigationModule} from '../navigation/navigation.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TopnavbarModule} from '../topnavbar/topnavbar.module';
import {basicComponent} from './basic.component';
import {blankComponent} from './blank.component';

@NgModule({
    declarations: [blankComponent, basicComponent],
    imports     : [BrowserModule, RouterModule, NavigationModule, TopnavbarModule, FooterModule],
    exports     : [blankComponent, basicComponent]
})

export class LayoutsModule {}
