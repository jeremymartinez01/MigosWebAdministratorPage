import { Component,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router:Router){}
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  @Output() onLogin: EventEmitter<void> = new EventEmitter<void>();


  login() {
    this.onLogin.emit(); 
  }
  togglePasswordVisibility(input: any) {
    this.showPassword = !this.showPassword;
    input.type = this.showPassword ? 'text' : 'password';
  }

}
