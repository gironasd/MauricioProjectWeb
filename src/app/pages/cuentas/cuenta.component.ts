import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuentas } from 'src/app/models/cuentas.model';
import { Pagos } from 'src/app/models/pago.model';
import { CuentasService } from 'src/app/services/cuentas.service';
import { ModalcuentaService } from 'src/app/services/modalcuenta.service';
import { PagoService } from 'src/app/services/pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styles: [
  ]
})
export class CuentaComponent implements OnInit {

  public cuentaForm!: FormGroup;
  public cuenta: Cuentas[] = []
  public cuentaSeleccionada!: Cuentas;
  public pago: Pagos[] = [];
  public id: string;

  constructor( 
    private fb: FormBuilder,
    private cuentaService: CuentasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public modalcuentaService: ModalcuentaService,
    private pagoService: PagoService,
    
    ) {
    
   }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({id}) => {
      this.cargarCuenta(id)
    })



    this.cuentaForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required],
      ciudad: ['', Validators.required]
    })
  }

  cargarCuenta( id: string ){

    if ( id === 'nuevo'){
      return;
    }

    this.cuentaService.obtenerCuentaById( id )
      .subscribe ( cuentas =>{

        if ( !cuentas ) {
          return this.router.navigateByUrl(`/dashboard/cuentas/`)
        }
        const { nombres, apellidos, email, ciudad } = cuentas
        console.log( ciudad )
        this.cuentaSeleccionada = cuentas
        this.cuentaForm.setValue({ nombres, apellidos, email, ciudad})
       
      })
  }
  

  guardarCuenta(){
    const {nombres} = this.cuentaForm.value

    if( this.cuentaSeleccionada ) {
      //actualizar
      const data = {
        ...this.cuentaForm.value,
        _id: this.cuentaSeleccionada._id
      }
      this.cuentaService.actualizarCuenta( data )
        .subscribe( resp => {
          console.log(resp)
          Swal.fire('Actualizado', `${ nombres } actualizado correctamente`, 'success')
        })

    } else {
      //Crear
      this.cuentaService.crearCuenta( this.cuentaForm.value)
      .subscribe( (resp: any) => {
        console.log(resp)
        Swal.fire('Creado', `${ nombres } creado correctamente`, 'success')
        this.router.navigateByUrl(`/dashboard/cuenta/${ resp.cuenta._id}`)
      })
    }

    
  }

  abrirModal(){
    
    
    this.activatedRoute.params.subscribe( ({id}) => {
      this.modalcuentaService.abrirModal(id)
    })
  }

 

}
