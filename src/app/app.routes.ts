import { Routes } from '@angular/router';
import {SignIn} from './sign-in/sign-in';
import {SignUp} from './sign-up/sign-up';

export const routes: Routes = [
  {path:'' , redirectTo:'sign-in',pathMatch:'full'},
  {path:'sign-in',component: SignIn},
  {path:'sign-up',component: SignUp}
];
