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
  private userQuantitySubject = new BehaviorSubject<number>(0);
  userQuantity$ = this.userQuantitySubject.asObservable();
  private userIdSubject = new BehaviorSubject<number>(0);
  userId$ = this.userIdSubject.asObservable();
  private clientIdSubject = new BehaviorSubject<number>(0);
  clientId$ = this.clientIdSubject.asObservable();
  private conductorIdSubject = new BehaviorSubject<number>(0);
  conductorId$ = this.conductorIdSubject.asObservable();
  private empresaIdSubject = new BehaviorSubject<number>(0);
  empresaId$ = this.empresaIdSubject.asObservable();
  private publicistaIdSubject = new BehaviorSubject<number>(0);
  publicistaId$ = this.publicistaIdSubject.asObservable();

  
  setWindowName(name: string) {
    this.windowNameSubject.next(name);
  }

  setUserName(userName: string) {
    this.userNameSubject.next(userName);
  }

  setIdRole(id:number){
    this.idRoleSubject.next(id);
  }

  setUserQuantity(quantity:number){
    this.userQuantitySubject.next(quantity);
  }

  setUserId(userId: number) {
    this.userIdSubject.next(userId);
  }

  setClientId(id:number){
    this.clientIdSubject.next(id);
  }

  setConductorId(id:number){
    this.conductorIdSubject.next(id);
  }

  setEmpresaId(id:number){
    this.empresaIdSubject.next(id);
  }

  setPublicistaId(id:number){
    this.publicistaIdSubject.next(id);
  }
  
}