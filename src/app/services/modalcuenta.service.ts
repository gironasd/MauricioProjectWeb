import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { Pagos } from '../models/pago.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ModalcuentaService {

  public pago: Pagos[] = []

  public ocultarModal: boolean = true

  public cid: string

    constructor(private http: HttpClient,) { }

  get ocultarmodal() {
    return this.ocultarModal
  }

  abrirModal(id: string) {
    this.ocultarModal = false
    
    this.cid = id
    console.log('id en service: ', this.cid)
  }

  cerrarModal() {
    this.ocultarModal = true
  }
 
  obtenerPagosporCuenta(id: string){
    const url = `${ base_url }/pagos/${ id }`
    return this.http.get( url )
                    .pipe(
                      map( (resp: { ok: boolean, pagocuentas: Pagos}) => resp.pagocuentas)
                    );
  }
}
