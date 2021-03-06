import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, map, catchError, delay } from 'rxjs/operators'
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

  eliminarUsuario(usuariom: UsuarioMovil) {

    const url = `${ base_url }/usuario-movil/${ usuariom._id }`
    
    return this.http.delete( url )


  }

  obtenerUsuarioById( id: string ){ 
    const url = `${ base_url }/usuario-movil/${ id }`
    return this.http.get( url )
                    .pipe(
                      map( (resp: { ok: boolean, usuarios: UsuarioMovil}) => resp.usuarios)
                    );
  }

  crearUsuarioMovil( usuario: { nombre: string, password: string, email:string, ciudad:string} ) {
    const url = `${ base_url }/usuario-movil`
    return this.http.post( url, usuario )
  }

  actualizarUsuarioM ( usuariom: UsuarioMovil ){

    const url = `${ base_url }/usuario-movil/${ usuariom._id }`
    return this.http.put( url, usuariom)
  }

}
