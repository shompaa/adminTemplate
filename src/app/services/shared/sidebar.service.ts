import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any =
  [
    {
      titulo: 'Principal',
      icono: 'fa fa-tachometer',
      submenu: [
        {titulo: 'Dashboard', url: '/dashboard'},
        {titulo: 'ProgressBar', url: '/progress'},
        {titulo: 'Graficas', url: '/graficas1'},
        {titulo: 'Promesas', url: '/promesas'},
        {titulo: 'RXJS', url: '/rxjs'}
      ]
    },
    {
      titulo: 'Mantenedores',
      icono: 'fa fa-folder-open',
      submenu: [
        {titulo: 'Usuarios', url: '/usuarios'},
        {titulo: 'Hospitales', url: '/hospitales'},
        {titulo: 'Medicos', url: '/medicos'}
      ]
    }
  ];

  constructor() { }
}
