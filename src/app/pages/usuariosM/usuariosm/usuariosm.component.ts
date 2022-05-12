import { Component, OnInit } from '@angular/core';
import { UsuarioMovil } from 'src/app/models/usuario-movil.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuariosm',
  templateUrl: './usuariosm.component.html',
  styles: [
  ]
})
export class UsuariosmComponent implements OnInit {

  //public total: number = 0; 
  public usuariosm: UsuarioMovil[] = [];

  constructor( private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    this.usuarioService.cargarUsuarios()
      .subscribe( ({ usuariomoviles }) => {
        this.usuariosm = usuariomoviles
      })
  }

}
