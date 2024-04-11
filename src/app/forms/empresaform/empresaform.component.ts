import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NombreVentanaService } from 'src/app/providers/nombre-ventana.service';
import { User } from 'src/app/interfaces/user';
import { UserlistService } from 'src/app/providers/userlist.service';
import { HttpmailService } from 'src/app/providers/httpmail.service';
import { Empresa } from 'src/app/interfaces/empresa';
import { switchMap } from 'rxjs/operators';
import { EmpresalistService } from 'src/app/providers/empresalist.service';


@Component({
  selector: 'app-empresaform',
  templateUrl: './empresaform.component.html',
  styleUrls: ['./empresaform.component.css']
})
export class EmpresaformComponent {
  constructor(private referencia: MatDialogRef<EmpresaformComponent>, private snackBar: MatSnackBar,
    private usersq: NombreVentanaService,private usuarioservice: UserlistService,private correohttp: HttpmailService,
    private eservice:EmpresalistService){}
  cedula: string= '';
  errorMessageCedula: string='';
  nombres: string='';
  errorMessageNombre: string='';
  sexo: string='';
  errorMessageSexo: string='';
  email: string='';
  errorMessageEmail: string='';
  contrasenia: string='';
  errorMessageContrasenia: string='';
  ccontrasenia: string='';
  errorMessageCContrasenia: string='';
  telefono: string='';
  errorMessageTelefono: string='';
  representante:string='';
  errorMessageRepresentante: string='';
  camposllenos: boolean=false;
  errorMessageGeneral: string='';
  showPassword: boolean = false;
  //empresadata: Empresa[]=[];
  asunto = 'Bienvenido a nuestra aplicación';
  mensaje = 'Estimado usuario, gracias por registrarte en nuestra aplicación.';
  data ={};
  quser:number =0;


  ngOnInit(): void {
    /*  this.datae.getResponse().subscribe((response) => {
      this.empresadata = response as Empresa[];
    });*/
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
        rol_usuario: this.determineSex(this.sexo),
      };
      
      const enueva:any ={
        ruc: this.cedula,
        nombre: this.nombres,
        descripcion: this.sexo,
        mail_contacto: this.email,
        telefono: this.telefono,
        fecha_creacion: new Date().toISOString().split('T')[0],
        fecha_modificacion: new Date().toISOString().split('T')[0],
        estado: 1,
        id_usuario: this.quser+1,
      }
      /*this.usuarioservice.createUser(unuevo).subscribe((response)=>{
        console.log(response);
      });
      this.clienteservice.createClient(cnuevo).subscribe((response)=>{
        console.log(response);
      });*/
      this.crearUsuarioYEmpresa(unuevo,enueva);
      this.enviarCorreo();
      this.referencia.close();
      this.openSnackBar();
    }

  }
  
  crearUsuarioYEmpresa(unuevo: User, enuevo: Empresa) {
    this.usuarioservice.createUser(unuevo)
      .pipe(
        switchMap((responseUser) => {
          console.log(responseUser); 
          return this.eservice.createEmpresa(enuevo);
        })
      )
      .subscribe((responseClient) => {
        console.log(responseClient);
      });
  }
  validateForm(): boolean {
    this.camposllenos = (this.cedula.trim() !== '') &&
    (this.nombres.trim() !== '') &&
    (this.sexo.trim() !== '') &&
    (this.email.trim() !== '') &&
    (this.contrasenia.trim() !== '') &&
    (this.ccontrasenia.trim() !== '') &&
    (this.telefono.trim() !== '') &&
    (this.representante.trim() !== '');
    if(this.camposllenos){
      const cedulavalida= this.validateCedula(this.cedula);
      const nombrevalido= this.validateName(this.nombres);
      const correovalido = this.validateEmail(this.email);
      const contraseniavalida = this.validateContrasenia(this.contrasenia);
      const ccontraseniavalida = this.validateCcontrasenia(this.contrasenia,this.ccontrasenia);
      const telefonovalido = this.validatePhone(this.telefono);
      const sexovalido = this.sexo !== '';
      const representantevalido = this.validateName(this.representante);
      if(cedulavalida && nombrevalido && correovalido
        && contraseniavalida && ccontraseniavalida && telefonovalido && sexovalido && representantevalido){
          this.errorMessageCedula = '';
          this.errorMessageNombre = '';
          this.errorMessageEmail = '';
          this.errorMessageContrasenia = '';
          this.errorMessageCContrasenia = '';
          this.errorMessageTelefono = '';
          this.errorMessageSexo = '';
          this.errorMessageRepresentante = '';
          return true;
      }else{
        const cedulavalida= this.validateCedula(this.cedula);
        const nombrevalido= this.validateName(this.nombres);
        const correovalido = this.validateEmail(this.email);
        const contraseniavalida = this.validateContrasenia(this.contrasenia);
        const ccontraseniavalida = this.validateCcontrasenia(this.contrasenia,this.ccontrasenia);
        const telefonovalido = this.validatePhone(this.telefono);
        const sexovalido = this.sexo !== '';
        const representantevalido = this.validateName(this.representante);;
        if(!cedulavalida){
          this.errorMessageCedula = 'Cedula solo puede tener 13 digitos sin espacios';
        }else{
          this.errorMessageCedula = '';
        }
        if(!nombrevalido){
          this.errorMessageNombre = 'Nombre solo puede tener letras';
        }else{
          this.errorMessageNombre = '';
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
        if(!sexovalido){
          this.errorMessageSexo = 'Escoger una opcion';
        }else{
          this.errorMessageSexo = '';
        }
        if(!representantevalido){
          this.errorMessageRepresentante = 'Representante solo puede tener letras';
        }else{
          this.errorMessageRepresentante = '';
        }
        this.errorMessageGeneral = 'Error en formato de los campos';
        return false;
      }
    }else{
      const cedulavalida= this.validateCedula(this.cedula);
      const nombrevalido= this.validateName(this.nombres);
      const correovalido = this.validateEmail(this.email);
      const contraseniavalida = this.validateContrasenia(this.contrasenia);
      const ccontraseniavalida = this.validateCcontrasenia(this.contrasenia,this.ccontrasenia);
      const telefonovalido = this.validatePhone(this.telefono);
      const sexovalido = this.sexo !== '';
      const representantevalido = this.validateName(this.representante);;
      if(!cedulavalida){
        this.errorMessageCedula = 'Cedula solo puede tener 13 digitos sin espacios';
      }else{
        this.errorMessageCedula = '';
      }
      if(!nombrevalido){
        this.errorMessageNombre = 'Nombre solo puede tener letras';
      }else{
        this.errorMessageNombre = '';
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
      if(!sexovalido){
        this.errorMessageSexo = 'Escoger una opcion'
      }else{
        this.errorMessageSexo = ''
      }
      if(!representantevalido){
        this.errorMessageRepresentante = 'Representante solo puede tener letras';
      }else{
        this.errorMessageRepresentante = '';
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
    return /^\d{13}$/.test(s);
  }
  validatePhone(s:string):boolean{
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
    if(s ==='Empresa'){
      return 4;
    }else{
      return 3;
    }
  }
}
