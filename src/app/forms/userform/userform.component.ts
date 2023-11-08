import { Component } from '@angular/core';
import { EmpresalistService } from 'src/app/providers/empresalist.service';
import { Empresa } from 'src/app/interfaces/empresa';
import { HttpmailService } from 'src/app/providers/httpmail.service';
@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent {
  constructor(private datae:EmpresalistService , private correohttp: HttpmailService){}
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
  asunto = 'Bienvenido a nuestra aplicación';
  mensaje = 'Estimado usuario, gracias por registrarte en nuestra aplicación.';
  data ={};


  ngOnInit(): void {
      this.datae.getResponse().subscribe((response) => {
      this.empresadata = response as Empresa[];
    });
  }
  close(): void {
  }
  save(): void{
    //alert('Por favor, complete todos los campos obligatorios.');
    this.enviarCorreo();
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
  enviarCorreo():void{
    this.data={ recipient_list: [this.email],
      subject: 'Correo Migo',
      message: 'adjunto las credenciales de su correo:'};
      this.correohttp.requestCall(this.data).subscribe((response) =>{
        console.log(response);  
    });
  }
}
