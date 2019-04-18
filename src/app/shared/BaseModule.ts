import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import { I18nPipe } from '../pipes/i18n.pipe';

import { PipesModule } from '../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [BrowserModule, FormsModule,NgxDatatableModule, PipesModule,  RouterModule], //NgxDatatableModule,
    exports: [I18nPipe, BrowserModule, FormsModule,NgxDatatableModule,  RouterModule] //NgxDatatableModule,
})
export class BaseModule {

}
