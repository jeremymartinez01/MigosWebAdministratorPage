
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfigMapComponent } from '../config-map/config-map.component';

@Component({
  selector: 'app-config-sectores',
  templateUrl: './config-sectores.component.html',
  styleUrls: ['./config-sectores.component.css']
})
export class ConfigSectoresComponent implements OnInit {
  mapDataList: any[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openMapDialog(): void {
    const dialogRef = this.dialog.open(ConfigMapComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Agrega los datos a la lista
        this.mapDataList.push(result);
        console.log('Datos del mapa en el padre:', this.mapDataList);
        
      }
    });
  }
}
