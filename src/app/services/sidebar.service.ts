import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [
    {
      titulo: 'Usuario Moviles',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Lista de Usuario moviles', url: 'usuario-movil'},
        { titulo: 'Registrar nuevo', url: '/nuevo-um'}
      ]
    },
    {
      titulo: 'Cuentas',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Lista de cuentas', url: 'cuentas'},
        { titulo: 'Registrar nuevo', url: '/nueva-cuenta'}
      ]
    }
  ]

  constructor() { }
}
