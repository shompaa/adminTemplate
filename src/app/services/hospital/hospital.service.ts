import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  totalHospitales: number = 0;

  constructor(public http: HttpClient, public us: UsuarioService) { }

  cargarHospitales(desde: number = 0) {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url)
    .pipe(map((resp: any) => {
      this.totalHospitales = resp.total;
      return resp.hospitales;
    }));
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
    .pipe(map( (resp: any) => {
      return resp.hospital;
    }));
  }

  borrarHospital( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.us.token;

    return this.http.delete(url)
    .pipe(map( resp => {
      swal('Correcto!', 'El hospital ha sido eliminado correctamente', 'success');
      return true;
    }));
  }

  crearHospital(nombre: String) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.us.token;

    return this.http.post(url, {nombre})
    .pipe(map((res: any) => {
      swal('Hospital creado!', nombre.toString() , 'success');
      return res.hospital;
    }));
  }

  buscarHospital(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
    .pipe(map((resp: any) => resp.hospitales));
  }

  actualizarHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.us.token;
    return this.http.put(url, hospital)
    .pipe(map((res: any) => {
      swal('Hospital actualizado', res.hospital.nombre, 'success');
      return res.hospital;
    }));
  }
}
