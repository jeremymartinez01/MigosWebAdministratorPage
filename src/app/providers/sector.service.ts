// sector.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Sector } from '../interfaces/sector';
import { SectorGet } from '../interfaces/sector-get';
@Injectable({
  providedIn: 'root'
})
export class SectorService {
  private apiUrl = 'https://migoadvs.pythonanywhere.com/Database/';

  constructor(private http: HttpClient) {}

  crearSector(sector: Sector): Observable<Sector> {
    const url = `${this.apiUrl}Database/sectores/`;
    return this.http.post<Sector>(url, sector);
  }

  obtenerSector(usuarioId: number): Observable<SectorGet[]> {
    const url = `${this.apiUrl}Database/sectores/`;
    return this.http.get<SectorGet[]>(url);
  }

  cambiarEstado(id: number, nuevoEstado: number): Observable<any> {
    const url = `${this.apiUrl}Database/sectores/${id}/`;
    console.log('URL de la solicitud PATCH:', url);
  
    const data = { estado: nuevoEstado };
  
    return this.http.patch<any>(url, data);
  }
  
}
