import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marcaconfig } from '../interfaces/marcaconfig';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcasconfigService {

  private URL: string = 'https://migoadvs.pythonanywhere.com/Database/Database/marcasvehiculos/';
  //?format=json
  constructor(private http: HttpClient) {}

  getResponse() {
    return this.http.get(this.URL);
  }
  updateMarca(marcaId: number, updatedMarca: any) {
    const updateUserURL = `${this.URL}${marcaId}/`;
    return this.http.put(updateUserURL, updatedMarca);
  }
  createMarca(m:Marcaconfig):Observable<any>{
    return this.http.post(this.URL,m);
  }

}
