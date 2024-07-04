import { Component, Inject, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { Datos, PolizaResponse } from './../../models/interface';
import { Platform } from '@ionic/angular';
import { File } from '@awesome-cordova-plugins/file/ngx';

import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { LoadingController, AlertController } from '@ionic/angular';
import { MisDocumentosService } from './../../services/mis-documentos.service';

@Component({
  selector: 'app-mis-documentos',
  templateUrl: './mis-documentos.page.html',
  styleUrls: ['./mis-documentos.page.scss'],
})
export class MisDocumentosPage implements OnInit {

  documento: string;
  isLoading: boolean = false;
  polizas!: Array<string>;

  constructor(
    private platform: Platform,
    // @Inject(FileTransfer) private transfer: FileTransfer,
    @Inject(FileOpener) private fileOpener: FileOpener,
    @Inject(File) private file: File,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    private authenticationService: AuthenticationService,
    private misdoc: MisDocumentosService) {
    this.documento = 'certificados';
  }

  ngOnInit() {
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

  onItemChange(event:any) {
    this.documento = event.target.value;

    if (this.documento === 'polizas') {
      this.authenticationService.getDatos().then((data: Datos) => {
        this.misdoc.polizas(data.rut1).subscribe((data1: PolizaResponse) => {
          console.log(data1);
          this.polizas = data1.polizas;
        });
      });
    }
  }

  convertBaseb64ToBlob(b64Data:any, contentType:any): Blob {
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

  async presentAlertRadio(polizas: string[], rut1: string, tipo: string) {
    const inputsPolizas = polizas.map((poliza, index) => ({
      name: `radio${index + 1}`,
      type: 'radio' as const,  // Cast 'radio' to 'const' to ensure type compatibility
      label: poliza,
      value: poliza,
      checked: index === 0
    }));

    const alert = await this.alertController.create({
      header: 'Pólizas',
      inputs: inputsPolizas,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: (poliza) => {
            console.log('Confirm Ok', poliza);

            this.misdoc.documento(rut1, poliza, tipo).subscribe(result => {
              console.log(result);
              if (result.doctoBase64 === null) {
                this.presentAlert('Documento no disponible, contacte a su ejecutivo.');
              } else {
                this.presentLoading();
                this.saveAndOpenPdf(result.doctoBase64, 'Documento.pdf');
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  descargarDoc(tipo:any) {
    this.authenticationService.getDatos().then((data: Datos) => {
      this.misdoc.polizas(data.rut1).subscribe((data1: PolizaResponse) => {
        if (data1.polizas.length === 1) {
          this.misdoc.documento(data.rut1, data1.polizas[0], tipo).subscribe(result => {
            if (result.doctoBase64 === null) {
              this.presentAlert('Documento no disponible, contacte a su ejecutivo.');
            } else {
              this.presentLoading();
              this.saveAndOpenPdf(result.doctoBase64, 'Documento.pdf');
            }
          });
        } else {
          this.presentAlertRadio(data1.polizas, data.rut1, tipo);
        }
      });
    });
  }

  descargarDocTributario() {
    this.authenticationService.getDatos().then((data: Datos) => {
      this.misdoc.documento(data.rut1, '', 'tributario').subscribe(result => {
        if (result.doctoBase64 === null) {
          this.presentAlert('Documento no disponible, contacte a su ejecutivo.');
        } else {
          this.presentLoading();
          this.saveAndOpenPdf(result.doctoBase64, 'Documento.pdf');
        }
      });
    });
  }

  descargarPoliza(numeroPoliza:any) {
    this.authenticationService.getDatos().then((data: Datos) => {
      this.misdoc.documento(data.rut1, numeroPoliza, 'poliza').subscribe(result => {
        if (result.doctoBase64 === null) {
          this.presentAlert('Documento no disponible, contacte a su ejecutivo.');
        } else {
          this.presentLoading();
          this.saveAndOpenPdf(result.doctoBase64, 'Poliza.pdf');
        }
      });
    });
  }
}
