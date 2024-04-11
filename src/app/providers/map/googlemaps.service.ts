
import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {
  private loaded: boolean = false;

  async load(apiKey: string): Promise<void> {
    if (!this.loaded) {
      const loader = new Loader({
        apiKey: "AIzaSyBSFBro1vBs0RFOCxnh03rBhOzkrjK7l4w",
        version: 'weekly',
        libraries: ['places','drawing'],
      });

      await loader.load();
      this.loaded = true;
    }
  }

  importLibrary(libraryName: string): Promise<any> {
    return this.load('').then(() => {
      return google.maps.importLibrary(libraryName);
    });
  }

  enableDrawing(map: any): void {
    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON],
      },
      polygonOptions: {
        editable: true,
      },
    });
    drawingManager.setMap(map);
  }
}
