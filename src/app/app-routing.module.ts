import { EditProfileComponent } from './views/edit-profile/edit-profile.component';
import { RolesListComponent } from './views/roles-list/roles-list.component';
import { AppointmentsComponent } from './views/appointments/appointments.component';
import { ReportsComponent } from './views/reports/reports.component';
import { ServicesListComponent } from './views/services-list/services-list.component';
import { AgendaComponent } from './views/agenda/agenda.component';
import { ClientListComponent } from './views/client-list/client-list.component';
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import { UserListComponent } from './views/user-list/user-list.component';
import { blankComponent } from './components/common/layouts/blank.component';
import { loginComponent } from './views/login/login.component';
import { mainViewComponent } from './views/main-view/main-view.component';
import { minorViewComponent } from './views/minor-view/minor-view.component';
import { registerComponent } from './views/register/register.component';
import { basicComponent } from './views/layouts/basic.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', redirectTo: 'mainView', pathMatch: 'full'},
            {
                path: '',
                component: basicComponent,
                children: [
                    {path: 'mainView', component: mainViewComponent},
                    {path: 'minorView', component: minorViewComponent},
                    {path: 'angenda', component:AgendaComponent},
                    {path: 'appointments', component:AppointmentsComponent},
                    {path: 'clients', component: ClientListComponent},
                    {path: 'services', component: ServicesListComponent},
                    {path: 'users', component: UserListComponent},
                    {path: 'roles', component: RolesListComponent},
                    {path: 'reports', component: ReportsComponent},
                    {path: 'edit-profile', component: EditProfileComponent},
                    {path: '**',    component: mainViewComponent } // add under construction component
                ]
            },
            {
                path: '', component: blankComponent,
                children: [
                    { path: 'login', component: loginComponent },
                    { path: 'register', component: registerComponent }
                ]
            },
        ], { useHash: true })
    ],
    exports: [
        RouterModule
    ],
    providers: [

    ]
})
export class AppRoutingModule {}
