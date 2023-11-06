import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
