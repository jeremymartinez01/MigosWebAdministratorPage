// visualize-map.component.ts

import { Component, ElementRef, Inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GoogleMapsService } from '../../providers/map/googlemaps.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sector } from '../../interfaces/sector';

@Component({
  selector: 'app-visualize-map',
  templateUrl: './visualize-map.component.html',
  styleUrls: ['./visualize-map.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VisualizeMapComponent implements OnInit {
  @ViewChild('mapElement', { static: true }) mapElement!: ElementRef;
  private map: any;
  private polygon: any;
  sector!: Sector;

  constructor(
    private googleMapsService: GoogleMapsService,
    private dialogRef: MatDialogRef<VisualizeMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.sector) {
      this.sector = data.sector;
    }
  }

  ngOnInit() {
    const apiKey = 'AIzaSyDon5hzHRwL1069HmRZ7XVNREzQdwxV5zA'; // Agrega tu clave de API de Google Maps aquí
    this.googleMapsService.load(apiKey).then(() => {
      this.initMap();
    });
  }

  initMap(): void {
    this.googleMapsService.importLibrary('maps').then(({ Map }) => {
      this.map = new Map(this.mapElement.nativeElement, {
        center: { lat: -2.189822999999990, lng: -79.88775 },
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
      });

      // Dibujar el polígono si hay coordenadas disponibles
      if (this.sector && this.sector.cerco_virtual && this.sector.cerco_virtual.length > 0) {
        const coordinates = this.sector.cerco_virtual.map((coord: { lat: any; lng: any; }) => ({
          lat: coord.lat,
          lng: coord.lng,
        }));

        this.drawPolygon(coordinates);
      }
    }).catch((error) => {
      console.error('Error loading Google Maps library:', error);
    });
  }

  drawPolygon(coordinates: { lat: number; lng: number }[]): void {
    this.polygon = new google.maps.Polygon({
      paths: coordinates,
      editable: false,
      draggable: false,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      strokeWeight: 2,
      strokeColor: '#FF0000',
    });

    this.polygon.setMap(this.map);
  }

  onCancelClick(): void {
    this.dialogRef.close(); // Cierra el diálogo cuando se hace clic en "CERRAR"
  }
}
