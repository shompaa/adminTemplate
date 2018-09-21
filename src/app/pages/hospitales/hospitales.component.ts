import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Title } from '@angular/platform-browser';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public hs: HospitalService, public mus: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this.mus.notificacion
    .subscribe(resp => this.cargarHospitales());
  }

  actualizarImagen(id: string) {
    this.mus.mostrarModal('hospitales', id);
  }

  cargarHospitales() {
    this.cargando = true;
    this.hs.cargarHospitales(this.desde)
    .subscribe(hospitales => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  cambiarDesde( valor: number) {
    const desde = this.desde + valor;
    if ( desde >= this.hs.totalHospitales) {
      return;
    }

    if ( desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarHospitales();
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this.hs.buscarHospital(termino).subscribe( hospitales => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: 'Esta seguro?',
      text: 'Está a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(borrar => {
      if (borrar) {
        this.hs.borrarHospital(hospital._id)
        .subscribe( borrado => {
          this.desde = 0;
          this.cargarHospitales();
        });
      }
    });
  }

  guardarHospital(hospital: Hospital) {
    this.hs.actualizarHospital(hospital)
    .subscribe();
  }

  crearHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }

      this.hs.crearHospital(valor)
      .subscribe(() => this.cargarHospitales());
    });
  }

}
