import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NombreVentanaService } from 'src/app/providers/nombre-ventana.service';
import { User } from 'src/app/interfaces/user';
import { UserlistService } from 'src/app/providers/userlist.service';
import { Empresa } from 'src/app/interfaces/empresa';
import { EmpresalistService } from 'src/app/providers/empresalist.service';
import { Campania } from 'src/app/interfaces/campanas';

@Component({
  selector: 'app-campaniaform',
  templateUrl: './campaniaform.component.html',
  styleUrls: ['./campaniaform.component.css']
})
export class CampaniaformComponent {
  constructor(private referencia: MatDialogRef<CampaniaformComponent>, private snackBar: MatSnackBar,
    private usersq: NombreVentanaService,private usuarioservice: UserlistService,
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
      const nuevo:Campania ={
        id_campana: 0,
        nombre_campana: '',
        correo_responsable: '',
        id_sector: 0,
        fecha_inicio: '',
        fecha_fin: '',
        fecha_fin_registro: '',
        presupuesto: 0,
        nombre_responsable: '',
        tarifa_base: 0,
        tarifa_min: 0,
        tarifa_max: 0,
        hora_monetizable_inicio: '',
        hora_monetizable_fin: '',
        cobro_minimo: 0,
        tipo_brandeo: '',
        taller_brandeo: 0,
        carroceria_capo: false,
        puerta_conductor: false,
        puerta_pasajero: false,
        puerta_traseratzq: false,
        puerta_traseraDer: false,
        carroceria_guantera: false,
        carroceria_techo: false,
        fecha_creacion: '',
        fecha_modificacion: '',
        estado: 0,
        sedan_admisible: false,
        suv_admisible: false,
        camion_admisible: false,
        camioneta_admisible: false,
        bus_admisible: false,
        id_empresa: 0,
        id_ciudad: 0,
        id_pais: 0
      };

      /*this.usuarioservice.createUser(unuevo).subscribe((response)=>{
        console.log(response);
      });
      this.clienteservice.createClient(cnuevo).subscribe((response)=>{
        console.log(response);
      });*/
      this.crearCampania(nuevo);
      this.referencia.close();
      this.openSnackBar();
    }

  }
  crearCampania(campania: Campania) {
    throw new Error('Method not implemented.');
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