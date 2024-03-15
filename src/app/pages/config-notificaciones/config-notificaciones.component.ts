import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NombreVentanaService } from '../../providers/nombre-ventana.service';
@Component({
  selector: 'app-config-notificaciones',
  templateUrl: './config-notificaciones.component.html',
  styleUrls: ['./config-notificaciones.component.css']
})
export class ConfigNotificacionesComponent {

  constructor (private router: Router, private nombreVentanaService: NombreVentanaService) {}
   
  

  ngOnInit(){
    this.nombreVentanaService.setWindowName('CONFIGURACION');
  }

  navegarToNotificacion2(){
    this.router.navigate(['/noticacion-hijo'])
  }


}
