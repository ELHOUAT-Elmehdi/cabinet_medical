import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil';
import {SignIn} from './sign-in/sign-in';
import {SignUp} from './sign-up/sign-up';

export const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  {path:'sign-in',component: SignIn},
  {path:'sign-up',component: SignUp}
  // Ajoutez vos autres routes ici
  // { path: 'login', component: LoginComponent },
  // { path: 'admin', component: AdminComponent },
  // { path: 'medecin', component: MedecinComponent },
  // { path: 'patient', component: PatientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
