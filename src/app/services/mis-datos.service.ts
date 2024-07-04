import { Injectable } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MisDatosService {
//desarrollo
urlConsulta = 'https://rrvvdesa.euroamerica.cl/WA_RRVV/rest/usuario/consultar-mis-datos';
urlActualizar = 'https://rrvvdesa.euroamerica.cl/WA_RRVV/rest/usuario/actualizar-mis-datos';
//produccion
  // urlConsulta = 'https://rrvv.euroamerica.cl/WA_RRVV/rest/usuario/consultar-mis-datos';
  // urlActualizar = 'https://rrvv.euroamerica.cl/WA_RRVV/rest/usuario/actualizar-mis-datos';

  //urlConsulta = 'http://54.89.0.19:8080/eeaa-movil-web/rest/usuario/consultar-mis-datos';
  //urlActualizar = 'http://54.89.0.19:8080/eeaa-movil-web/rest/usuario/actualizar-mis-datos';

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient) { }

  consulta(rut:any): Observable<any> {

    let credentials = {
      rut: rut
    };

    //
    return this.http.post(this.urlConsulta, credentials);
  }

  actualizar(rut: string, email: string, direccion: string, celular: string, telefono: string, autoriza: boolean, idComuna: string): Observable<any> {

    let params = {
      rut: rut,
      email: email,
      direccion: direccion,
      celular: celular,
      telefono: telefono,
      autoriza: autoriza,
      idComuna: idComuna
    };
console.log(params);

    //
    const response = this.http.post(this.urlActualizar, params);
    console.log("respuesta de actualizacion", response);

    return response
  }
}
