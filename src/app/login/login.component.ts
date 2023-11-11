import { Component, Output, EventEmitter } from '@angular/core'
import { User } from '../interfaces/user'
import { UserlistService } from '../providers/userlist.service'
import { NombreVentanaService } from '../providers/nombre-ventana.service';
import { forkJoin } from 'rxjs';
import { ClientelistService } from '../providers/clientelist.service';
import { Cliente } from '../interfaces/cliente';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (private data: UserlistService, private datac: ClientelistService,  private nombreVentanaService: NombreVentanaService) {}
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  userdata: User[]=[];
  clientdada: Cliente[]=[];
  errorMessage: String = '';
  nombre: string = '';
  @Output() onLogin: EventEmitter<void> = new EventEmitter<void>();
  /*ngOnInit():void {
    this.data.getResponse().subscribe((response) => { 
      this.userdata = (response as User[]); 
    });
  }*/
  ngOnInit(): void {
    forkJoin([
      this.data.getResponse(),
      this.datac.getResponse()
    ]).subscribe((responses) => {
      this.userdata = responses[0] as User[];
      this.clientdada = responses[1] as Cliente[];
    });
  }

  login () {
    const testing = this.userdata.find(u => u.email === this.username && u.contrasena === this.password);
    if(testing && (testing.rol_usuario === 1 || testing.rol_usuario === 2)){
      this.nombre  = this.getNombre();
      this.nombreVentanaService.setUserName(this.nombre);
      this.nombreVentanaService.setIdRole(testing.rol_usuario);
      this.nombreVentanaService.setIdMain(testing.id_usuario);
      this.onLogin.emit()
    }else if(testing && !(testing.rol_usuario === 1 || testing.rol_usuario === 2)){
      this.errorMessage = 'Usted no tiene acceso a este sitio';
    }else{
      this.errorMessage = 'Correo o contraseña incorrectos';
    }
  }
  getNombre(): string{
    const userid = this.userdata.find(user => user.email === this.username && user.contrasena === this.password);
    const usuario = this.clientdada.find(client => client.id_cliente === userid?.id_usuario);
    return usuario ? usuario.nombre: '';
  }

  togglePasswordVisibility (input: any) {
    this.showPassword = !this.showPassword
    input.type = this.showPassword ? 'text' : 'password'
  }
}
