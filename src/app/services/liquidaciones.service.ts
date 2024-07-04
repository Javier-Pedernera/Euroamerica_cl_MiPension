import { Injectable } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LiquidacionesService {
//desarrollo
urlLiqConsultar = 'https://rrvvdesa.euroamerica.cl/WA_RRVV/rest/liquidacion/consultar';
urlPdf = 'https://rrvvdesa.euroamerica.cl/WA_RRVV/rest/documentos/pdf';
//produccion
  // urlLiqConsultar = 'https://rrvv.euroamerica.cl/WA_RRVV/rest/liquidacion/consultar';
  // urlPdf = 'https://rrvv.euroamerica.cl/WA_RRVV/rest/documentos/pdf';

  //urlLiqConsultar = 'http://54.89.0.19:8080/eeaa-movil-web/rest/liquidacion/consultar';
  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient) { }

  consultar(rut:any): Observable<any> {

    let parametros = {
      rut: rut
    };

    //
    return this.http.post(this.urlLiqConsultar, parametros);
  }

  pdf(rut:any, poliza:any, docto:any): Observable<any> {

    let parametros = {
      rut: rut,
      poliza: poliza,
      docto: docto
    };

    //
    return this.http.post(this.urlPdf, parametros);
  }
}
