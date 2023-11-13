import { Component } from '@angular/core';
import { EmpresalistService } from 'src/app/providers/empresalist.service';
import { Empresa } from 'src/app/interfaces/empresa';
import { HttpmailService } from 'src/app/providers/httpmail.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserlistService } from 'src/app/providers/userlist.service';
import { NombreVentanaService } from 'src/app/providers/nombre-ventana.service';
import { User } from 'src/app/interfaces/user';
import { ClientelistService } from 'src/app/providers/clientelist.service';
import { Cliente } from 'src/app/interfaces/cliente';
@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent {
  constructor(private datae:EmpresalistService , private correohttp: HttpmailService,
    private referencia: MatDialogRef<UserformComponent>, private snackBar: MatSnackBar,
    private usuarioservice:UserlistService, private usersq: NombreVentanaService,
    private clienteservice:ClientelistService){}
  cedula: string= '';
  errorMessageCedula: string='';
  nombres: string='';
  errorMessageNombre: string='';
  apellidos: string='';
  errorMessageApellido: string='';
  fechanacimiento: ScrollSetting='';
  errorMessageFecha: string='';
  email: string='';
  errorMessageEmail: string='';
  contrasenia: string='';
  errorMessageContrasenia: string='';
  ccontrasenia: string='';
  errorMessageCContrasenia: string='';
  telefono: string='';
  errorMessageTelefono: string='';
  sexo: string='';
  errorMessageSexo: string='';
  empresa: string='';
  errorMessageEmpresa: string='';
  camposllenos: boolean=false;
  errorMessageGeneral: string='';
  showPassword: boolean = false;
  empresadata: Empresa[]=[];
  asunto = 'Bienvenido a nuestra aplicación';
  mensaje = 'Estimado usuario, gracias por registrarte en nuestra aplicación.';
  data ={};
  quser:number =0;


  ngOnInit(): void {
      this.datae.getResponse().subscribe((response) => {
      this.empresadata = response as Empresa[];
    });
  }
  close(): void {
    this.referencia.close();
  }
  save(): void{
    if(this.validateForm()){
      this.usersq.userQuantity$.subscribe((q:number)=>{
        this.quser=q;
      });
      const unuevo:User ={
        id_usuario: this.quser+1,
        email: this.email,
        placa: '',
        contrasena: this.contrasenia,
        fecha_creacion: new Date().toISOString().split('T')[0],
        fecha_modificacion: new Date().toISOString().split('T')[0],
        estado: 1,
        rol_usuario: 2,
      };
      const cnuevo:any ={
        id_cliente: this.quser+1,
        cedula_cliente: this.cedula,
        nombre: this.nombres,
        apellido: this.apellidos,
        fecha_nacimiento: new Date(this.fechanacimiento).toISOString().split('T')[0],
        email: this.email,
        sexo: this.determineSex(this.sexo),
        telefono: this.telefono,
        estado: 1,
        id_empresa: this.empresaIdbyName(this.empresa),
      }
      this.usuarioservice.createUser(unuevo).subscribe((response)=>{
        console.log(response);
      });
      this.clienteservice.createClient(cnuevo).subscribe((response)=>{
        console.log(response);
      });
      this.enviarCorreo();
      this.referencia.close();
      this.openSnackBar();
    }

  }

  validateForm(): boolean {
    this.camposllenos = (this.cedula.trim() !== '') &&
    (this.nombres.trim() !== '') &&
    (this.apellidos.trim() !== '') &&
    (this.fechanacimiento !== '') &&
    (this.email.trim() !== '') &&
    (this.contrasenia.trim() !== '') &&
    (this.ccontrasenia.trim() !== '') &&
    (this.telefono.trim() !== '') &&
    (this.sexo.trim() !== '') &&
    (this.empresa.trim() !== '');
    if(this.camposllenos){
      const cedulavalida= this.validateCedula(this.cedula);
      const nombrevalido= this.validateName(this.nombres);
      const apellidovalido = this.validateName(this.apellidos);
      const fechavalida = this.validateFecha(this.fechanacimiento);
      const correovalido = this.validateEmail(this.email);
      const contraseniavalida = this.validateContrasenia(this.contrasenia);
      const ccontraseniavalida = this.validateCcontrasenia(this.contrasenia,this.ccontrasenia);
      const telefonovalido = this.validateCedula(this.telefono);
      const empresavalida = this.empresa !== '';
      const sexovalido = this.sexo !== '';
      if(cedulavalida && nombrevalido && apellidovalido && fechavalida && correovalido
        && contraseniavalida && ccontraseniavalida && telefonovalido && empresavalida && sexovalido ){
          this.errorMessageCedula = '';
          this.errorMessageNombre = '';
          this.errorMessageApellido = '';
          this.errorMessageFecha = '';
          this.errorMessageEmail = '';
          this.errorMessageContrasenia = '';
          this.errorMessageCContrasenia = '';
          this.errorMessageTelefono = '';
          this.errorMessageSexo = '';
          return true;
      }else{
        const cedulavalida= this.validateCedula(this.cedula);
        const nombrevalido= this.validateName(this.nombres);
        const apellidovalido = this.validateName(this.apellidos);
        const fechavalida = this.validateFecha(this.fechanacimiento);
        const correovalido = this.validateEmail(this.email);
        const contraseniavalida = this.validateContrasenia(this.contrasenia);
        const ccontraseniavalida = this.validateCcontrasenia(this.contrasenia,this.ccontrasenia);
        const telefonovalido = this.validateCedula(this.telefono);
        const empresavalida = this.empresa !== '';
        const sexovalido = this.sexo !== '';
        if(!cedulavalida){
          this.errorMessageCedula = 'Cedula solo puede tener 10 digitos sin espacios';
        }else{
          this.errorMessageCedula = '';
        }
        if(!nombrevalido){
          this.errorMessageNombre = 'Nombre solo puede tener letras';
        }else{
          this.errorMessageNombre = '';
        }
        if(!apellidovalido){
          this.errorMessageApellido = 'Apellido solo puede tener letras';
        }else{
          this.errorMessageApellido = '';
        }
        if(!fechavalida){
          this.errorMessageFecha = 'Edad debe ser mayor o igual a 18 años';
        }else{
          this.errorMessageFecha = '';
        }
        if(!correovalido){
          this.errorMessageEmail = 'Formato de correo invalido';
        }else{
          this.errorMessageEmail = ''; 
        }
        if(!contraseniavalida){
          this.errorMessageContrasenia = 'Contraseña debe tener entre 7 y 10 caracteres con letras numeros y simbolos';
        }else{
          this.errorMessageContrasenia = '';
        }
        if(!ccontraseniavalida){
          this.errorMessageCContrasenia = 'Las contraseñas no son iguales';
        }else{
          this.errorMessageCContrasenia = ''; 
        }
        if(!telefonovalido){
          this.errorMessageTelefono = 'Numero solo puede tener 10 digitos sin espacios';
        }else{
          this.errorMessageTelefono = '';
        }
        if(!empresavalida){
          this.errorMessageEmpresa = 'Escoger una opcion';
        }else{
          this.errorMessageEmpresa = '';
        }
        if(!sexovalido){
          this.errorMessageSexo = 'Escoger una opcion'
        }else{
          this.errorMessageSexo = ''
        }
        this.errorMessageGeneral = 'Error en formato de los campos';
        return false;
      }
    }else{
      const cedulavalida= this.validateCedula(this.cedula);
      const nombrevalido= this.validateName(this.nombres);
      const apellidovalido = this.validateName(this.apellidos);
      const fechavalida = this.validateFecha(this.fechanacimiento);
      const correovalido = this.validateEmail(this.email);
      const contraseniavalida = this.validateContrasenia(this.contrasenia);
      const ccontraseniavalida = this.validateCcontrasenia(this.contrasenia,this.ccontrasenia);
      const telefonovalido = this.validateCedula(this.telefono);
      const empresavalida = this.empresa !== '';
      const sexovalido = this.sexo !== '';
      if(!cedulavalida){
        this.errorMessageCedula = 'Cedula solo puede tener 10 digitos sin espacios';
      }else{
        this.errorMessageCedula = '';
      }
      if(!nombrevalido){
        this.errorMessageNombre = 'Nombre solo puede tener letras';
      }else{
        this.errorMessageNombre = '';
      }
      if(!apellidovalido){
        this.errorMessageApellido = 'Apellido solo puede tener letras';
      }else{
        this.errorMessageApellido = '';
      }
      if(!fechavalida){
        this.errorMessageFecha = 'Edad debe ser mayor o igual a 18 años';
      }else{
        this.errorMessageFecha = '';
      }
      if(!correovalido){
        this.errorMessageEmail = 'Formato de correo invalido';
      }else{
        this.errorMessageEmail = ''; 
      }
      if(!contraseniavalida){
        this.errorMessageContrasenia = 'Contraseña debe tener entre 7 y 10 caracteres con letras numeros y simbolos';
      }else{
        this.errorMessageContrasenia = '';
      }
      if(!ccontraseniavalida){
        this.errorMessageCContrasenia = 'Las contraseñas no son iguales';
      }else{
        this.errorMessageCContrasenia = ''; 
      }
      if(!telefonovalido){
        this.errorMessageTelefono = 'Numero solo puede tener 10 digitos sin espacios';
      }else{
        this.errorMessageTelefono = '';
      }
      if(!empresavalida){
        this.errorMessageEmpresa = 'Escoger una opcion';
      }else{
        this.errorMessageEmpresa = '';
      }
      if(!sexovalido){
        this.errorMessageSexo = 'Escoger una opcion'
      }else{
        this.errorMessageSexo = ''
      }
      this.errorMessageGeneral = 'Llenar todos los campos';
    }
    return false;
  }
  togglePasswordVisibility (input: any) {
    this.showPassword = !this.showPassword
    input.type = this.showPassword ? 'text' : 'password'
  }
  enviarCorreo():void{
    this.data={ recipient_list: [this.email],
      subject: 'Correo Migo',
      message: `Adjunto las credenciales de su cuenta.
      Correo: ${this.email}
      Contraseña: ${this.contrasenia}`};
      this.correohttp.requestCall(this.data).subscribe((response) =>{
        console.log(response);  
    });
  }
  validateCedula(s:string):boolean{
    return /^\d{10}$/.test(s);
  }
  validateName(s:string): boolean{
    return /^[a-zA-Z\s]+$/.test(s);
  }
  validateFecha(s:string):boolean{
    const dateObject = new Date(s);

    const fechaActual = new Date();
  
    const diferenciaAnios = fechaActual.getFullYear() - dateObject.getFullYear();
  
    if (diferenciaAnios > 18) {
      return true;
    } else if (diferenciaAnios === 18) {
      if (fechaActual.getMonth() > dateObject.getMonth()) {
        return true;
      } else if (fechaActual.getMonth() === dateObject.getMonth()) {
        return fechaActual.getDate() >= dateObject.getDate();
      }
    }
  
    return false;
  }
  validateEmail(s:string):boolean{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(s);
  }
  validateContrasenia(s:string):boolean{
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\/-])[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\/-]{7,10}$/;
    return passwordRegex.test(s);
  }
  validateCcontrasenia(s1:string,s2:string):boolean{
    return s1 === s2;
  }
  openSnackBar():void {
    this.snackBar.open('✅ Usuario registrado en la base de datos y correo con credenciales enviado', 'Listo', {
      duration: 4500,
    });
  }
  determineSex(s:string):number{
    if(s ==='Masculino'){
      return 1;
    }else{
      return 2;
    }
  }
  empresaIdbyName(s:string):number{
    const empresa = this.empresadata.find(empresa => empresa.nombre === s);
    return empresa ? empresa.id_empresa : 0;
  }
}
