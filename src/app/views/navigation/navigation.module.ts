import { BaseModule } from '../../shared/BaseModule';
import { NavigationComponent } from "./navigation.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [NavigationComponent],
    imports: [RouterModule, BaseModule],
    exports: [NavigationComponent],
})

export class NavigationModule { }