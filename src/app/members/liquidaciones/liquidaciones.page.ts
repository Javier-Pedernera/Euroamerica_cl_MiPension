import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { LiquidacionesService } from './../../services/liquidaciones.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Platform } from '@ionic/angular';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { registerLocaleData } from '@angular/common';
import { LoadingController, ToastController } from '@ionic/angular';
import es from '@angular/common/locales/es';

@Component({
  selector: 'app-liquidaciones',
  templateUrl: './liquidaciones.page.html',
  styleUrls: ['./liquidaciones.page.scss'],
})
export class LiquidacionesPage implements OnInit {
  @ViewChild('swiper', { static: true }) swiperRef!: ElementRef;

  data: any;
  liquidaciones: any;
  periodo!: string;
  poliza: any;
  datos: any;
  isLoading: boolean = false;

  constructor(
    private platform: Platform,
    private liqService: LiquidacionesService,
    private transfer: FileTransfer,
    private fileOpener: FileOpener,
    private file: File,
    public loadingCtrl: LoadingController,
    private authenticationService: AuthenticationService) {

    this.authenticationService.getDatos().then(data1 => {
      this.datos = data1;
      console.log(this.datos);
      this.liqService.consultar(this.datos.rut + '-' + this.datos.dv).subscribe((data) => {
        console.log(data);
        this.data = data;
        this.liquidaciones = data.liquidaciones;
        this.periodo = data.periodo;
        // this.poliza = data.liquidaciones[0];
        // console.log('Poliza', this.poliza?.tieneLiq);
        if (this.liquidaciones.length > 0) {
          this.poliza = this.liquidaciones[0];
          console.log('Poliza', this.poliza?.tieneLiq);
        }
      });
    });
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

  ngOnInit() {
    registerLocaleData(es);
  }

  slideChanged() {
    const swiper = this.swiperRef.nativeElement.swiper;
    this.poliza = this.liquidaciones[swiper.activeIndex];
  }

  openRemoteFileByUrl(fileUrl:string, content_type = 'application/pdf') {
    const transfer = this.transfer.create();
    let path = null;
    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else if (this.platform.is('android')) {
      path = this.file.dataDirectory;
    }
    transfer.download(fileUrl, path + 'Liquidacion.pdf').then((entry:any) => {
      const url = entry.toURL();

      console.log('download complete: ' + entry.toURL());
      console.log(entry.nativeURL);

      this.fileOpener.open(url, 'application/pdf')
        .then(() => console.log('File is opened'))
        .catch(e => console.log('Error opening file', e));
    });
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
          .catch(e => console.log('Error opening file', e));
      })
      .catch(() => {
        console.error('Error writing pdf file');
        this.dismissLoading();
      });
  }

  descargarLiq() {
    this.liqService.pdf(this.datos.rut1, this.poliza.poliza, 'liquidacion').subscribe((data) => {
      console.log(data);
      this.presentLoading();
      this.saveAndOpenPdf(data.doctoBase64, 'Documento.pdf');
    });
  }
}
