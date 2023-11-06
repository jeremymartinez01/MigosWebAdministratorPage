import { Component } from '@angular/core';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent {

  cedula: string= '';
  nombres: string='';
  apellidos: string='';
  fechanacimiento: string='';
  email: string='';
  contrasenia: string='';
  ccontrasenia: string='';
  telefono: string='';
  sexo: string='';
  empresa: string='';

  close(): void {
  }
  save(): void{

  }
}
