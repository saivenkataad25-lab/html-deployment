import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { About } from './about/about';
import { Auth } from './auth/auth';
import { ContactUs } from './contact-us/contact-us';
import { Home } from './home/home';
import { Logic } from './logic/logic';
import { Services } from './services/services';

@NgModule({
  declarations: [App, Home, About, Services, ContactUs, Auth, Logic],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
