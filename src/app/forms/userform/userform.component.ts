import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { EmpresalistService } from 'src/app/providers/empresalist.service';
import { Empresa } from 'src/app/interfaces/empresa';
//import * '../../correo/enviocorreo.js'
@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent {
  constructor(private datae:EmpresalistService ){}
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
  camposllenos: boolean=false;
  showPassword: boolean = false;
  empresadata: Empresa[]=[];

  ngOnInit(): void {
      this.datae.getResponse().subscribe((response) => {
      this.empresadata = response as Empresa[];
    });
  }
  close(): void {
  }
  save(): void{
    //alert('Por favor, complete todos los campos obligatorios.');
  }

  validateForm(): boolean {
    this.camposllenos = (this.cedula.trim() !== '') &&
    (this.nombres.trim() !== '') &&
    (this.apellidos.trim() !== '') &&
    (this.fechanacimiento.trim() !== '') &&
    (this.email.trim() !== '') &&
    (this.contrasenia.trim() !== '') &&
    (this.ccontrasenia.trim() !== '') &&
    (this.telefono.trim() !== '') &&
    (this.sexo.trim() !== '') &&
    (this.empresa.trim() !== '');
    return true;
  }
  togglePasswordVisibility (input: any) {
    this.showPassword = !this.showPassword
    input.type = this.showPassword ? 'text' : 'password'
  }
}
