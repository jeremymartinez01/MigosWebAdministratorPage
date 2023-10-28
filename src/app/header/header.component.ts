import { Component, OnInit } from '@angular/core';
import { UserlistService } from '../providers/userlist.service';
import { User } from '../interfaces/user'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email: string = '';

  constructor(private userService: UserlistService) {}

  ngOnInit(): void {
    this.userService.getResponse().subscribe((users: any) => {
      if (users.length > 0) {
        // Suponiendo que quieres obtener el email del primer usuario en la lista.
        this.email = users[0].email;
      }
    });
  }
}