import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, map, catchError } from 'rxjs/operators'
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

import { UsuarioMovil } from '../models/usuario-movil.model';
import { CargarUsuario } from '../interfaces/cargar-usuariosmoviles.interface';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //public usuariom: UsuarioMovil

  constructor( private http: HttpClient,
                private router: Router,
                private ngZone: NgZone) { }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(` ${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token )
        }),
        map( resp => true),
        catchError( error => of(false))
    )
  }

  

  crearUsuario( formData: any ) {
    console.log('Creando usuario')
  }

  login ( formData: LoginForm ) {
    console.log(formData)

    return this.http.post(` ${ base_url }/login`, formData )
                    .pipe(
                      tap( (resp: any) => {
                        localStorage.setItem('token', resp.token)
                      })
                    )
  }

  cargarUsuarios() {
    const url = `${ base_url }/usuario-movil`
    return this.http.get<CargarUsuario>( url )
  }

}
