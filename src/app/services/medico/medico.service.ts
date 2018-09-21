import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(public http: HttpClient, public us: UsuarioService) { }

  cargarMedicos(desde: number = 0) {
    const url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get(url)
    .pipe(map((resp: any) => {
      this.totalMedicos = resp.total;
      return resp.medicos;
    }));
  }

  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
    .pipe(map((resp: any) => resp.medicos));
  }

  borrarMedico( id: string ) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this.us.token;

    return this.http.delete(url)
    .pipe(map( resp => {
      swal('Correcto!', 'El medico ha sido eliminado correctamente', 'success');
      return true;
    }));
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';

    if (medico._id) {
      // actualizar
      url += '/' + medico._id;
      url += '?token=' + this.us.token;

      return this.http.put(url, medico)
      .pipe(map((resp:any) => {
        swal('Correcto!', 'Medico ' + medico.nombre + ' actualizado correctamente', 'success');
        return resp.medico;
      }));

    } else {
      // crear
      url += '?token=' + this.us.token;
      return this.http.post(url, medico)
      .pipe(map((resp: any) => {
        swal('Correcto!', 'Medico ' + medico.nombre + ' creado correctamente', 'success');
        return resp.medico;
      }));
    }
  }

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
    .pipe(map((resp: any) => resp.medico));
  }

}
