import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  //desarrollo
  urlConsulta = 'https://rrvvdesa.euroamerica.cl/WA_RRVV/rest/notificaciones/consultar';
  // urlObtener = 'https://rrvvdesa.euroamerica.cl/WA_RRVV/rest/notificaciones/obtener';
  //produccion
  // urlConsulta = 'https://rrvv.euroamerica.cl/WA_RRVV/rest/notificaciones/consultar';
  urlObtener = 'https://rrvv.euroamerica.cl/WA_RRVV/rest/notificaciones/obtener';

  constructor(private http: HttpClient) { }

  consultar(rut:any): Observable<any> {
    let params = {
      rut: rut
    };
    return this.http.post(this.urlConsulta, params);
  }

  obtener(rut:any, id:any): Observable<any> {
    let params = {
      rut: rut,
      id: id
    };
    return this.http.post(this.urlObtener, params);
  }
}
