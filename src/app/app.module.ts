import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './shared/menu/menu.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ConductoresComponent } from './pages/conductores/conductores.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { CampaniasComponent } from './pages/campanias/campanias.component';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
import { VerificacionesComponent } from './pages/verificaciones/verificaciones.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
import { PermisosComponent } from './pages/permisos/permisos.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    DashboardComponent,
    ConductoresComponent,
    EmpresasComponent,
    CampaniasComponent,
    SolicitudesComponent,
    VerificacionesComponent,
    NotificacionesComponent,
    PermisosComponent,
    ConfiguracionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
