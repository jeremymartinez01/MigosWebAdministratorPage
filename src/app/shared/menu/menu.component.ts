import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Output() onLogout: EventEmitter<void> = new EventEmitter<void>();

  logout(){
    this.onLogout.emit();
  }
}
