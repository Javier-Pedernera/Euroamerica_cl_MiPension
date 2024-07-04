import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable, throwError, from} from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AuthenticationService } from './../services/authentication.service';

const TOKEN_KEY = 'auth-token';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    isLoading: boolean = false;
    private _storage: Storage | null = null;
    constructor(
        public loadingCtrl: LoadingController,
        public storage: Storage,
        public alertController: AlertController,
        private authService: AuthenticationService,
        private toastCtrl: ToastController,
    ) {
      this.init();
     }
    async init() {
      this._storage = await this.storage.create();
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // console.log("storage en el interceptor", this.storage);
        return from(this.getToken()).pipe(
            switchMap(token => {
              console.log("token en switch",token);

            if (token) {
                request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
            }
            this.presentLoading();
            return next.handle(request).pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        // Cerramos el loading en el fin de la llamada
                        this.dismissLoading();
                    }
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    console.error(error);
                    this.dismissLoading();
                    // Presentamos un toast con el mensaje de error
                    // this.presentErrorToast('El servicio no está disponible en estos momentos. Por favor, intente más tarde');
                    // this.authService.logout();
                    this.presentAlert();
                    return throwError(error);
                })
            );
            })
        );
    }

    async getToken(): Promise<string | null> {
      const token = await this._storage?.get(TOKEN_KEY);
      return token;
    }

    // Presenta el toast con el error
    async presentErrorToast(msg:any) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top',
            color: 'danger',
            cssClass: 'toast',
            buttons: [
                {
                    side: 'end',
                    text: 'Cerrar',
                    role: 'cancel'
                }
            ]
        });
        toast.present();
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

    async presentAlert() {
        const alert = await this.alertController.create({
          header: 'Información',
          message: 'El servicio no está disponible en estos momentos. Por favor, intente más tarde',
          buttons: [{
            text: 'Aceptar',
            handler: () => {
                this.authService.logout();
            }
          }]
        });
        await alert.present();
      }
}
