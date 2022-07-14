import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';


import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { LoginComponent } from './auth/login/login.component';





const routes: Routes = [

  { path: '', component: LoginComponent },
  
  { path: '404', component: NopagefoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot ( routes ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
