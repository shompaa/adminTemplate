import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public us: UsuarioService, public mus: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.mus.notificacion
    .subscribe(resp => this.cargarUsuarios());
  }

  mostrarModal(id: string) {
    this.mus.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this.us.cargarUsuarios(this.desde)
    .subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;

    });
  }

  cambiarDesde( valor: number) {
    const desde = this.desde + valor;
    if ( desde >= this.totalRegistros) {
      return;
    }

    if ( desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    this.us.buscarUsuarios(termino).subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this.us.usuario._id) {
      swal('Ups!', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: 'Esta seguro?',
      text: 'Está a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(borrar => {
      if (borrar) {
        this.us.borrarUsuario(usuario._id)
        .subscribe( borrado => {
          this.desde = 0;
          this.cargarUsuarios();
        });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this.us.actualizarUsuario(usuario)
    .subscribe();
  }

}
