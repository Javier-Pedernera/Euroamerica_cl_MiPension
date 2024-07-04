import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { CentrosDeAtencionService } from './../../services/centros-de-atencion.service';
import { Localidad, CentroAtencionResponse, SucursalResponse, Sucursal } from './../../models/interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-centros-de-atencion',
  templateUrl: './centros-de-atencion.page.html',
  styleUrls: ['./centros-de-atencion.page.scss'],
})
export class CentrosDeAtencionPage implements OnInit, AfterContentInit  {

  map:any;
  @ViewChild('mapElement', { static: true }) mapElement:any;

  localidades: Array<Localidad> = [];
  sucursal: Sucursal | null = { id: 0, direccion: '', horarios: [], telefono: '', latitud: '', longitud: '' };
  srcMap: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

  constructor(
    private centros: CentrosDeAtencionService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {}

  ngAfterContentInit(): void {}

  ionViewWillEnter() {
    this.centros.localidades().subscribe((data: CentroAtencionResponse) => {
      this.localidades = data.loc;
      this.cargaDetalle(this.localidades[0].id);
    });
  }

  cargaDetalle(localidadId: any) {
    this.centros.detalle(localidadId).subscribe((data: SucursalResponse) => {
      this.sucursal = data.loc;
      this.sucursal.latitud = this.sucursal.latitud.replace(',', '.');
      this.sucursal.longitud = this.sucursal.longitud.replace(',', '.');

      const url = 'https://maps.google.com/?q=' + this.sucursal.latitud + ',' + this.sucursal.longitud + '&z=15&output=embed';
      this.srcMap = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

  onItemChange(event: any) {
    this.cargaDetalle(event.target.value);
  }

}
