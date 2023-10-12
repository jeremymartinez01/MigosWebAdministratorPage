import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  login() {
  }
  togglePasswordVisibility(input: any) {
    this.showPassword = !this.showPassword;
    input.type = this.showPassword ? 'text' : 'password';
  }

}
