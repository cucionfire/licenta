import { RouterModule } from '@angular/router';
import "rxjs";
import "rxjs";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule, RequestOptions} from "@angular/http";

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import { ClientListComponent } from './views/client-list/client-list.component';
import {LoginModule} from "./views/login/login.module";
import {MainViewModule} from "./views/main-view/main-view.module";
import {MinorViewModule} from "./views/minor-view/minor-view.module";
import {NgModule} from "@angular/core";

import { ParametersComponent } from './views/parameters/parameters.component';
import {RegisterModule} from "./views/register/register.module";
import { UserDetailComponent } from './views/user-detail/user-detail.component';
import { UserListComponent } from './views/user-list/user-list.component';
import { ServicesListComponent } from './views/services-list/services-list.component';
import { ServicesDetailComponent } from './views/services-detail/services-detail.component';
import { AgendaComponent } from './views/agenda/agenda.component';
import { ReportsComponent } from './views/reports/reports.component';
import { AppointmentsComponent } from './views/appointments/appointments.component';
import { RolesListComponent } from './views/roles-list/roles-list.component';
import { RolesDetailComponent } from './views/roles-detail/roles-detail.component';
import { ProfileDataComponent } from './views/profile-data/profile-data.component';
import { CompanyDataComponent } from './views/company-data/company-data.component';
import { ChangeEmailComponent } from './views/change-email/change-email.component';
import { ChangePasswordComponent } from './views/change-password/change-password.component';
import { AccountSettingsComponent } from './views/account-settings/account-settings.component';
import { EditProfileComponent } from './views/edit-profile/edit-profile.component';
import { PipesModule } from './pipes/pipes.module';
import { BaseHttpService } from './services/common/base-http.service';
import { BaseHttpRequestOptions } from './services/common/base-http-request-options';
import { ClientDetailComponent } from './views/client-data/client-detail.component';
import { LayoutsModule } from './views/layouts/layouts.module';
import { GlobalModule } from './shared/modules/GlobalModule.module';
import { GlobalService } from './shared/modules/services/global.service';
import { blankComponent } from './components/common/layouts/blank.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AuthenticationService } from './services/security/auth.guard.service';
import * as $ from "jquery";
// App views




// App modules/components




@NgModule({
    imports: [
        // Angular modules
        BrowserModule,
        HttpModule,
        NgxDatatableModule,
        FormsModule,
        PipesModule,
        ReactiveFormsModule,
        // Views
        MainViewModule,
        MinorViewModule,
        LoginModule,
        RegisterModule,
        RouterModule,


        // Modules
        LayoutsModule,
        AppRoutingModule,
        GlobalModule,

    ],

    declarations: [
        AppComponent,
        UserListComponent,
       // ConfiguratorComponent,
        ClientListComponent,
        ClientDetailComponent,
        ParametersComponent,
        UserDetailComponent,
        ServicesListComponent,
        ServicesDetailComponent,
        AgendaComponent,
        ReportsComponent,
        AppointmentsComponent,
        RolesListComponent,
        RolesDetailComponent,
        ProfileDataComponent,
        CompanyDataComponent,
        ChangeEmailComponent,
        ChangePasswordComponent,
        AccountSettingsComponent,
        EditProfileComponent,
        blankComponent

    ],

    providers: [
        AuthenticationService,
        BaseHttpService,
        GlobalService,
        {provide: RequestOptions, useClass: BaseHttpRequestOptions}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}


declare var java_api_url: any;

export class AppSettings {

    public static get API_JSON(): string {
        return 'assets/';
    }

    public static get API_NODE(): string {
        return 'http://airline-builder:3000/';
    }

    public static get API_JAVA(): string {
        return java_api_url;
    }
    public static get API_URL(): string {
        return 'http://localhost/transport/api/';
    }

}
