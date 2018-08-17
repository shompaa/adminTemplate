import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public us: UsuarioService, public router: Router) {
  }

  canActivate() {

    if (this.us.estaLogueado()) {
      console.log('Wardiola');
      return true;
    } else {
      console.log('Bloqueo');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
