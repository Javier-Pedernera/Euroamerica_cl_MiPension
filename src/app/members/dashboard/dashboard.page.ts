import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { NotificacionesService } from './../../services/notificaciones.service';
import { Datos, CredencialesHuella, Notificaciones } from './../../models/interface';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'; // Asegúrate de que esta importación sea correcta
import { EventService } from '../../services/event.service'; // Servicio de eventos personalizado
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  tokenPush!: string;
  totalNotificaciones = 0;
  data: Datos | null = null;

  constructor(
    private authenticationService: AuthenticationService,
    public alertController: AlertController,
    @Inject(Storage) private storage: Storage,
    private noti: NotificacionesService,
    private eventService: EventService, // Servicio de eventos personalizado
    @Inject(FingerprintAIO) private faio: FingerprintAIO,
  ) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Información',
      message: 'Huella digital registrada',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async presentAlertConfirm(rut: string, clave: string) {
    const alert1 = await this.alertController.create({
      header: 'Confirmar',
      message: 'Permitir acceso con huella digital',
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancelar',
          cssClass: 'secondary',
          handler: async () => {
            await this.storage.set('huella', false);
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.faio.show({
                title: 'Registrar mi huella digital',
                subtitle: '',
                description: 'Authenticate',
                fallbackButtonTitle: 'Use Backup',
                disableBackup: true,
            })
            .then((result: any) => {
              if ( result === 'biometric_success' || result === 'Success') {
                const credentials = {
                  'rut': rut,
                  'clave': clave
                };
                this.storage.set('credenciales', credentials).then(() => {
                  this.presentAlert();
                });
              }
            })
            .catch((error: any) => alert(error));
          }
        }
      ]
    });

    await alert1.present();
  }

  ngOnInit() {
    this.eventService.subscribe('tokenPush', (tokenPush) => {
      this.tokenPush = tokenPush;
    });

    this.eventService.subscribe('notificaciones:total', (total) => {
      this.totalNotificaciones = total;
    });
  }

  ionViewWillEnter() {
    this.authenticationService.getDatos().then(async (data: Datos) => {
      this.data = data;

      // Obtener token push
      this.authenticationService.getTokenPush().then(tokenPush => {
        this.tokenPush = tokenPush;
      });

      let huella = await this.storage.get('huella');
      console.log('Huella: ', huella);

      this.authenticationService.getDatosHuella().then((data1: CredencialesHuella) => {
        console.log('CredencialesHuella: ', data1);
        if (data1 === null && huella === null) {
          this.faio.isAvailable().then(result => {
            this.presentAlertConfirm(data.rut1, data.clave);
          });
        }
      });

      this.noti.consultar(data.rut1).subscribe((data1: Notificaciones) => {
        this.totalNotificaciones = data1.Notificaciones.length;
        this.eventService.publish('notificaciones:total', data1.Notificaciones.length);
      });
    });
  }
}



// import { Component, OnInit } from '@angular/core';
// import { AuthenticationService } from './../../services/authentication.service';
// import { NotificacionesService } from './../../services/notificaciones.service';
// import { Datos, CredencialesHuella, Notificaciones } from './../../models/interface';
// import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
// import { AlertController, Events } from '@ionic/angular';
// import { Storage } from '@ionic/storage';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.page.html',
//   styleUrls: ['./dashboard.page.scss'],
// })
// export class DashboardPage implements OnInit {

//   tokenPush;
//   totalNotificaciones = 0;

//   data: Datos;
//   constructor(
//     private authenticationService: AuthenticationService,
//     public alertController: AlertController,
//     private storage: Storage,
//     private noti: NotificacionesService,
//     public events: Events,
//     private faio: FingerprintAIO) { }

//   async presentAlert() {
//     const alert = await this.alertController.create({
//       header: 'Información',
//       message: 'Huella digital registrada',
//       buttons: ['Aceptar']
//     });

//     await alert.present();
//   }

//   async presentAlertConfirm(rut, clave) {
//     const alert1 = await this.alertController.create({
//       header: 'Confirmar',
//       message: 'Permitir acceso con huella digital',
//       buttons: [
//         {
//           text: 'Cancelar',
//           role: 'Cancelar',
//           cssClass: 'secondary',
//           handler: async (blah) => {
//             await this.storage.set('huella', false);
//           }
//         }, {
//           text: 'Aceptar',
//           handler: () => {

//             this.faio.show({
//                 title: 'Registrar mi huella digital',
//                 subtitle: '',
//                 description: 'Authenticate',
//                 fallbackButtonTitle: 'Use Backup',
//                 disableBackup: true,
//                 //localizedFallbackTitle: 'Use Pin', //Only for iOS
//                 //localizedReason: 'Please authenticate' //Only for iOS
//             })
//             .then((result: any) => {
//               //alert('Result=' + result);
//               if ( result === 'biometric_success' || result === 'Success') {
//                 const credentials = {
//                   'rut': rut,
//                   'clave': clave
//                 };
//                 this.storage.set('credenciales', credentials).then(() => {
//                   this.presentAlert();
//                 });
//               }
//             })
//             .catch((error: any) => alert(error));
//           }
//         }
//       ]
//     });

//     await alert1.present();
//   }

//   ngOnInit() {
//   }

//   ionViewWillEnter() {

//     this.authenticationService.getDatos().then( async (data: Datos) => {
//       this.data = data;

//       //obtener token push
//       this.authenticationService.getTokenPush().then( tokenPush => {
//         this.tokenPush = tokenPush;
//       });


//       let huella = await this.storage.get('huella');
//       console.log('Huella: ', huella);

//       this.authenticationService.getDatosHuella().then((data1: CredencialesHuella) => {
//         console.log('CredencialesHuella: ', data1);
//         if ( data1 === null && huella === null) {
//           this.faio.isAvailable().then(result => {
//             //alert(result);
//             //if ( result === 'biometric') {
//               this.presentAlertConfirm(data.rut1, data.clave);
//             //}
//           });
//         }
//       });


//     });


//     this.authenticationService.getDatos().then((data: Datos) => {
//       this.noti.consultar(data.rut1).subscribe((data1: Notificaciones) => {
//         this.totalNotificaciones = data1.Notificaciones.length;
//         this.events.publish('notificaciones:total', data1.Notificaciones.length);
//       });
//     });
//   }

// }
