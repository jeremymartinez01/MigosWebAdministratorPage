import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { CampaniasComponent } from './pages/campanias/campanias.component';
import { ConductoresComponent } from './pages/conductores/conductores.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
import { PermisosComponent } from './pages/permisos/permisos.component';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
import { VerificacionesComponent } from './pages/verificaciones/verificaciones.component';
import {ConfigNotificacionesComponent} from './pages/config-notificaciones/config-notificaciones.component';
import {ConfigVehiculosComponent} from './pages/config-vehiculos/config-vehiculos.component';
import {ConfigVerificacionesComponent} from './pages/config-verificaciones/config-verificaciones.component';
import {ConfigBrandeoComponent} from './pages/config-brandeo/config-brandeo.component';
import {ConfigSectoresComponent} from './pages/config-sectores/config-sectores.component';
import { NotificacionHijoComponent } from './pages/notificacion-hijo/notificacion-hijo.component';
import {ConfigMapComponent} from './pages/config-map/config-map.component';

const routes: Routes = [
  //{path:"login", component: LoginComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"main",component:AppComponent},
  {path:"campanias", component:CampaniasComponent},
  {path:"conductores", component:ConductoresComponent},
  {path:"configuracion", component:ConfiguracionComponent},
  {path:"empresas", component:EmpresasComponent},
  {path:"notificaciones", component:NotificacionesComponent},
  {path:"permisos", component:PermisosComponent},
  {path:"solicitudes", component:SolicitudesComponent},
  {path:"verificaciones", component:VerificacionesComponent},
  {path:"config-verificaciones", component:ConfigVerificacionesComponent},
  {path:"config-notificaciones", component:ConfigNotificacionesComponent},
  {path:"config-vehiculos", component:ConfigVehiculosComponent},
  {path:"config-brandeo", component:ConfigBrandeoComponent},
  {path:"config-sectores", component:ConfigSectoresComponent},
  {path:"notificacion-hijo", component: NotificacionHijoComponent},
  {path:"config-map", component: ConfigMapComponent},
  {path:" ",redirectTo:'/login',pathMatch:'full'},
  {path:"**",redirectTo:"/login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
