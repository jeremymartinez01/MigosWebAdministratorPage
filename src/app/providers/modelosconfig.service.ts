import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Modeloconfig } from '../interfaces/modeloconfig';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelosconfigService {

  private URL: string = 'https://migoadvs.pythonanywhere.com/Database/Database/modelosvehiculos/';
  //?format=json
  constructor(private http: HttpClient) {}

  getResponse() {
    return this.http.get(this.URL);
  }
  updateModelo(modeloId: number, updatedMarca: any) {
    const updateUserURL = `${this.URL}${modeloId}/`;
    return this.http.put(updateUserURL, updatedMarca);
  }
  createModelo(m:Modeloconfig):Observable<any>{
    return this.http.post(this.URL,m);
  }

}
