import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(
    private http: HttpClient
  ) { }

  // get token(): string {
  //   return localStorage.getItem('token') || '';  //Para el token porsia
  // } 

  buscar( 
    tipo: 'usuario-movil'|'cuentas',
    termino: string
    ) {
    //console.log(tipo, termino)
    const url = `${ base_url }/todo/coleccion/${ tipo }/${termino}`
    return this.http.get<any[]>( url ) 
            .pipe(
              map( (resp: any) => resp.resultados )
            )
  }


}
