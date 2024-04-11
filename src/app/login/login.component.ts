import { Component, Output, EventEmitter } from '@angular/core'
import { User } from '../interfaces/user'
import { UserlistService } from '../providers/userlist.service'
import { NombreVentanaService } from '../providers/nombre-ventana.service';
import { ClientelistService } from '../providers/clientelist.service';
import { Cliente } from '../interfaces/cliente';
import { EmpresalistService } from '../providers/empresalist.service';
import { Empresa } from '../interfaces/empresa';
import { PublicistalistService } from '../providers/publicistalist.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor ( private dataU: UserlistService,
                private dataC: ClientelistService, 
                private dataE: EmpresalistService,
                private nombreVentanaService: NombreVentanaService) {}

  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  userdata: User[]=[];
  clientdada: Cliente[]=[];
  empresadata: Empresa[]=[];

  errorMessage: String = '';
  nombre: string = '';
  @Output() onLogin: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit():void {
    this.dataU.getResponse().subscribe((response) => { 
      this.userdata = (response as User[]); 
    });
    this.dataC.getResponse().subscribe((response) => { 
      this.clientdada = (response as Cliente[]); 
    });
    this.dataE.getResponse().subscribe((response) => { 
      this.empresadata = (response as Empresa[]); 
    });
  }
  /*ngOnInit(): void {
    forkJoin([
      this.data.getResponse(),
      this.datac.getResponse()
    ]).subscribe((responses) => {
      this.userdata = responses[0] as User[];
      this.clientdada = responses[1] as Cliente[];
    });
  }*/

  login () {
    const encryptedPass = CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex);
    const testing = this.userdata.find(u => u.email === this.username && u.contrasena === encryptedPass);

    if(testing && (testing.rol_usuario === 1 || testing.rol_usuario === 3 || testing.rol_usuario === 4)){
      if (testing?.rol_usuario === 1) { /*para admin*/
        const cliente = this.clientdada.find(c => c.id_usuario === testing.id_usuario);
        this.nombre = cliente?.nombre + ' ' + cliente?.apellido;
        this.nombreVentanaService.setIdRole(1);
        this.nombreVentanaService.setClientId(testing.id_usuario);
      }

      if (testing?.rol_usuario === 3 || testing?.rol_usuario === 4) { /*para publicista y empresa*/
        console.log("entre a pub y emp");
        const empresa = this.empresadata.find(e => e.id_usuario === testing.id_usuario);
        this.nombreVentanaService.setIdRole(testing.rol_usuario);
        this.nombreVentanaService.setEmpresaId(empresa?.id_empresa ?? 0);
        this.nombreVentanaService.setPublicistaId(1);/* por hacer */
      }

      this.nombreVentanaService.setUserName(this.nombre);
      this.nombreVentanaService.setUserId(testing.id_usuario);
      this.nombreVentanaService.setUserQuantity(this.userdata.length);

      this.onLogin.emit();
    }else if(testing && !(testing.rol_usuario === 1 || testing.rol_usuario === 2)){
      this.errorMessage = 'Usted no tiene acceso a este sitio';
    }else{
      this.errorMessage = 'Correo o contraseña incorrectos';
    }
  }

  togglePasswordVisibility (input: any) {
    this.showPassword = !this.showPassword
    input.type = this.showPassword ? 'text' : 'password'
  }
}
