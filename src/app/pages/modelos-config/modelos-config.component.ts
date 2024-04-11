import { Component } from '@angular/core';
import { NombreVentanaService } from '../../providers/nombre-ventana.service';
import { forkJoin } from 'rxjs';
import { ModeloformComponent } from 'src/app/forms/modeloform/modeloform.component';
import { MatDialog } from '@angular/material/dialog';
import { Modeloconfig } from 'src/app/interfaces/modeloconfig';
import { ModelosconfigService } from 'src/app/providers/modelosconfig.service';
import { Marcaconfig } from 'src/app/interfaces/marcaconfig';
import { MarcasconfigService } from 'src/app/providers/marcasconfig.service';

@Component({
  selector: 'app-modelos-config',
  templateUrl: './modelos-config.component.html',
  styleUrls: ['./modelos-config.component.css']
})
export class ModelosConfigComponent {

  constructor(private nombreVentanaService: NombreVentanaService, private formulario: MatDialog, private servModelos: ModelosconfigService, private servMarca: MarcasconfigService) { }

  modeloData: Modeloconfig[] = [];
  marcaData: Marcaconfig[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 4; 

  ngOnInit() {
    this.nombreVentanaService.setWindowName('MODELOS');
    this.servModelos.getResponse().subscribe((response) => {
      this.modeloData = response as Modeloconfig[];
    });
    this.servMarca.getResponse().subscribe((response) => {
      this.marcaData = response as Marcaconfig[];
    });

    console.log(this.marcaData);
  }

  get totalPages(): number {
    return Math.ceil(this.modeloData.length / this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }  
  getPagedModelos(): Modeloconfig[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.modeloData.slice(startIndex, endIndex);
  }

  getMarca(idmarca:number): String{
    return this.marcaData.find(marca => marca.id_marca === idmarca)?.nombre ?? "No encontrado";
  }

  valorMarca(idmarca:number): Marcaconfig{
    return this.marcaData.find(marca => marca.id_marca === idmarca) ?? {id_marca:0, nombre:"No encontrado"};
  }

  editarModelo(modelo:Modeloconfig){
    const dialogRef = this.formulario.open(ModeloformComponent, {
      width: '450px',
      height:'293px',
      data: { titulo: 'Editar Modelo', id_modelo: modelo.id_modelo, preSelectedValue:this.valorMarca(modelo.id_marca), id_marca: modelo.id_marca, nombre: modelo.nombre }
    });
  }

  deshabilitarModelo(modelo:Modeloconfig){

  }

  eliminarModelo(modelo:Modeloconfig){

  }
  
  openFormDialog(): void {
    const dialogRef = this.formulario.open(ModeloformComponent, {
      width: '450px',
      height:'293px',
      data: { titulo: 'Registro nuevo Modelo', id_marca: 0, nombre: '', preSelectedValue: {id_modelo: 0, id_marca: 0, nombre: ''} }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPagedModelos();
    });
  }

}

