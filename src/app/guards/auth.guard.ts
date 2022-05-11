import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { tap, map } from 'rxjs/operators'
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioservice: UsuarioService,
                private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

      
      return this.usuarioservice.validarToken()
        .pipe(
          tap( estaAutenticado => {
            if(!estaAutenticado) {
              this.router.navigateByUrl('/login')
            }
          })
        );
  }
  
}
