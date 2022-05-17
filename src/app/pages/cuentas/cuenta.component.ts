import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuentas } from 'src/app/models/cuentas.model';
import { CuentasService } from 'src/app/services/cuentas.service';
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

  constructor( 
    private fb: FormBuilder,
    private cuentaService: CuentasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
    this.cuentaService.obtenerCuentaById( id )
      .subscribe ( cuentas =>{
        const { nombres, apellidos, email, ciudad } = cuentas
        //console.log( nombres)
        this.cuentaSeleccionada = cuentas
        this.cuentaForm.setValue({ nombres, apellidos, email, ciudad})
       
      })
  }
  

  guardarCuenta(){
    const {nombres} = this.cuentaForm.value

    this.cuentaService.crearCuenta( this.cuentaForm.value)
        .subscribe( (resp: any) => {
          console.log(resp)
          Swal.fire('Creado', `${ nombres } creado correctamente`, 'success')
          this.router.navigateByUrl(`/dashboard/cuenta/${ resp.cuenta._id}`)
        })

  }

}
