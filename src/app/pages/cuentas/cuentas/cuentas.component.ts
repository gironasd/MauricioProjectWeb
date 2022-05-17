import { Component, OnInit } from '@angular/core';
import { Cuentas } from 'src/app/models/cuentas.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { CuentasService } from 'src/app/services/cuentas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styles: [
  ]
})
export class CuentasComponent implements OnInit {

  public cuenta: Cuentas[] = []
  public cuentaTemp: Cuentas[] = []
  public cargando: boolean = true

  constructor(
    private cuentaService: CuentasService,
    private busquedaService: BusquedasService
  ) { }

  ngOnInit(): void {

    this.cargarCuentas();
  }

  cargarCuentas(){
    this.cargando = true;

    this.cuentaService.cargarCuentas()
    .subscribe( ({cuentas}) => {
      this.cuenta = cuentas
      this.cargando = false;
      this.cuentaTemp = cuentas
    })
  }

  buscar ( termino: string ) {

    if (termino.length === 0 ) {
      this.cuenta = this.cuentaTemp
    }
    else {
      this.busquedaService.buscar( 'cuentas', termino )
      .subscribe( resultados => {
       
        this.cuenta = resultados;
      })
   
    }
  }

  borrarCuenta( cuenta: Cuentas ) {

    Swal.fire({
      title: '¿Estas seguro que quieres eliminar esta cuenta?',
      text: `Estas a punto de eliminar a ${ cuenta.nombres }` ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        const id: string = cuenta._id ?? ''
        
        this.cuentaService.eliminarCuenta( id )
            .subscribe( resp => {
              this.cargarCuentas();
              Swal.fire(
                'Cuenta eliminada',
                `${ cuenta.nombres } fue eliminado correctamente`,
                'success'
                )

              })
      }
    })
  }

}
