import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
    imports: [BrowserModule,FormsModule,ReactiveFormsModule, PipesModule],
    declarations: [
       // GridViewDefinitionComponent,
       // BasicSearchComponent,
       // NotesListComponent,
        //AttachmentsListComponent,
       // ExportModalComponent,
       // AutocompleteComponent,
       // LovComponent,
       // BasicSearchInputsComponent,
       // CustomFieldsManagerComponent
    ],
    exports: [
        /* GridViewDefinitionComponent,
        BasicSearchComponent,
        NotesListComponent,
        AttachmentsListComponent,
        ExportModalComponent,
        AutocompleteComponent,
        LovComponent,
        CustomFieldsManagerComponent,
        BasicSearchInputsComponent */

    ]
})
export class GridModule {

}
