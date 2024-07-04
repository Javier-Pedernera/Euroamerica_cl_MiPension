import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { Datos, Notificaciones } from './models/interface';
import { Push, PushObject, PushOptions } from '@awesome-cordova-plugins/push/ngx';
import { Storage } from '@ionic/storage-angular';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { NotificacionesService } from './services/notificaciones.service';
import { EventService } from './services/event.service';
import { register } from 'swiper/element/bundle';

register();
interface ExtendedNavigator extends Navigator {
  app: {
    exitApp: () => void;
  };
}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  ishidden = true;
  totalNotificaciones = 0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public alertCtrl: AlertController,
    private authenticationService: AuthenticationService,
    private router: Router,
    private push: Push,
    private storage: Storage,
    private noti: NotificacionesService,
    private eventService: EventService, // Servicio de eventos personalizado
    private diagnostic: Diagnostic
  ) {
    this.initializeApp();
  }

  ionViewWillEnter() {
    console.log('AppComponent-ionViewWillEnter ....');
  }

  async initializeApp() {
    await this.storage.create();
    this.platform.ready().then(() => {
      console.log('AppComponent-initializeApp');
      // this.authenticationService.showDevelopmentAlert();
      this.platform.resume.subscribe(async () => {
        // Está logeado, obtener notificaciones
        this.actualizarnotificaciones();
      });

      this.eventService.subscribe('notificaciones:total', (totalNotificaciones: number) => {
        this.totalNotificaciones = totalNotificaciones;
      });

      this.platform.backButton.subscribeWithPriority(9999, () => {
        if (this.router.url === '/login') {
          (navigator as unknown as ExtendedNavigator).app.exitApp();
        } else {
          this.router.navigate(['members', 'dashboard']);
        }
      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initPushNotification();

      this.authenticationService.authenticationState.subscribe(state => {
        console.log('this.authenticationService.authenticationState.subscribe=' + state);
        if (state) {
          this.authenticationService.getDatos().then((data: Datos) => {
            if (!data.cambiarClave) {
              this.ishidden = false;
              this.router.navigate(['members', 'dashboard']);
            } else {
              this.router.navigate(['members', 'validacion-de-datos']);
            }
          });
        } else {
          this.ishidden = true;
          this.router.navigate(['login']);
        }
      });
    });
  }

  logout() {
    console.log('AppComponent::logout');
    this.authenticationService.logout();
  }

  home() {
    this.router.navigate(['members', 'dashboard']);
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertCtrl.create({
      message: `<pre>${mensaje}</pre>`,
      buttons: [{
        text: 'Ok',
        handler: () => {}
      }]
    });

    await alert.present();
  }

  initPushNotification() {
    // Comprobar si tenemos permiso
    this.push.hasPermission().then((res: any) => {
      if (res.isEnabled) {
        console.log('We have permission to send push notifications');
      } else {
        console.log('We do not have permission to send push notifications');
      }
    });

    const options: PushOptions = {
      android: {},
      ios: {
        alert: 'true',
        badge: 'true',
        sound: 'true',
        clearBadge: true
      },
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log('device token:', data.registrationId);
      const deviceToken = "dkyc-063Zm8:APA91bHjyGr1kkQ6Aqy8BXIVH9xvfMFe5rOFJM7D-_yCIg0OOEz81s7VZahw_Kgjyt-FRBsufzDJKszrbjytbMDRiCLgkw07PLu414sZdLCudSnXAUaf1GrXYY9oyf04271p-qOr2-6N"
      this.authenticationService.setTokenPush(deviceToken);
      this.eventService.publish('tokenPush', deviceToken);
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log(data);
      this.actualizarnotificaciones();
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  actualizarnotificaciones() {
    if (this.authenticationService.isAuthenticated()) {
      this.authenticationService.getDatos().then((data: Datos) => {
        this.noti.consultar(data.rut1).subscribe((data1: Notificaciones) => {
          this.totalNotificaciones = data1.Notificaciones.length;
          this.eventService.publish('notificaciones:total', data1.Notificaciones.length);
        });
      });
    }
  }
}
