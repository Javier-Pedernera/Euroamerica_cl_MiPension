import { Platform } from '@ionic/angular';
import { Inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { LoginResponse } from './../models/interface';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _storage: Storage | null = null;
  authenticationState = new BehaviorSubject(false);
  //desarrollo
  urlLogin = 'https://rrvvdesa.euroamerica.cl/WA_RRVV/rest/usuario/login';
  urlConsultar = 'https://rrvvdesa.euroamerica.cl/WA_RRVV/rest/usuario/consultar';
  //produccion
  // urlLogin = 'https://rrvv.euroamerica.cl/WA_RRVV/rest/usuario/login';
  // urlConsultar = 'https://rrvv.euroamerica.cl/WA_RRVV/rest/usuario/consultar';

  //urlLogin = 'http://54.89.0.19:8080/eeaa-movil-web/rest/usuario/login';
  //urlConsultar = 'http://54.89.0.19:8080/eeaa-movil-web/rest/usuario/consultar';

  constructor(
    private storage: Storage,
    private plt: Platform,
    private http: HttpClient,
    public alertController: AlertController,
    private router: Router) {
    this.init();
    // this.showDevelopmentAlert();
  }

  async init() {
    // Crear la base de datos antes de su uso
    this._storage = await this.storage.create();
    this.checkToken();
  }

  async checkToken() {
    const res = await this._storage?.get(TOKEN_KEY);
    if (res) {
      this.authenticationState.next(true);
    }
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Validación',
      message: mensaje,
      buttons: [{
        text: 'Aceptar',
        handler: () => {
        }
      }]
    });

    await alert.present();
  }
  //codigo nuevo
  async login(rut: string, clave: string) {
    const tokenPush = await this.getTokenPush();
    console.log("tokenpush desde getToken",tokenPush);

    const credentials = {
      "rut": rut,
      "clave": clave,
      "tokenDevice":
      tokenPush
      // "dkyc-063Zm8:APA91bHjyGr1kkQ6Aqy8BXIVH9xvfMFe5rOFJM7D-_yCIg0OOEz81s7VZahw_Kgjyt-FRBsufzDJKszrbjytbMDRiCLgkw07PLu414sZdLCudSnXAUaf1GrXYY9oyf04271p-qOr2-6N"
    };
    console.log("credenciales de login",credentials);

    this.http.post<LoginResponse>(this.urlLogin, credentials).subscribe((data) => {
      // console.log(data);
      if (data.success === true) {
        this.http.post<LoginResponse>(this.urlConsultar, { rut: rut }).subscribe(async (data2) => {
          // console.log("data2",data2);
          data2.datos.rut1 = rut;
          data2.datos.clave = clave;
          await this._storage?.set('datos', data2.datos);
          await this._storage?.set(TOKEN_KEY, data.Token);
//seteo token push para autorizacion de rutas
          await this._storage?.set('token_push', data.Token);
          this.authenticationState.next(true);
        });
      } else {
        this.presentAlert(data.mensaje);
      }
    });
  }
  async logout() {
    await this._storage?.remove('datos');
    await this._storage?.remove(TOKEN_KEY);
    this.authenticationState.next(false);
  }
  isAuthenticated() {
    return this.authenticationState.value;
  }

  async getDatos(): Promise<any> {

    return this._storage?.get('datos');
  }

  async getDatosHuella(): Promise<any> {
    return this._storage?.get('credenciales');
  }

  async getToken() {
    return this._storage?.get(TOKEN_KEY);
  }

  async setTokenPush(tokenPush: string) {
    await this._storage?.set('token_push', tokenPush);
  }

  async getTokenPush() {
    return this._storage?.get('token_push');
  }

  // isDevelopmentMode(): boolean {
  //   return this.urlLogin.includes('desa');
  // }
  // async showDevelopmentAlert() {
  //   console.log("Checking if development mode");
  //   if (this.isDevelopmentMode()) {
  //     const alert = await this.alertController.create({
  //       header: 'Modo Desarrollo',
  //       message: 'La aplicación se está ejecutando en modo desarrollo.',
  //       buttons: ['OK']
  //     });
  //     await alert.present();
  //   }
  // }
}
