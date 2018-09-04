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
      return true;
    } else {
      console.log('Bloqueo por guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
