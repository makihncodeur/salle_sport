import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { OffreComponent } from './offre/offre.component';
import { SouscriptionGestionComponent } from './souscription-gestion/souscription-gestion.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './auth/profile/profile.component';

const routes: Routes = [
  { path: 'clients', component: ClientComponent },
  { path: 'offres', component: OffreComponent },
  { path: 'souscriptions', component: SouscriptionGestionComponent },
  { path: 'statistiques', component: StatistiqueComponent },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/profile', component: ProfileComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**', redirectTo: '/auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
