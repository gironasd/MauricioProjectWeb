import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CargarCuentas } from '../interfaces/cargar-cuentas.interface';
import { Cuentas } from '../models/cuentas.model';
import { map } from 'rxjs/operators'


const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})



export class CuentasService {

  //public cuenta: Cuentas[] = []
  

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  cargarCuentas() {
    const url = `${ base_url }/cuentas`
    return this.http.get<CargarCuentas>( url )
  }

  obtenerCuentaById( id: string ){ 
    const url = `${ base_url }/cuentas/${ id }`
    return this.http.get( url )
                    .pipe(
                      map( (resp: { ok: boolean, cuentas: Cuentas}) => resp.cuentas)
                    );
  }

  crearCuenta( cuenta: { nombres: string, apellidos: string, email:string, ciudad:string} ) {
    const url = `${ base_url }/cuentas`
    return this.http.post( url, cuenta )
  }

  eliminarCuenta(_id: string) {

    const url = `${ base_url }/cuentas/${ _id }`
    
    return this.http.delete( url )


  }

  actualizarCuenta ( cuenta: Cuentas ){

    const url = `${ base_url }/cuentas/${ cuenta._id }`
    return this.http.put( url, cuenta)
  }
}


