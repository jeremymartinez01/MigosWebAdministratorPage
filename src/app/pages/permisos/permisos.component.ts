import { Component } from '@angular/core';
import { NombreVentanaService } from '../../providers/nombre-ventana.service';
@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosComponent {

  constructor(private nombreVentanaService: NombreVentanaService) {}

  ngOnInit(){
    this.nombreVentanaService.setWindowName('PERMISOS');
  }
}
