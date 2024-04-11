import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Campania } from '../interfaces/campanas';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CampanialistService {

  private URL: string = 'https://migoadvs.pythonanywhere.com/Database/Database/campaniaspublicitarias/';
  constructor(private http: HttpClient) {}

  getResponse() {
    return this.http.get(this.URL);
  }

  createCampana(c:Campania):Observable<any>{
    return this.http.post(this.URL,c);
  }
}
