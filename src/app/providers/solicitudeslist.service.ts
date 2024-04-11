import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Solicitud } from '../interfaces/solicitud';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudeslistService {
  private URL: string = 'https://migoadvs.pythonanywhere.com/Database/Database/formularioregistrocampana/';
  //?format=json
  constructor(private http: HttpClient) {}

  getResponse() {
    return this.http.get(this.URL);
  }

  updateSolicitud(solicitudId: number, updatedSolicitud: any) {
    const updateUserURL = `${this.URL}${solicitudId}/`;
    return this.http.put(updateUserURL, updatedSolicitud);
  }

}
