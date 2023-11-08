import { Component,Output,EventEmitter } from '@angular/core';
import { NombreVentanaService } from '../../providers/nombre-ventana.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  userName : string;
  @Output() onLogout: EventEmitter<void> = new EventEmitter<void>();

  constructor(private nombreVentanaService: NombreVentanaService) {
    this.userName = "USER"
  }
  
  ngOnInit() {
   
    this.nombreVentanaService.userName$.subscribe((userName: string) => {
      this.userName = userName;
    });
  }
  logout(){
    this.onLogout.emit();
  }

  selectedOption: string = ''; // Inicialmente ninguna opción seleccionada

  // Función para cambiar la opción seleccionada
  changeSelectedOption(option: string) {
    if (this.selectedOption !== option) {
      this.selectedOption = option; 
    }
   
  }
  
}
