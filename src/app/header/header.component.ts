import { Component, OnInit } from '@angular/core';
import { NombreVentanaService } from '../providers/nombre-ventana.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  windowName: string;
  userName: string;

  constructor(private nombreVentanaService: NombreVentanaService) {
    this.windowName = "HOME"
    this.userName = "USER"
  }

  ngOnInit() {
    this.nombreVentanaService.windowName$.subscribe((name:string) => {
      this.windowName = name;
    });
   
    this.nombreVentanaService.userName$.subscribe((userName: string) => {
      this.userName = userName;
    });
  }
}
