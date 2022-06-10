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
import { CuentaComponent } from './cuentas/cuenta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioMComponent } from './usuariosM/usuario-m/usuario-m.component';
import { PagosComponent } from './pagos/pagos.component';
import { ComponentsModule } from '../components/components.module';
import { LocalizacionComponent } from './localizacion/localizacion.component';
import { GoogleMapsModule } from '@angular/google-maps';




@NgModule({
  declarations: [
    DashboardComponent, //todo funcionara de manera interna solo en pages
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    UsuariosmComponent,
    CuentasComponent,
    CuentaComponent,
    UsuarioMComponent,
    PagosComponent,
    LocalizacionComponent
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
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    GoogleMapsModule
    
  ]
})
export class PagesModule { }
