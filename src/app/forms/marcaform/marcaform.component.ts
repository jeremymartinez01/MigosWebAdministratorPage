import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NombreVentanaService } from 'src/app/providers/nombre-ventana.service';
import { ModelosconfigService } from 'src/app/providers/modelosconfig.service';
import { MarcasconfigService } from 'src/app/providers/marcasconfig.service';
import { Marcaconfig } from 'src/app/interfaces/marcaconfig';

@Component({
  selector: 'app-marcaform',
  templateUrl: './marcaform.component.html',
  styleUrls: ['./marcaform.component.css']
})
export class MarcaformComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public referencia: MatDialogRef<MarcaformComponent>, private snackBar: MatSnackBar,
  private usersq: NombreVentanaService, private marcasService: MarcasconfigService){
    
  }

  nombre: string = '';
  errorMessageNombre: string = '';

  errorMessageGeneral: string = '';

  sizeMarcas: number = 0;
  id_marca: number = 0;
  dataMarcas: Marcaconfig[] = [];
  preSelectedValue: Marcaconfig = {
    id_marca: 0,
    nombre: '',
    estado: "Activo"
  };

  ngOnInit() {
    this.usersq.setWindowName('MODELOS');
    this.marcasService.getResponse().subscribe((response) => {
      this.dataMarcas = response as Marcaconfig[];
      this.sizeMarcas = (response as Marcaconfig[]).length;
    });
  }

  close(): void {
    this.referencia.close();
  }

  save(): void {
    if (!this.validateForm()) {
      this.id_marca = this.sizeMarcas + 1;
      const nuevaMarca: Marcaconfig = {
        id_marca: this.id_marca,
        nombre: this.nombre,
        estado: "Activo"
      };
      this.marcasService.createMarca(nuevaMarca).subscribe((response) => {
        this.snackBar.open('Marca creada', 'Cerrar', {
          duration: 2000
        });
        this.referencia.close();
      });
    }
  }

  update(): void {
    if (!this.validateForm()) {
      const nuevoModelo: Marcaconfig = this.data.modelo
      nuevoModelo.nombre = this.nombre;
      this.marcasService.updateMarca(nuevoModelo.id_marca, nuevoModelo).subscribe((response) => {
        this.snackBar.open('Modelo actualizado', 'Cerrar', {
          duration: 2000
        });
        this.referencia.close();
      });
    }
  }

  validateForm(): boolean {
    this.errorMessageGeneral = '';
    this.errorMessageNombre = '';

    let isValid = true;

    if (this.nombre === '') {
      this.errorMessageNombre = 'El nombre del modelo es requerido';
      return false;;
    }

    return isValid;
  }
}
