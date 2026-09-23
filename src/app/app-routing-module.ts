import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { About } from './about/about';
import { Auth } from './auth/auth';
import { ContactUs } from './contact-us/contact-us';
import { Home } from './home/home';
import { Services } from './services/services';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'about', component: About, canActivate: [authGuard] },
  { path: 'services', component: Services, canActivate: [authGuard] },
  { path: 'contact-us', component: ContactUs, canActivate: [authGuard] },
  { path: 'auth', component: Auth },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
