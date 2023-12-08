import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../interfaces/empresa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresalistService {
  private URL: string = 'https://migoadvs.pythonanywhere.com/Database/Database/empresas/';
  //?format=json
  constructor(private http: HttpClient) {}

  getResponse() {
    return this.http.get(this.URL);
  }
  updateEmpresa(empresaId: number, updatedEmpresa: any) {
    const updateUserURL = `${this.URL}${empresaId}/`;
    return this.http.put(updateUserURL, updatedEmpresa);
  }
  createEmpresa(e:Empresa):Observable<any>{
    return this.http.post(this.URL,e);
  }
}
