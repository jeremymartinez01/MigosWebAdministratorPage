import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehiculolistService {
  private URL: string = 'https://migoadvs.pythonanywhere.com/Database/Database/vehiculos/';
  //?format=json
  constructor(private http: HttpClient) {}

  getResponse() {
    return this.http.get(this.URL);
  }

  getVehiculo(id: number) {
    return this.http.get(this.URL + id + '/');
  }
}
