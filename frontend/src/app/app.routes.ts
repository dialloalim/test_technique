import { Routes } from '@angular/router';
import { CentreComponent } from './pages/centre/centre.component';
import { MedecinComponent } from './pages/medecin/medecin.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: 'full'},
    {path: "home", component: CentreComponent},
    {path: "centre/:id/medecins", component: MedecinComponent},
    {path: "admin", component: AdminPageComponent},
];
