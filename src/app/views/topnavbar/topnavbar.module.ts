import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {TopnavbarComponent} from "./topnavbar.component";

@NgModule({
    declarations: [TopnavbarComponent],
    imports     : [BrowserModule],
    exports     : [TopnavbarComponent],
})

export class TopnavbarModule {}