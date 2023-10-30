
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  public pageSize = 5;
  public pageIndex = 0;
  public visibleNotifications: any[] = []; // Inicializado como un arreglo vacío

  public notifications: any[] = [ {
    title: 'Empresa Movistar se ha registrado exitosamente 1',
    imageSrc: 'URL_imagen_1',
    additionalInfo: 'Contenido adicional de la notificación 1'
  },
  {
    title: 'Notificación 2',
    imageSrc: 'URL_imagen_2',
    additionalInfo: 'Empresa Movistar se ha registrado exitosamente 2'
  },
  {
    title: 'Empresa Movistar se ha registrado exitosamente 3',
    imageSrc: 'URL_imagen_3',
    additionalInfo: 'Contenido adicional de la notificación 3'
  },
  {
    title: 'Empresa Movistar se ha registrado exitosamente4',
    imageSrc: 'URL_imagen_4',
    additionalInfo: 'Contenido adicional de la notificación 4'
  },
  {
    title: 'Empresa Movistar se ha registrado exitosamente5',
    imageSrc: 'URL_imagen_5',
    additionalInfo: 'Contenido adicional de la notificación 1'
  },
  {
    title: 'Empresa Movistar se ha registrado exitosamente 6',
    imageSrc: 'URL_imagen_6',
    additionalInfo: 'Contenido adicional de la notificación 2'
  },
  {
    title: 'Empresa Movistar se ha registrado exitosamente7',
    imageSrc: 'URL_imagen_7',
    additionalInfo: 'Contenido adicional de la notificación 3'
  },
  {
    title: 'Empresa Movistar se ha registrado exitosamente 8',
    imageSrc: 'URL_imagen_8',
    additionalInfo: 'Contenido adicional de la notificación 4'
  }
];
  

  ngAfterViewInit() {
    this.initializePaginator();
  }

  initializePaginator() {
    if (this.paginator) {
      this.paginator.pageSize = this.pageSize;
      this.paginator.pageIndex = this.pageIndex;
      this.paginator.length = this.notifications.length; // Establecer la longitud del paginador
      this.paginator.page.subscribe((event) => {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.updateNotifications();
      });
  
      this.updateNotifications();
    }
  }

  updateNotifications() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.visibleNotifications = this.notifications.slice(startIndex, endIndex);
  }

  public closeNotification(index: number) {
    this.notifications.splice(index, 1);
    this.updateNotifications();
    if (this.paginator) {
      this.paginator.length = this.notifications.length;
    }
  }

  public deleteAllNotifications() {
    this.notifications = [];
    this.updateNotifications();
    if (this.paginator) {
      this.paginator.length = this.notifications.length;
    }
  }
}