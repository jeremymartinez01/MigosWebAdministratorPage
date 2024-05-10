import { Component } from '@angular/core';
import { NombreVentanaService } from '../../providers/nombre-ventana.service';
import { MarcaformComponent } from 'src/app/forms/marcaform/marcaform.component';
import { MatDialog } from '@angular/material/dialog';
import { Marcaconfig } from 'src/app/interfaces/marcaconfig';
import { MarcasconfigService } from 'src/app/providers/marcasconfig.service';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-marcas-config',
  templateUrl: './marcas-config.component.html',
  styleUrls: ['./marcas-config.component.css']
})
export class MarcasConfigComponent {

  constructor(private nombreVentanaService: NombreVentanaService, private formulario: MatDialog, private servMarca: MarcasconfigService) { }

  marcaData: Marcaconfig[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 4;

  ngOnInit() {
    this.nombreVentanaService.setWindowName('MARCAS');
    this.servMarca.getResponse().subscribe((response) => {
      this.marcaData = response as Marcaconfig[];
    });
  }

  get totalPages(): number {
    return Math.ceil(this.marcaData.length / this.itemsPerPage);
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

  getPagedMarcas(): Marcaconfig[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.marcaData.slice(startIndex, endIndex);
  }

  editarMarca(marca:Marcaconfig){
    const dialogRef = this.formulario.open(MarcaformComponent, {
      width: '450px',
      height:'226px',
      data: { create:false, edit:true, titulo: 'Editar Marca', id_marca: marca.id_marca, nombre: marca.nombre }
    });
  }

  deshabilitarMarca(marca:Marcaconfig){

  }

  eliminarMarca(marca:Marcaconfig){

  }

  openFormDialog(): void {
    const dialogRef = this.formulario.open(MarcaformComponent, {
      width: '450px',
      height:'226px',
      data: { create:true, edit:false, titulo: 'Registro nueva Marca', id_marca: 0, nombre: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPagedMarcas();
    });
  }

}
