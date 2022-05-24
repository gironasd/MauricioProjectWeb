import { Component, OnInit } from '@angular/core';
import { Pagos } from 'src/app/models/pago.model';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html'
})
export class PagosComponent implements OnInit {

  public pagos: Pagos[] = [];
  public cargando: boolean = true

  constructor(
    private pagoService: PagoService
  ) { }

  ngOnInit(): void {

   this.cargarPagos();
  }

  cargarPagos() {
    this.cargando = true

    this.pagoService.cargarPagos()
        .subscribe( pagos => {
          this.cargando = false
          this.pagos = pagos;
          console.log(pagos)
        })
  }



}
