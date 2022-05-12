import { Component, OnInit } from '@angular/core';
import { Cuentas } from 'src/app/models/cuentas.model';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styles: [
  ]
})
export class CuentasComponent implements OnInit {

  public cuenta: Cuentas[] = []

  constructor(
    private cuentaService: CuentasService
  ) { }

  ngOnInit(): void {

    this.cuentaService.cargarCuentas()
      .subscribe( ({cuentas}) => {
        this.cuenta = cuentas
      })
  }

}
