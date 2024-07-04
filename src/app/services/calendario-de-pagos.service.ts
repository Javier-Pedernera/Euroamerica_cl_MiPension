import { Injectable } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarioDePagosService {

  // //desarrollo
  urlConsulta = 'https://rrvvdesa.euroamerica.cl/WA_RRVV/rest/calendario/anios';
  urlDetalle = 'https://rrvvdesa.euroamerica.cl/WA_RRVV/rest/calendario/detalle';
  // //produccion
  // urlConsulta = 'http://rrvv.euroamerica.cl/WA_RRVV/rest/calendario/anios';
  // urlDetalle = 'http://rrvv.euroamerica.cl/WA_RRVV/rest/calendario/detalle';

  //urlConsulta = 'http://54.89.0.19:8080/eeaa-movil-web/rest/calendario/anios';
  //urlDetalle  = 'http://54.89.0.19:8080/eeaa-movil-web/rest/calendario/detalle';


  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient) { }

  anios(): Observable<any> {
    return this.http.get(this.urlConsulta);
  }

  detalle(anio:any): Observable<any> {
    let params = {
      anio: anio
    };
    return this.http.post(this.urlDetalle, params);
  }
}
