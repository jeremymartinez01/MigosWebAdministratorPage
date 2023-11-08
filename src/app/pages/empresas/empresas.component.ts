import { Component } from '@angular/core';
import { NombreVentanaService } from '../../providers/nombre-ventana.service';
@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent {

  constructor(private nombreVentanaService: NombreVentanaService) {}

  ngOnInit(){
    this.nombreVentanaService.setWindowName('EMPRESAS');
  }

}
