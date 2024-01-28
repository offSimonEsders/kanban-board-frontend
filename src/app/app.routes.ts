import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {HomeComponent} from "./home/home.component";
import {AuthguardService} from "./services/authguard.service";

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthguardService]}
];
