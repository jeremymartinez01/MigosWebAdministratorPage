import { Component } from '@angular/core';
import { NombreVentanaService } from '../../providers/nombre-ventana.service';
@Component({
  selector: 'app-campanias',
  templateUrl: './campanias.component.html',
  styleUrls: ['./campanias.component.css']
})
export class CampaniasComponent {

  constructor(private nombreVentanaService: NombreVentanaService) {}

  ngOnInit(){
    this.nombreVentanaService.setWindowName('CAMPAÑAS');
  }


}
