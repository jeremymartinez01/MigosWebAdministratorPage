import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../interfaces/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientelistService {
  private URL: string = 'https://migoadvs.pythonanywhere.com/Database/Database/clientes/';
  //?format=json
  constructor(private http: HttpClient) {}

  getResponse() {
    return this.http.get(this.URL);
  }
  createClient(c:Cliente):Observable<any>{
    return this.http.post(this.URL,c);
  }
}
