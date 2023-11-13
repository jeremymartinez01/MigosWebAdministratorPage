import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserlistService {
  private URL: string = 'https://migoadvs.pythonanywhere.com/Database/Database/usuarios/';
  //?format=json
  constructor(private http: HttpClient) {}

  getResponse() {
    return this.http.get(this.URL);
  }
  updateUser(userId: number, updatedUser: any) {
    const updateUserURL = `${this.URL}${userId}/`;
    return this.http.put(updateUserURL, updatedUser);
  }
  createUser(u:User):Observable<any>{
    return this.http.post(this.URL,u);
  }
}
