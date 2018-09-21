import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children : [
            { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
            { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graphics'}},
            { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promise'}},
            { path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
            { path: 'accountSettings', component: AccountSettingsComponent, data: {titulo: 'Account settings'}},
            { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'}},
           // Mantenedores
            { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenedor de usuarios'}},
            { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenedor de hospitales'}},
            { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenedor de medicos'}},
            { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar medico'}},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    },
];


export const PAGES_ROUTE = RouterModule.forChild(pagesRoutes);
