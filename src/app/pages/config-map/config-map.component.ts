
import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter,ViewEncapsulation  } from '@angular/core';
import { GoogleMapsService } from '../../providers/map/googlemaps.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-config-map',
  templateUrl: './config-map.component.html',
  styleUrls: ['./config-map.component.css'],
  encapsulation: ViewEncapsulation.None,
})



export class ConfigMapComponent implements OnInit {
  @ViewChild('mapElement', { static: true }) mapElement!: ElementRef;
  @Output() createClicked = new EventEmitter<any>();

  
  private map: any;
  private drawingManager: any;
  public name: string = '';
  private polygonData: any[] = [];
  private polygonsData: any;
  
  

  constructor(
    private googleMapsService: GoogleMapsService,
    private dialogRef: MatDialogRef<ConfigMapComponent>
  ) { }

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

      google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event: google.maps.drawing.OverlayCompleteEvent) => {
        if (event.type === google.maps.drawing.OverlayType.POLYGON) {
          const polygon = event.overlay as google.maps.Polygon;
          this.polygonData.push(this.getPolygonCoordinates(polygon));
          
        }
        
      });
    }).catch((error) => {
      console.error('Error loading Google Maps library:', error);
    });
  }

  onCancelClick(): void {
    this.dialogRef.close(); 
  }
  onCreateClick(): void {
        
    if (this.isNameValid() && this.isPolygonDataValid(this.polygonData)) {
      // Emite el evento para informar al componente padre
        this.createClicked.emit(this.polygonsData= {
          name: this.name,
          coordinates: this.polygonData,
        });
        
        this.dialogRef.close(this.polygonsData); 
        console.log(this.polygonsData);
      } else {
        console.error("El nombre o polygonData está vacío o no es válido");
        
      }

  }
  private isNameValid(): boolean {
    // Verifica si el nombre no es nulo, no es undefined y no está vacío
    return  (this.name &&this.name.trim()) !== '';
  }
  
  
  private isPolygonDataValid(polygonData: any): boolean {
    // Verifica si polygonData no es nulo, no es undefined y tiene al menos una propiedad
    return polygonData && Object.keys(polygonData).length > 0;
  }

  private getPolygonCoordinates(polygon: google.maps.Polygon): any[] {
    return polygon
      .getPath()
      .getArray()
      .map((latLng: google.maps.LatLng) => ({ lat: latLng.lat(), lng: latLng.lng() }));
  }
}
