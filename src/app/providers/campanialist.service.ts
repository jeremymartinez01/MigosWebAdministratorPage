import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CampanialistService {

  private URL: string = 'https://migoadvs.pythonanywhere.com/Database/Database/campaniaspublicitarias/';
  constructor(private http: HttpClient) {}

  getResponse() {
    return this.http.get(this.URL);
  }
}
