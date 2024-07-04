import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Platform } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileTransferService {
  constructor(
    private http: HttpClient,
    private file: File,
    private platform: Platform
  ) {}

  downloadFile(url: string, fileName: string) {
    if (this.platform.is('cordova')) {
      const filePath = this.file.dataDirectory + fileName;
      this.http
        .get(url, { responseType: 'blob' })
        .pipe(
          catchError((error) => {
            console.error('File download error: ', error);
            return throwError(error);
          })
        )
        .subscribe((blob) => {
          this.file
            .writeFile(this.file.dataDirectory, fileName, blob, { replace: true })
            .then(() => {
              console.log('File downloaded successfully: ', filePath);
            })
            .catch((error) => {
              console.error('File write error: ', error);
            });
        });
    } else {
      console.error('File download is only available on a real device');
    }
  }
}
