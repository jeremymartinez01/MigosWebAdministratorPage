import { Component } from '@angular/core';
import { NombreVentanaService } from '../../providers/nombre-ventana.service';
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {

  constructor(private nombreVentanaService: NombreVentanaService) {}

  ngOnInit(){
    this.nombreVentanaService.setWindowName('CONFIGURACION');
  }

}
