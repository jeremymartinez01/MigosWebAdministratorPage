import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NombreVentanaService } from 'src/app/providers/nombre-ventana.service';
import { ModelosconfigService } from 'src/app/providers/modelosconfig.service';
import { Modeloconfig } from 'src/app/interfaces/modeloconfig';
import { MarcasconfigService } from 'src/app/providers/marcasconfig.service';
import { Marcaconfig } from 'src/app/interfaces/marcaconfig';

@Component({
  selector: 'app-modeloform',
  templateUrl: './modeloform.component.html',
  styleUrls: ['./modeloform.component.css']
})
export class ModeloformComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public referencia: MatDialogRef<ModeloformComponent>, private snackBar: MatSnackBar,
    private usersq: NombreVentanaService, private modelosService: ModelosconfigService, private marcasService: MarcasconfigService){

  }

  id_modelo: number = 0;
  errorMessageModelo: string = '';
  id_marca: number = 0;
  errorMessageMarca: string = '';
  nombre: string = '';
  errorMessageNombre: string = '';

  errorMessageGeneral: string = '';

  sizeModelos: number = 0;
  dataMarcas: Marcaconfig[] = [];
  preSelectedValue: Marcaconfig = {
    id_marca: 0,
    nombre: ''};

  ngOnInit() {
    this.usersq.setWindowName('MODELOS');
    this.modelosService.getResponse().subscribe((response) => {
      this.sizeModelos = (response as Modeloconfig[]).length;
    });
    this.marcasService.getResponse().subscribe((response) => {
      this.dataMarcas = response as Marcaconfig[];
    });
  }

  close(): void {
    this.referencia.close();
  }

  save(): void {
    if (!this.validateForm()) {
      this.id_modelo = this.sizeModelos + 1;
      const nuevoModelo: Modeloconfig = {
        id_modelo: this.id_modelo,
        id_marca: this.id_marca,
        nombre: this.nombre
      };
      this.modelosService.createModelo(nuevoModelo).subscribe((response) => {
        this.snackBar.open('Modelo creado', 'Cerrar', {
          duration: 2000
        });
        this.referencia.close();
      });
    }
  }

  validateForm(): boolean {
    this.errorMessageGeneral = '';
    this.errorMessageModelo = '';
    this.errorMessageMarca = '';
    this.errorMessageNombre = '';

    let isValid = true;

    if (this.id_modelo <= 0) {
      this.errorMessageModelo = 'El ID del modelo es requerido';
      isValid = false;
    }

    if (this.id_marca <= 0) {
      this.errorMessageMarca = 'La marca es requerida';
      isValid = false;
    }

    if (this.nombre === '') {
      this.errorMessageNombre = 'El nombre del modelo es requerido';
      isValid = false;
    }

    return isValid;
  }


}
