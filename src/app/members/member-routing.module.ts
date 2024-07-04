import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule) },
  { path: 'liquidaciones', loadChildren: () => import('./liquidaciones/liquidaciones.module').then(m => m.LiquidacionesPageModule) },
  { path: 'validacion-de-datos', loadChildren: () => import('./validacion-de-datos/validacion-de-datos.module').then(m => m.ValidacionDeDatosPageModule) },
  { path: 'mis-documentos', loadChildren: () => import('./mis-documentos/mis-documentos.module').then(m => m.MisDocumentosPageModule) },
  { path: 'mis-datos', loadChildren: () => import('./mis-datos/mis-datos.module').then(m => m.MisDatosPageModule) },
  { path: 'calendario-de-pagos', loadChildren: () => import('./calendario-de-pagos/calendario-de-pagos.module').then(m => m.CalendarioDePagosPageModule) },
  { path: 'centros-de-atencion', loadChildren: () => import('./centros-de-atencion/centros-de-atencion.module').then(m => m.CentrosDeAtencionPageModule) },
  { path: 'notificaciones', loadChildren: () => import('./notificaciones/notificaciones.module').then(m => m.NotificacionesPageModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }