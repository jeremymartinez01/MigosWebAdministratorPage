import { Component } from '@angular/core';
import { NombreVentanaService } from '../../providers/nombre-ventana.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {

  constructor(private nombreVentanaService: NombreVentanaService, private router: Router) {}

  ngOnInit(){
    this.nombreVentanaService.setWindowName('CONFIGURACION');
  }
   
  navegarToVerificaciones(){
    this.router.navigate(['/config-verificaciones'])
  }

  navegarToSectores(){
    this.router.navigate(['/config-sectores'])
  }
  navegarToNotificaciones(){
    this.router.navigate(['/config-notificaciones'])
  }

  navegarToVehiculos(){
    this.router.navigate(['/config-vehiculos'])
  }
  navegarToBrandeo(){
    this.router.navigate(['/config-brandeo'])
  }
}
