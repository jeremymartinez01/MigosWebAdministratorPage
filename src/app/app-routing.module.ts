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
  {path:" ",redirectTo:'/login',pathMatch:'full'},
  {path:"**",redirectTo:"/login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
