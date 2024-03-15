
import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfigMapComponent } from '../config-map/config-map.component';
import { SectorService } from 'src/app/providers/sector.service';
import { Sector } from 'src/app/interfaces/sector';
import { NombreVentanaService } from 'src/app/providers/nombre-ventana.service';
import { SectorGet } from 'src/app/interfaces/sector-get';
import { DialogConfirmacionComponent } from 'src/app/forms/dialog-confirmacion/dialog-confirmacion.component';
import { VisualizeMapComponent } from '../visualize-map/visualize-map.component';
import { PaginadorComponent } from 'src/app/shared/paginador/paginador.component';

@Component({
  selector: 'app-config-sectores',
  templateUrl: './config-sectores.component.html',
  styleUrls: ['./config-sectores.component.css']
})
export class ConfigSectoresComponent implements OnInit, AfterViewInit {
  @ViewChild(PaginadorComponent, { static: false }) paginador: PaginadorComponent | undefined;
  id_empresa: number;
  sectores: SectorGet[] = [];
  usuarioId: number = 11;

  // PAGINADOR
  SectoresEnPagina: SectorGet[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;
  maxPages: number = 5;
  // PAGINADOR

  constructor(private dialog: MatDialog, private sectorService: SectorService, private nombreVentanaService: NombreVentanaService, private cdr: ChangeDetectorRef) {
    this.id_empresa = 11;
  }

  ngOnInit() {
    this.nombreVentanaService.idMain$.subscribe((id: number) => {
      this.id_empresa = id;
    });

    // Obtiene la lista de sectores desde la base de datos
    this.sectorService.obtenerSector(this.usuarioId).subscribe(
      (data) => {
        this.sectores = data;
        this.totalItems = this.sectores.length;
        this.onPageChange(this.currentPage);
      },
      (error) => {
        console.error('Error al obtener la lista de sectores', error);
      }
    );
  }

  ngAfterViewInit() {
    if (this.paginador) {
      // Inicializa el paginador después de la vista
      this.paginador.totalItems = this.totalItems;
      this.paginador.currentPage = this.currentPage;
      this.paginador.pageSize = this.pageSize;
      this.paginador.maxPages = this.maxPages;
      this.paginador.ngOnInit();
      this.onPageChange(this.currentPage);
    }
  }

  //Abre el dialogo para crear el mapa
  openMapDialog(): void {
    const dialogRef = this.dialog.open(ConfigMapComponent, {
      width: '550px',
      panelClass: 'custom-container',
    });
    
    // Espera a que se cierre el dialogo para obtener los datos del mapa
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Crea un nuevo sector con los datos del mapa
        let fecha_creacion = new Date();
        let fecha_formateada = fecha_creacion.toISOString().split('T')[0];
        const nuevoSector: Sector = {
          id_empresa: 1,
          nombre: result.name,
          fecha_creacion: fecha_formateada,
          cerco_virtual: result.coordinates,
          fecha_modificacion: fecha_formateada,
          estado: 2,
        };

        // Crea el sector en la base de datos
        this.sectorService.crearSector(nuevoSector).subscribe(
          (response) => {
            console.log('Sector creado con éxito:', response);
          },
          (error) => {
            console.error('Error al crear el sector:', error);
          }
        );
      }
    });
  }

 //Abre el dialogo para visualizar el mapa
  openVisualizeMapDialog(sector: Sector): void {
    const dialogRef = this.dialog.open(VisualizeMapComponent, {
      width: '550px',
      panelClass: 'custom-container',
      data: { sector },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró con resultado:', result);
    });
  }

  //Acciones de los botones
  abrirDialogoConfirmacion(accion: string, id: number): void {
    const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
      width: '300px',
      data: { accion: accion }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (accion === 'habilitar') {
          this.habilitarSector(id);
        } else if (accion === 'deshabilitar') {
          this.deshabilitarSector(id);
        } else if (accion === 'eliminar') {
          this.cambiarEstadoEliminar(id);
        }
      }
    });
  }

  habilitarSector(id: number): void {
    this.sectorService.cambiarEstado(id, 1)
      .subscribe(
        response => {
          console.log('Sector habilitado con éxito:', response);
        },
        error => {
          console.error('Error al habilitar el sector:', error);
        }
      );
  }

  deshabilitarSector(id: number): void {
    this.sectorService.cambiarEstado(id, 2)
      .subscribe(
        response => {
          console.log('Sector deshabilitado con éxito:', response);
        },
        error => {
          console.error('Error al deshabilitar el sector:', error);
        }
      );
  }

  cambiarEstadoEliminar(id: number): void {
    this.sectorService.cambiarEstado(id, 3)
      .subscribe(
        response => {
          console.log('Sector cambiado de estado a Eliminar con éxito:', response);
        },
        error => {
          console.error('Error al cambiar el estado del sector a Eliminar:', error);
        }
      );
  }

  // PAGINADOR EVENTOS
  onPageChange(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.SectoresEnPagina = this.sectores.slice(startIndex, endIndex);
    // Notifica al paginador sobre el cambio de página
    if (this.paginador) {
      this.paginador.selectPage(page);
    }
  }
}
