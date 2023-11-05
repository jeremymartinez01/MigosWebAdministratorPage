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
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, MatNativeDateModule } from '@angular/material/core';
import {DateFnsModule,DateFnsAdapter} from '@angular/material-date-fns-adapter';
import {es} from 'date-fns/locale';
import { ConductoresComponent } from './pages/conductores/conductores.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { CampaniasComponent } from './pages/campanias/campanias.component';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
import { VerificacionesComponent } from './pages/verificaciones/verificaciones.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
import { PermisosComponent } from './pages/permisos/permisos.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { HeaderComponent } from './header/header.component';

export const DATE_FORMATS: MatDateFormats ={
  parse: {dateInput: 'dd-MM-yyyy'},
  display: {
  dateInput: 'dd-MM-yyyy',
  monthYearLabel: 'MMM yyyy',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'yyyy' , 
  }
}
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
    ConfiguracionComponent,
    HeaderComponent,

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
    MatFormFieldModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    DateFnsModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [
    {provide: DateAdapter, useClass: DateFnsAdapter},
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
    {provide: MAT_DATE_LOCALE, useValue:es},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
