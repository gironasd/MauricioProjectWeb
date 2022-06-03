import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioMovil } from 'src/app/models/usuario-movil.model';
import { ModalusuarioService } from 'src/app/services/modalusuario.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-m',
  templateUrl: './usuario-m.component.html',  
})
export class UsuarioMComponent implements OnInit {

  public usuarioMForm!: FormGroup;
  public usuarioM: UsuarioMovil[] = []
  public usuarioMSeleccionado!: UsuarioMovil;

  constructor( 
    private fb: FormBuilder,
    private cuentaService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public modalUsuarioService: ModalusuarioService
    ) {
    
   }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({id}) => {
      this.cargarUsuarios(id)
    })



    this.usuarioMForm = this.fb.group({
      nombre: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      ciudad: ['', Validators.required]
    })
  }

  cargarUsuarios( id: string ){

    if ( id === 'nuevo'){
      return;
    }
    this.cuentaService.obtenerUsuarioById( id )
      .subscribe ( usuarios =>{

        if ( !usuarios ) {
          return this.router.navigateByUrl(`/dashboard/usuario-movil/`)
        }

        const { nombre, password, email, ciudad } = usuarios
        console.log( ciudad )
        this.usuarioMSeleccionado = usuarios
        this.usuarioMForm.setValue({ nombre, password, email, ciudad })
        
      })
  }
  

  guardarUsuario(){
    const {nombre} = this.usuarioMForm.value
    
    if (this.usuarioMSeleccionado){
      const data = {
        ...this.usuarioMForm.value,
        _id: this.usuarioMSeleccionado._id
      }
      this.cuentaService.actualizarUsuarioM( data )
        .subscribe( resp => {
          console.log(resp)
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success')
        })
    } else {
      this.cuentaService.crearUsuarioMovil( this.usuarioMForm.value)
      .subscribe( (resp: any) => {
        console.log(resp)
        Swal.fire('Creado', `${ nombre } creado correctamente`, 'success')
        this.router.navigateByUrl(`/dashboard/usuario-movil/${ resp.usuarioM._id}`)
      })
    }

   

  }

  abrirModal(){
    
    
    this.activatedRoute.params.subscribe( ({id}) => {
      this.modalUsuarioService.abrirModal(id)
    })
  }

}
