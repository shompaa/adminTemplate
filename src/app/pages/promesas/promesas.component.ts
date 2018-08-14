import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contar3().then(mensaje => console.log('Termino!', mensaje))
    .catch(error => console.error('Error en la promesa'));
  }

  ngOnInit() {
  }

  contar3() {
    return new Promise((resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve('OK!');
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}
