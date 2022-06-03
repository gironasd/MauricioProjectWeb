import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Pagos } from 'src/app/models/pago.model';
import { ModalusuarioService } from 'src/app/services/modalusuario.service';

@Component({
  selector: 'app-modalusuario',
  templateUrl: './modalusuario.component.html',
  styles: [
  ]
})
export class ModalusuarioComponent implements OnInit {

  public ocultarModal: boolean = false;
  public pago: Pagos [] = []

  constructor(
    public modalUsuarioService: ModalusuarioService
  ) { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.cargarPagos()
    //  }, 5000);
  }

  cerrarModal(){
    this.modalUsuarioService.cerrarModal()
  }

  cargarPagos (){   
    const cid = this.modalUsuarioService.cid
    console.log('El id en el modal: ', cid)
    this.modalUsuarioService.obtenerCobros( cid )
    .subscribe ( (cobros: any) => {
      console.log(cobros)
      this.pago = cobros
     
    })
  }

}
