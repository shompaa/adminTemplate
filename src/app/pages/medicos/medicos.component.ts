import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  desde: number = 0;
  medicos: Medico[] = [];

  constructor(public ms: MedicoService) {
    this.cargarMedicos();
  }

  ngOnInit() {
  }

  cargarMedicos() {
    this.ms.cargarMedicos(this.desde)
    .subscribe(medicos => this.medicos = medicos);
  }

  buscarMedico(termino: string) {
      if (termino.length <= 0) {
        this.cargarMedicos();
        return;
      }
      this.ms.buscarMedicos(termino).subscribe( medicos => {
        this.medicos = medicos;
      });
  }

  crearMedico() {
  }

  editarMedico() {
  }

  borrarMedico(medico: Medico) {
      swal({
        title: 'Esta seguro?',
        text: 'Está a punto de borrar a ' + medico.nombre,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
      .then(borrar => {
        if (borrar) {
          this.ms.borrarMedico(medico._id)
          .subscribe( borrado => {
            this.desde = 0;
            this.cargarMedicos();
          });
        }
      });
  }

  cambiarDesde( valor: number) {
    const desde = this.desde + valor;
    if ( desde >= this.ms.totalMedicos) {
      return;
    }

    if ( desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarMedicos();
  }
}
