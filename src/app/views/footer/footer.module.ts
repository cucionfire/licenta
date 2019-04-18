import {BrowserModule} from "@angular/platform-browser";
import {FooterComponent} from "./footer.component";
import {NgModule} from "@angular/core";

@NgModule({
    declarations: [FooterComponent],
    imports     : [BrowserModule],
    exports     : [FooterComponent],
})

export class FooterModule {}