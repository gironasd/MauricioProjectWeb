import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { UsuariosmComponent } from './usuariosM/usuariosm/usuariosm.component';
import { CuentasComponent } from './cuentas/cuentas/cuentas.component';



@NgModule({
  declarations: [
    DashboardComponent, //todo funcionara de manera interna solo en pages
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    UsuariosmComponent,
    CuentasComponent
  ],
  exports: [
    DashboardComponent, //todo funcionara de manera interna solo en pages
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
