import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chofer } from '../interfaces/chofer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChoferlistService {
  private URL: string = 'https://migoadvs.pythonanywhere.com/Database/Database/choferes/';
  //?format=json
  constructor(private http: HttpClient) {}

  getResponse() {
    return this.http.get(this.URL);
  }

  createChofer(c:Chofer):Observable<any>{
    return this.http.post(this.URL,c);
  }
  
}
