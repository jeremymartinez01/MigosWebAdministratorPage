import { Component } from '@angular/core';
import { NombreVentanaService } from '../../providers/nombre-ventana.service';

@Component({
  selector: 'app-verificaciones',
  templateUrl: './verificaciones.component.html',
  styleUrls: ['./verificaciones.component.css']
})
export class VerificacionesComponent {

  constructor(private nombreVentanaService: NombreVentanaService) {}

  ngOnInit(){
    this.nombreVentanaService.setWindowName('VERIFICACIONES');
  }

}
