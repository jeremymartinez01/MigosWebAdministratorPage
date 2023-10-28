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

  selectedOption: string = ''; // Inicialmente ninguna opción seleccionada

  // Función para cambiar la opción seleccionada
  changeSelectedOption(option: string) {
    if (this.selectedOption !== option) {
      this.selectedOption = option; // Establecer la nueva opción
    }
   /* if (this.selectedOption === option) {
      
      this.selectedOption = ''; // Restablecer la opción si ya está seleccionada
    } else {
      this.selectedOption = option; // Establecer la nueva opción
    }*/
  }
  
}
