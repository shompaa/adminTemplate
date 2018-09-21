import { Component, OnInit } from '@angular/core';
import { MedicoService, HospitalService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public ms: MedicoService,
    public hs: HospitalService,
    public router: Router,
    public ar: ActivatedRoute,
    public mus: ModalUploadService) {
      ar.params.subscribe(params => {
        const id = params['id'];

        if (id !== 'nuevo') {
          this.cargarMedico(id);
        }
      });
    }

  ngOnInit() {
    this.hs.cargarHospitales()
    .subscribe(hospitales => this.hospitales = hospitales);

    this.mus.notificacion.subscribe(resp => {
      this.medico.img = resp.medico.img;
    });
  }

  guardarMedico( f: NgForm) {
    if (f.invalid) {
      return;
    }

    this.ms.guardarMedico(this.medico)
    .subscribe( medico => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });
  }

  cambioHospital(id: string) {
    this.hs.obtenerHospital(id)
    .subscribe( hospital => this.hospital = hospital);
  }

  cargarMedico(id: string) {
    this.ms.cargarMedico(id)
    .subscribe(medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  cambiarFoto() {
    this.mus.mostrarModal('medicos', this.medico._id);
  }
}
