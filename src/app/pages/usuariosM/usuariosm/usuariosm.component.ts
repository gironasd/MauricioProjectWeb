import { Component, OnInit } from '@angular/core';
import { UsuarioMovil } from 'src/app/models/usuario-movil.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuariosm',
  templateUrl: './usuariosm.component.html',
  styles: [
  ]
})
export class UsuariosmComponent implements OnInit {

  //public total: number = 0; 
  public usuariosm: UsuarioMovil[] = [];
  public usuariosmTemp: UsuarioMovil[] = [];
  public cargando: boolean = true

  constructor( 
    private usuarioService: UsuarioService,
    private busquedaService: BusquedasService
    ) { }

  ngOnInit(): void {

    this.cargarUsuariosm();
    
  }

  cargarUsuariosm() {
    this.cargando = true;

    this.usuarioService.cargarUsuarios()
    .subscribe( ({ usuariomoviles }) => {
      this.usuariosm = usuariomoviles
      this.usuariosmTemp = usuariomoviles
      this.cargando = false;
    })
  }

  buscar ( termino: string ) {

    

    if (termino.length === 0 ) {
      this.usuariosm = this.usuariosmTemp
    }
    else {
      this.busquedaService.buscar( 'usuario-movil', termino )
      .subscribe( resultados => {
        this.usuariosm = resultados;
      })
    }
    
  }

  eliminarUsuario( usuariom: UsuarioMovil) {
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar el usuario?',
      text: `Estas a punto de eliminar a ${ usuariom.nombre }` ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.usuarioService.eliminarUsuario( usuariom )
            .subscribe( resp => {
              this.cargarUsuariosm();
              Swal.fire(
                'Usuario eliminado',
                `${ usuariom.nombre } fue eliminado correctamente`,
                'success'
                )

              })
      }
    })
  }

}
