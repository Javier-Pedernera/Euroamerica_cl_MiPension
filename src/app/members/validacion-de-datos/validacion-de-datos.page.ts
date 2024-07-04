import { Component, OnInit } from '@angular/core';
import { Datos } from './../../models/interface';
import { AuthenticationService } from './../../services/authentication.service';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './../../models/interface';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-validacion-de-datos',
  templateUrl: './validacion-de-datos.page.html',
  styleUrls: ['./validacion-de-datos.page.scss'],
})
export class ValidacionDeDatosPage implements OnInit {
  //desarrollo
  urlValidar = 'https://rrvvdesa.euroamerica.cl/WA_RRVV/rest/usuario/validar';
  // urlValidar = 'https://rrvv.euroamerica.cl/WA_RRVV/rest/usuario/validar';

  //urlValidar = 'http://54.89.0.19:8080/eeaa-movil-web/rest/usuario/validar';

  telefono!: string;
  email!: string;
  rut!: string;

  clave!: string;
  reclave!: string;

  ishidden = true;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private authenticationService: AuthenticationService,
    private router: Router,
    public alertController: AlertController) { }

  ngOnInit() {
    this.authenticationService.getDatos().then((data: Datos) => {
      this.telefono = data.telefono;
      this.email = data.email;
      this.rut = data.rut+"-"+data.dv;
    });
  }

  validateCelular() {
    this.telefono = this.telefono.replace(/[^0-9.-]/g, '');
  }

  async presentAlert(mensaje:any) {
    const alert = await this.alertController.create({
      //header: 'Alert',
      //subHeader: 'Subtitle',
      header: 'Validación',
      message: mensaje,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  validar() {
    console.log('hola');
    if ( this.clave !== undefined &&
        this.reclave !== undefined &&
        this.clave.length > 7 &&
        this.reclave.length > 7) {
      if ( this.clave === this.reclave ) {
        if ( /^(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/.test(this.clave) === true ) {
          this.ishidden = false;
        } else {
          this.ishidden = true;
        }
      } else {
        this.ishidden = true;
      }
    } else {
      this.ishidden = true;
    }
  }

  async presentAlert1(mensaje:any) {
    const alert = await this.alertController.create({
      header: 'Validación',
      //subHeader: 'Subtitle',
      message: mensaje,
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.clave = '';
          this.reclave = '';
          this.ishidden = true;
        }
      }]
    });

    await alert.present();
  }

  async presentOk(rut:any, clave:any) {
    const alert = await this.alertController.create({
      header: 'Información',
      message: 'Su clave fue ingresada con éxito ENTRAR',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.storage.remove('credenciales').then( async () => {
            await this.storage.remove('huella');
            this.authenticationService.login(rut, clave);
          });
        }
      }]
    });

    await alert.present();
  }

  actualizar() {

    if ( this.clave !== undefined &&
         this.reclave !== undefined &&
         this.clave.length > 7 &&
         this.reclave.length > 7) {
      if ( this.clave === this.reclave ) {
        if ( /^(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/.test(this.clave) === true ) {

          // validar correo. /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          if ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.email) === true )
          {
            if ( /^[0-9]{9}$/.test(this.telefono) === true ) {
              const params = {
                rut: this.rut,
                celular: this.telefono,
                email: this.email,
                clave: this.clave
              };
              //console.log(params);
              this.http.post<LoginResponse>(this.urlValidar, params).subscribe((data) => {
                console.log(data);
                //this.authenticationService.logout();
                if ( data.success === false ) {
                  this.presentAlert1(data.mensaje);
                } else {
                  this.presentOk(this.rut, this.clave);
                }
              });
            } else {
              this.presentAlert('Teléfono incorrecto');
            }
          } else {
            this.presentAlert('Email incorrecto');
          }
        } else {
          this.presentAlert(
            'Recuerde que la clave debe ser alfanumérica entre 8 y 12 caracteres.' +
            'Además debe tener mínimo una letra mayúscula.');
        }
      } else {
        this.presentAlert('Las claves no son iguales');
      }
    } else {
      this.presentAlert('Ingrese la nueva clave');
    }
  }

}
