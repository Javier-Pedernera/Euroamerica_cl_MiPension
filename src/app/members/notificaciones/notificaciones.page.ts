import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { NotificacionesService } from './../../services/notificaciones.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Datos, Notificacion, Notificaciones, NotificacionBase64 } from './../../models/interface';
import { LoadingController, AlertController } from '@ionic/angular';
import { EventService } from './../../services/event.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  listado: Array<Notificacion> = [];
  isLoading: boolean = false;

  constructor(
    private platform: Platform,
    private file: File,
    private authenticationService: AuthenticationService,
    private fileOpener: FileOpener,
    private noti: NotificacionesService,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public eventService: EventService
  ) {
    console.log(this.listado);
  }

  ngOnInit() {
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Validación',
      message: mensaje,
      buttons: [{
        text: 'Aceptar',
        handler: () => {}
      }]
    });

    await alert.present();
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

  convertBaseb64ToBlob(b64Data: string, contentType: string): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  saveAndOpenPdf(pdf: string, filename: string) {
    const writeDirectory = this.platform.is('ios') ? this.file.documentsDirectory : this.file.dataDirectory;

    this.file.writeFile(writeDirectory, filename, this.convertBaseb64ToBlob(pdf, 'data:application/pdf;base64'), { replace: true })
      .then((success) => {
        this.dismissLoading();
        this.fileOpener.open(writeDirectory + filename, 'application/pdf')
          .then(() => console.log('File is opened'))
          .catch(e => console.log('Error opening file' + e))
      })
      .catch(() => {
        console.log('Error writing pdf file');
        this.dismissLoading();
      });
  }

  ionViewWillEnter() {
    this.authenticationService.getDatos().then((data: Datos) => {
      this.noti.consultar(data.rut1).subscribe((data1: Notificaciones) => {
        this.listado = data1.Notificaciones;
        console.log(this.listado);

        this.eventService.publish('notificaciones:total', this.listado.length);
      });
    });
  }

  obtener(id: number) {
    this.authenticationService.getDatos().then((data: Datos) => {
      this.noti.obtener(data.rut1, id.toString()).subscribe((data1: NotificacionBase64) => {
        if (!data1.success) {
          this.presentAlert('Documento no disponible, contacte a su ejecutivo.');
        } else {
          this.presentLoading();
          this.saveAndOpenPdf(data1.NotificacionB64, 'Notificacion.pdf');
        }
      });
    });
  }

}
