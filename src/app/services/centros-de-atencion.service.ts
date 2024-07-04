import { Injectable } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CentrosDeAtencionService {
//desarrollo
urlConsulta = 'https://rrvvdesa.euroamerica.cl/WA_RRVV/rest/centro/localidades';
urlDetalle = 'https://rrvvdesa.euroamerica.cl/WA_RRVV/rest/centro/sucursales';
//produccion
  // urlConsulta = 'https://rrvv.euroamerica.cl/WA_RRVV/rest/centro/localidades';
  // urlDetalle = 'https://rrvv.euroamerica.cl/WA_RRVV/rest/centro/sucursales';
  
  //urlConsulta = 'http://54.89.0.19:8080/eeaa-movil-web/rest/centro/localidades';
  //urlDetalle  = 'http://54.89.0.19:8080/eeaa-movil-web/rest/centro/sucursales';
  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient) { }

  localidades(): Observable<any> {
    return this.http.get(this.urlConsulta);
  }

  detalle(localidad:any): Observable<any> {
    let params = {
      localidad: localidad
    };
    return this.http.post(this.urlDetalle, params);
  }
}
