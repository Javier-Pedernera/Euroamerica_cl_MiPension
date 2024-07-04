import { Component, OnInit } from '@angular/core';
import { CalendarioDePagosService } from './../../services/calendario-de-pagos.service';
import { AniosResponse, CalendarioResponse, Pago } from './../../models/interface';

@Component({
  selector: 'app-calendario-de-pagos',
  templateUrl: './calendario-de-pagos.page.html',
  styleUrls: ['./calendario-de-pagos.page.scss'],
})
export class CalendarioDePagosPage implements OnInit {

  anios: Array<number> = [];
  pagos: Array<Pago> = [];
  constructor(
    private calendario: CalendarioDePagosService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.calendario.anios().subscribe((data: AniosResponse) => {
      this.anios = data.anios;

      this.cargarAnio(this.anios[0]);
    });
  }

  onItemChange(event:any) {
    console.log(event.target.value);
    this.cargarAnio(event.target.value);
  }

  cargarAnio(anio:any) {
    this.calendario.detalle(anio).subscribe((data: CalendarioResponse) => {
      this.pagos = data.pagos;
    });
  }

}
