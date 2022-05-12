import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';


import { NopagefoundComponent } from './nopagefound/nopagefound.component';





const routes: Routes = [
  
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
