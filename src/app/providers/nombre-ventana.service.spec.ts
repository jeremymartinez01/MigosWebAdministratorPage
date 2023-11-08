import { TestBed } from '@angular/core/testing';
import { NombreVentanaService } from './nombre-ventana.service';

describe('NombreVentanaService', () => {
  let service: NombreVentanaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NombreVentanaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and retrieve the window name', async () => {
    const expectedName = 'Nombre de prueba';
    service.setWindowName(expectedName);

    // Usamos async/await para esperar a que el valor se emita
    let currentName: string = await new Promise((resolve) => {
      service.windowName$.subscribe((name) => {
        resolve(name);
      });
    });

    expect(currentName).toEqual(expectedName);
  });
});
