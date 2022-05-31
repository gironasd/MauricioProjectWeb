import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Pagos } from 'src/app/models/pago.model';
import { CuentaComponent } from 'src/app/pages/cuentas/cuenta.component';
import { ModalcuentaService } from 'src/app/services/modalcuenta.service';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-modalcuenta',
  templateUrl: './modalcuenta.component.html',
  styles: [
  ]
})
export class ModalcuentaComponent implements OnInit {

  public ocultarModal: boolean = false;
  public pago: Pagos [] = []
  

  constructor(
    public modalcuentaService: ModalcuentaService,
    private pagosService: PagoService,
    private activatedRoute: ActivatedRoute,
    
    ) { }

  ngOnInit(): void {
    
  }

  cerrarModal(){
    this.modalcuentaService.cerrarModal()
  }

  cargarPagos (){   
    const cid = this.modalcuentaService.cid
    console.log('El id en el modal: ', cid)
    this.modalcuentaService.obtenerPagosporCuenta( cid )
    .subscribe ( (pagocuentas: any) => {
      console.log(pagocuentas)
      this.pago = pagocuentas
    })
  }
  

}
