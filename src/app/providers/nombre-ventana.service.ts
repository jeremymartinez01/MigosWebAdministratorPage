import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NombreVentanaService {
  private windowNameSubject = new BehaviorSubject<string>('INICIO');
  windowName$ = this.windowNameSubject.asObservable();
  private userNameSubject = new BehaviorSubject<string>('Usuario Anónimo');
  userName$ = this.userNameSubject.asObservable();
  private idRoleSubject = new BehaviorSubject<number>(0);
  idRole$ = this.idRoleSubject.asObservable();
  private idMainSubject = new BehaviorSubject<number>(0);
  idMain$ = this.idRoleSubject.asObservable();

  setWindowName(name: string) {
    this.windowNameSubject.next(name);
  }

  setUserName(userName: string) {
    this.userNameSubject.next(userName);
  }
  setIdRole(id:number){
    this.idRoleSubject.next(id);
  }
  setIdMain(id:number){
    this.idRoleSubject.next(id);
  }
}