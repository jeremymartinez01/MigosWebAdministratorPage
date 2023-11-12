
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfigMapComponent } from '../config-map/config-map.component';
import { SectorService } from 'src/app/providers/sector.service';
import { Sector} from 'src/app/interfaces/sector';
import { NombreVentanaService } from 'src/app/providers/nombre-ventana.service';
@Component({
  selector: 'app-config-sectores',
  templateUrl: './config-sectores.component.html',
  styleUrls: ['./config-sectores.component.css']
})
export class ConfigSectoresComponent implements OnInit {
  id_empresa:number
  mapDataList: any[] = [];

  constructor(private dialog: MatDialog,private sectorService: SectorService, private nombreVentanaService: NombreVentanaService) {
     this.id_empresa=0
  }

  ngOnInit() {
    this.nombreVentanaService.idMain$.subscribe((id: number) => {
      this.id_empresa=id
    });
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
          id_empresa: 2,
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
}