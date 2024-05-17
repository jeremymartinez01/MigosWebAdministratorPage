import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Solicitud } from 'src/app/interfaces/solicitud';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { VehiculolistService } from 'src/app/providers/vehiculolist.service';
import { OnInit } from '@angular/core';
import { Marcaconfig } from 'src/app/interfaces/marcaconfig';
import { MarcasconfigService } from 'src/app/providers/marcasconfig.service';
import { Modeloconfig } from 'src/app/interfaces/modeloconfig';
import { ModelosconfigService } from 'src/app/providers/modelosconfig.service';


@Component({
  selector: 'app-solicitud-detail',
  templateUrl: './solicitud-detail.component.html',
  styleUrls: ['./solicitud-detail.component.css']
})

export class SolicitudDetailComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private marcaService: MarcasconfigService,
              private modeloService: ModelosconfigService) {}
  marca: Marcaconfig = {
    id_marca: 0,
    nombre: '',
    estado: ''
  }
  modelo: Modeloconfig = {
    id_modelo: 0,
    id_marca: 0,
    nombre: '',
    estado: ''
  };

  ngOnInit(): void {
    this.marcaService.getMarcaById(this.data.vehiculo.id_marca).subscribe((data: Object) => {
      this.marca = data as Marcaconfig;
    });

    this.modeloService.getModeloById(this.data.vehiculo.id_modelo).subscribe((data: Object) => {
      this.modelo = data as Modeloconfig;
    });
  }

}