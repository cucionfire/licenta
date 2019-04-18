import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserModule} from "@angular/platform-browser";

import {PipesModule} from "../../pipes/pipes.module";
import { NgModule } from '@angular/core';
import { CustomFieldsFormComponent } from '../components/custom-fields-form/custom-fields-form.component';
import { FormChangesComponent } from '../components/form-changes/form-changes.component';
import { PageHeaderComponent } from '../components/page-header/page-header.component';

@NgModule({
    imports: [BrowserModule,PipesModule,FormsModule,ReactiveFormsModule],
     declarations: [CustomFieldsFormComponent, FormChangesComponent, PageHeaderComponent], //,CustomFieldsFormComponent FormChangesComponent,PageHeaderComponent
     exports:[CustomFieldsFormComponent, FormChangesComponent,PageHeaderComponent,PipesModule] //,CustomFieldsFormComponent FormChangesComponent,PageHeaderComponent
})
export class GlobalModule {

}
