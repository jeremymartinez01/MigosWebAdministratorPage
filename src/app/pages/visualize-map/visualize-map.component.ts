import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GoogleMapsService } from '../../providers/map/googlemaps.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-visualize-map',
  templateUrl: './visualize-map.component.html',
  styleUrls: ['./visualize-map.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VisualizeMapComponent implements OnInit {
  @ViewChild('mapElement', { static: true }) mapElement!: ElementRef;
  @Input() sectorData: any; // Input para recibir los datos del sector
  private map: any;
  private polygon: any;

  constructor(
    private googleMapsService: GoogleMapsService,
    private dialogRef: MatDialogRef<VisualizeMapComponent>
  ) {}

  ngOnInit() {
    const apiKey = 'AIzaSyDon5hzHRwL1069HmRZ7XVNREzQdwxV5zA';
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
      if (this.sectorData && this.sectorData.cerco_virtual && this.sectorData.cerco_virtual.length > 0) {
        const coordinates = this.sectorData.cerco_virtual.map((coord: { lat: any; lng: any; }) => ({
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
      editable: false, // No editable
      draggable: false, // No se puede arrastrar
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      strokeWeight: 2,
      strokeColor: '#FF0000',
    });
  
    this.polygon.setMap(this.map);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
