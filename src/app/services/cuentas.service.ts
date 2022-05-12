import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CargarCuentas } from '../interfaces/cargar-cuentas.interface';


const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})



export class CuentasService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  cargarCuentas() {
    const url = `${ base_url }/cuentas`
    return this.http.get<CargarCuentas>( url )
  }
}
