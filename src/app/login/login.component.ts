import { Component, Output, EventEmitter } from '@angular/core'
import { User } from '../interfaces/user'
import { UserlistService } from '../providers/userlist.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (private data: UserlistService) {}
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  userdata: User[]=[];
  errorMessage: String = '';
  @Output() onLogin: EventEmitter<void> = new EventEmitter<void>();
  ngOnInit():void {
    this.data.getResponse().subscribe((response) => { 
      this.userdata = (response as User[]); 
    });
  }

  login () {
    const testing = this.userdata.find(u => u.email === this.username && u.contrasena === this.password);
    if(testing && this.username === 'admin@gmail.com'){
      this.onLogin.emit()
    }else{
      this.errorMessage = 'Correo o contraseña incorrectos';
    }
  }

  togglePasswordVisibility (input: any) {
    this.showPassword = !this.showPassword
    input.type = this.showPassword ? 'text' : 'password'
  }
}
