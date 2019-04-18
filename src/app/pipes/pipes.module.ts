import {BrowserModule} from '@angular/platform-browser';
import {I18nPipe} from './i18n.pipe';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [BrowserModule],
    declarations: [I18nPipe],
    exports: [I18nPipe]
})
export class PipesModule {

}
