// sector.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sector } from '../interfaces/sector';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  private apiUrl = 'https://migoadvs.pythonanywhere.com/Database/Database/sectores/';

  constructor(private http: HttpClient) {}

  crearSector(sector: Sector): Observable<Sector> {
    return this.http.post<Sector>(this.apiUrl, sector);
  }
}
