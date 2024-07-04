import { AuthenticationService } from './../../services/authentication.service';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { rutFormat, rutValidate } from 'rut-helpers';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { CredencialesHuella } from './../../models/interface';
import { AlertController, LoadingController } from '@ionic/angular';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  huellaOk = true;
  rut!: string;
  clave!: string;
  isLoading: boolean = false;
  tokenPush!: string;

  constructor(
    @Inject(FingerprintAIO) private faio: FingerprintAIO,
    public alertController: AlertController,
    private authService: AuthenticationService,
    public loadingCtrl: LoadingController,
    public eventService: EventService,
  ) { }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.rut = '';
    this.clave = '';
    this.huellaOk = true;

    this.authService.getDatosHuella().then((data) => {
      console.log('getDatosHuella', data);
      if (data !== null) {
        this.huellaOk = false;
      }
    });

    this.eventService.subscribe('tokenPush', (tokenPush: string) => {
      this.tokenPush = tokenPush;
    });
  }

  ngOnInit() {
    //console.log('hola');
  }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      duration: 5000,
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => console.log());
        }
      });
    });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Validación',
      message: mensaje,
      buttons: [{
        text: 'Aceptar',
        handler: () => { }
      }]
    });

    await alert.present();
  }

  login(form: NgForm) {
    if (form.value.rut.length === 0 && form.value.clave.length === 0) {
      this.presentAlert('- Debe Ingresar Rut<br />- Debe Ingresar Clave');
    } else {
      if (form.value.clave.length === 0) {
        if (rutValidate(form.value.rut) === true) {
          this.presentAlert('- Debe Ingresar Clave');
        } else {
          this.presentAlert('- Rut Inválido<br />- Debe Ingresar Clave');
        }
      } else {
        if (form.value.rut.length === 0) {
          this.presentAlert('- Debe Ingresar Rut');
        } else {
          if (rutValidate(form.value.rut) === true) {
            const rut = form.value.rut.replace(/\./g, '');
            const clave = form.value.clave;
            this.authService.login(rut, clave);
          } else {
            this.presentAlert('- Rut Inválido');
          }
        }
      }
    }
  }

  formatRut() {
    this.rut = rutFormat(this.rut);
  }

  loginHuella() {
    this.faio.show({
      title: 'Entrar con mi huella digital',
      subtitle: '',
      description: 'Authenticate',
      fallbackButtonTitle: 'Use Backup',
      disableBackup: true,
    })
      .then((result: any) => {
        if (result === 'biometric_success' || result === 'Success') {
          this.authService.getDatosHuella().then((data: CredencialesHuella) => {
            this.authService.login(data.rut, data.clave);
          });
        }
      })
      .catch((error: any) => console.log(error));
  }
}
