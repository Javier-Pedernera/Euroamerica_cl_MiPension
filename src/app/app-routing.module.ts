import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./public/login/login.module').then(m => m.LoginPageModule) },
  { path: 'solicitud-clave', loadChildren: () => import('./public/solicitud-clave/solicitud-clave.module').then(m => m.SolicitudClavePageModule) },
  {
    path: 'members',
    canActivate: [AuthGuard],
    loadChildren: () => import('./members/member-routing.module').then(m => m.MemberRoutingModule)
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
