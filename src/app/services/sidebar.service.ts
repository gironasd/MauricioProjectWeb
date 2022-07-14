import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [
    {
      titulo: 'Pagos',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Lista Pagos', url: 'pagos/diaActivos'},
      ]
    },
    {
      titulo: 'Usuario Moviles',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Lista de Usuario moviles', url: 'usuario-movil'},
        { titulo: 'Registrar nuevo', url: 'usuario-movil/nuevo'}
      ]
    },
    {
      titulo: 'Cuentas',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Lista de cuentas', url: 'cuentas'},
        { titulo: 'Registrar nuevo', url: 'cuenta/nuevo'}
      ]
    },
    {
      titulo: 'Localización',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Ver Mapa', url: 'localizacion'},
      ]
    },
  ]

  constructor() { }
}
