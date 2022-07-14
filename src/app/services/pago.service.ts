import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { Pagos } from '../models/pago.model';


const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(
    
    private http: HttpClient,
    private router: Router
  ) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  // get uid(): string {
  //   return this.usuario.uid || ''
  // }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarPagos() {
    const url = `${ base_url }/pagos`
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, pagos: Pagos[]}) => resp.pagos)
              )
           
  }

  cargarPagosFecha(fecha){
    const url = `${ base_url }/pagos/${ fecha }`
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, pagos: Pagos[]}) => resp.pagos)
              )
  }


}
