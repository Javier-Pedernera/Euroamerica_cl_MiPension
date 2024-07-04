import { Injectable } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MisDocumentosService {

  //desarrollo
  urlPoliza = 'https://rrvvdesa.euroamerica.cl/WA_RRVV/rest/documentos/consultar-polizas';
  urlPdf = 'https://rrvvdesa.euroamerica.cl/WA_RRVV/rest/documentos/pdf';
  //produccion
  // urlPoliza = 'https://rrvv.euroamerica.cl/WA_RRVV/rest/documentos/consultar-polizas';
  // urlPdf = 'https://rrvv.euroamerica.cl/WA_RRVV/rest/documentos/pdf';

  //urlPoliza = 'http://54.89.0.19:8080/eeaa-movil-web/rest/documentos/consultar-polizas';
  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient) { }

  polizas(rut:any): Observable<any> {

    let credentials = {
      rut: rut
    };

    //
    return this.http.post(this.urlPoliza, credentials);
  }

  documento(rut:any, poliza:any, docto:any): Observable<any> {
    let parametros = {
      rut: rut,
      poliza: poliza,
      docto: docto
    };

    //
    return this.http.post(this.urlPdf, parametros);
  }

}
