import { Component, ViewChild, ElementRef, OnInit, InputDecorator } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { LoginResponse } from './../../models/interface';
import { rutValidate, rutFormat } from 'rut-helpers';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Storage } from '@ionic/storage';
// import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-solicitud-clave',
  templateUrl: './solicitud-clave.page.html',
  styleUrls: ['./solicitud-clave.page.scss'],
})
export class SolicitudClavePage implements OnInit {

  @ViewChild('captchaRef2', { static: true }) captchaRef2!: ElementRef<any>;

  private _reCaptchaId!: number;
  private SITE_ID = '6LcVu8QUAAAAAFoFJGjXNDcj16nGI3Ed4n6Z469W';
  // desarrollo
  urlConsultar = 'https://rrvvdesa.euroamerica.cl/WA_RRVV/rest/usuario/consultar';
  //produccion
  // urlConsultar = 'https://rrvv.euroamerica.cl/WA_RRVV/rest/usuario/consultar';

  //urlConsultar = 'http://54.89.0.19:8080/eeaa-movil-web/rest/usuario/consultar';


  //desarrollo
  urlRecuperar = 'https://rrvvdesa.euroamerica.cl/WA_RRVV/rest/usuario/recuperar';
  //produccion
  // urlRecuperar = 'https://rrvv.euroamerica.cl/WA_RRVV/rest/usuario/recuperar';

  //urlRecuperar = 'http://54.89.0.19:8080/eeaa-movil-web/rest/usuario/recuperar';

  ishidden = true;
  showCaptcha = true;
  captchaOk = true;
  sinData = true;

  checkboxSMS = true;
  checkboxMail = true;

  rut!: string;
  telefono!: string;
  email!: string;
  rut1!: string;

  constructor(
      private http: HttpClient,
      public alertController: AlertController,
      private cd: ChangeDetectorRef,
      private storage: Storage,
      private router: Router) {}

  ngOnInit() {
    const grecaptcha = (window as any).grecaptcha;
    if (grecaptcha) {
      this._reCaptchaId = grecaptcha.render(this.captchaRef2.nativeElement, {
        'sitekey': this.SITE_ID,
        'callback': (resonse:any) => this.reCapchaSuccess(resonse),
        'expired-callback': () => this.reCapchaExpired()
      });
    }
  }


  reCapchaSuccess(data:any){
    if ( data ) {
      this.captchaOk = false;
      this.cd.detectChanges();
      //alert("Congratulation! reCAPTCHA verified.")
      // Some logic goes here
    }
  }

  reCapchaExpired(){
    this.captchaOk = true;
    //alert("Oops! reCAPTCHA expired.")
    // Some logic goes here
  }

  //https://github.com/platanus/rut-helpers
  formatRut() {
    this.rut = rutFormat(this.rut);
  }

  consultar() {

    this.ishidden = true;
    this.showCaptcha = true;
    this.captchaOk = true;
    this.sinData = true;
    this.checkboxSMS = false;
    this.checkboxMail = false;

    this.telefono = '';
    this.email = '';

    if ( rutValidate(this.rut) === true ) {
      this.rut1 = this.rut.replace(/\./g, '');
      console.log(this.rut1);
      this.http.post<LoginResponse>(this.urlConsultar,
      { rut: this.rut1 }).subscribe((data) => {
        console.log(data);
        if ( data.success === true ) {
          if ( data.datos.email !== null && data.datos.telefono !== null &&
              data.datos.email.length > 0 && data.datos.telefono.length > 0 ) {
            this.showCaptcha = false;
            this.sinData = true;
            this.telefono = data.datos.telefono;
            this.email = data.datos.email;
          } else {
            this.sinData = false;
          }

        } else {
          this.presentAlert('El usuario no esta registrado');
        }
      });
    } else {
      this.presentAlert('Ingrese RUT válido');
    }
  }

  async presentAlert(mensaje:any) {
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

  async presentOk(mensaje:any) {
    const alert = await this.alertController.create({
      header: 'Información',
      message: mensaje,
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.storage.remove('credenciales').then( async (data) => {
            await this.storage.remove('huella');
            console.log('credencuales borradas...');
            this.router.navigate(['login']);
          });
        }
      }]
    });

    await alert.present();
  }

  solicitar() {
    //this.rut = '15491071-9';

    const medio = this.checkboxMail ? 'email' : 'sms';

    const params = { rut: this.rut1, medio: medio};
    this.http.post<LoginResponse>(this.urlRecuperar, params).subscribe((data) => {
      console.log(data);
      this.presentOk(data.mensaje);
    });
  }

  change1() {
    if (this.checkboxSMS) {
      this.checkboxMail = false;
      this.checkboxSMS = false;
    } else {
      this.checkboxMail = false;
      this.checkboxSMS = true;
    }

    this.cd.detectChanges();

    if ( this.checkboxMail === false && this.checkboxSMS === false ) {
      this.ishidden = true;
    } else {
      this.ishidden = false;
    }
  }

  change2() {
    if (this.checkboxMail) {
      this.checkboxMail = false;
      this.checkboxSMS = false;
    } else {
      this.checkboxMail = true;
      this.checkboxSMS = false;
    }
    this.cd.detectChanges();

    if ( this.checkboxMail === false && this.checkboxSMS === false ) {
      this.ishidden = true;
    } else {
      this.ishidden = false;
    }

  }
}
