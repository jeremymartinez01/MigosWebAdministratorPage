
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfigMapComponent } from '../config-map/config-map.component';
import { SectorService } from 'src/app/providers/sector.service';
import { Sector} from 'src/app/interfaces/sector';
import { NombreVentanaService } from 'src/app/providers/nombre-ventana.service';
import { SectorGet } from 'src/app/interfaces/sector-get';
import { DialogConfirmacionComponent } from 'src/app/forms/dialog-confirmacion/dialog-confirmacion.component';
@Component({
  selector: 'app-config-sectores',
  templateUrl: './config-sectores.component.html',
  styleUrls: ['./config-sectores.component.css']
})
export class ConfigSectoresComponent implements OnInit {
  id_empresa:number
  mapDataList: any[] = [];
  sectores :SectorGet[]=[];
  usuarioId :number = 11;
  constructor(private dialog: MatDialog,private sectorService: SectorService, private nombreVentanaService: NombreVentanaService) {
     this.id_empresa=11
     
  }

  ngOnInit() {
    this.nombreVentanaService.idMain$.subscribe((id: number) => {
      this.id_empresa=id
    });

    this.sectorService.obtenerSector(this.usuarioId).subscribe(data => {
      this.sectores = data;
      },
      error => {
        console.error('Error al obtener la lista de sectores', error);
      }
    );
  }

  openMapDialog(): void {
    const dialogRef = this.dialog.open(ConfigMapComponent, {
      width: '550px',
      panelClass: 'custom-container',
    });
    
    
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Agrega los datos a la lista
        this.mapDataList.push(result);
  
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
          // Maneja la respuesta del servidor aquí
          console.log('Sector habilitado con éxito:', response);
          // Puedes realizar otras acciones después de la habilitación si es necesario
        },
        error => {
          // Maneja los errores aquí
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
  
}