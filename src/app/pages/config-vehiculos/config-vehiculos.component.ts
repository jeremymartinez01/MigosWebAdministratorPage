import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NombreVentanaService } from '../../providers/nombre-ventana.service';

@Component({
  selector: 'app-config-vehiculos',
  templateUrl: './config-vehiculos.component.html',
  styleUrls: ['./config-vehiculos.component.css']
})
export class ConfigVehiculosComponent {

  constructor (private router: Router, private nombreVentanaService: NombreVentanaService) {}
   
  

  ngOnInit(){
    this.nombreVentanaService.setWindowName('CONFIGURACION');
  }

  navegarToModelos(){
    this.router.navigate(['/modelos-config'])
  }

  navegarToMarcas(){
    this.router.navigate(['/marcas-config'])
  }

}
