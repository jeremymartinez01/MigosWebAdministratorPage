import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsService } from '../../providers/map/googlemaps.service';

@Component({
  selector: 'app-config-map',
  templateUrl: './config-map.component.html',
  styleUrls: ['./config-map.component.css']
})
    
    export class ConfigMapComponent  implements OnInit {
      @ViewChild('mapElement', { static: true }) mapElement!: ElementRef;
    
      private map: any;
      private drawingManager: any;
    
      constructor(private googleMapsService: GoogleMapsService) {}
    
      ngOnInit() {
        const apiKey = 'AIzaSyDGFJYY5w8PRRkmMWwGSkdtVJ6X57mALF8';
        this.googleMapsService.load(apiKey).then(() => {
          this.initMap();
        });
      }
    
      initMap(): void {
        this.googleMapsService.importLibrary('maps').then(({ Map }) => {
          this.map = new Map(this.mapElement.nativeElement, {
            center: { lat: 0, lng: 0 },
            zoom: 4,
          });
    
          this.drawingManager = new google.maps.drawing.DrawingManager({
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [google.maps.drawing.OverlayType.POLYGON],
            },
            polygonOptions: {
              editable: true,
            },
          });
    
          this.drawingManager.setMap(this.map);
    
          // Manejar eventos cuando se completa el dibujo de un polígono
          google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event: google.maps.drawing.OverlayCompleteEvent) => {
            if (event.type === google.maps.drawing.OverlayType.POLYGON) {
              const polygon = event.overlay as google.maps.Polygon;
    
              // Aquí se almacenar la información del polígono (nombre, descripción, etc.)
              const name = prompt('Nombre :');
              const description = prompt('Ingrese descripcion:');
    
              // Ejemplo: Almacenar información en un arreglo
              const polygonData = {
                name: name,
                description: description,
                polygon: polygon,
              };
    
               // Puedes manejar la información almacenada según tus necesidades
               console.log('Polígono almacenado:', polygonData);
              }
            });
          }).catch((error) => {
            console.error('Error loading Google Maps library:', error);
          });
        }
      }