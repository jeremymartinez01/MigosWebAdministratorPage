import { Component } from '@angular/core';
import { NombreVentanaService } from '../../providers/nombre-ventana.service';
import { Solicitud } from 'src/app/interfaces/solicitud';
import { Campania } from 'src/app/interfaces/campanas';
import { User } from 'src/app/interfaces/user';
import { SolicitudeslistService } from 'src/app/providers/solicitudeslist.service';
import { CampanialistService } from 'src/app/providers/campanialist.service';
import { EmpresalistService } from 'src/app/providers/empresalist.service';
import { MatDialog } from '@angular/material/dialog';
import { UserformComponent } from 'src/app/forms/userform/userform.component';
import { forkJoin, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Empresa } from 'src/app/interfaces/empresa';
import { ClientelistService } from 'src/app/providers/clientelist.service';
import { Cliente } from 'src/app/interfaces/cliente';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent {
  
  constructor(private dataCampanas: CampanialistService,private dataEmpresas: EmpresalistService, private dataSolicitudes: SolicitudeslistService,
    private formulario: MatDialog, private nombreVentanaService: NombreVentanaService,
    private snackBar:MatSnackBar, private dataClientes: ClientelistService){}
    
  solicitudes: Solicitud[]= [];
  campanaData: Campania[] = [];
  empresaData: Empresa[] = [];
  clienteData: Cliente[] = [];

  roleId:number = 0;
  userId: number = 0;
  clientId: number = 0;
  empresaId: number = 0;

  currentPage: number = 0;
  itemsPerPage: number = 4; 

  ngOnInit(){
    this.nombreVentanaService.setWindowName('SOLICITUDES');

    this.dataSolicitudes.getResponse().subscribe((data: Object) => {
      this.solicitudes = data as Solicitud[];
    });

    this.nombreVentanaService.idRole$.subscribe((id: number) => {
      this.roleId = id;
    });

    this.nombreVentanaService.userId$.subscribe((id: number) => {
      this.userId = id;
    });

    this.nombreVentanaService.clientId$.subscribe((id: number) => {
      this.clientId = id;
    });

    this.nombreVentanaService.empresaId$.subscribe((id: number) => {
      this.empresaId = id;
    });

    forkJoin([
      this.dataCampanas.getResponse(),
      this.dataEmpresas.getResponse(),
      this.dataClientes.getResponse()
    ]).subscribe((responses) => {
      this.campanaData = responses[0] as Campania[];
      this.empresaData = responses[1] as Empresa[];
      this.clienteData = responses[2] as Cliente[];
    });
  }


  aceptarSolicitud(solicitud: Solicitud): void {
    const nuevaSol = {
      id_formulario: solicitud.id_formulario,
      telefono_conductor: solicitud.telefono_conductor,
      licencia: solicitud.licencia,
      matricula: solicitud.matricula,
      numero_cuenta_bancaria: solicitud.numero_cuenta_bancaria,
      cedula: solicitud.cedula,
      entidad_bancaria: solicitud.entidad_bancaria,
      tipo_cuenta_bancaria: solicitud.tipo_cuenta_bancaria,
      correo_electronico: solicitud.correo_electronico,
      fecha_envio: solicitud.fecha_envio,
      estado_solicitud: "aceptado",
      id_usuario: solicitud.id_usuario,
      id_campana: solicitud.id_campana,
      id_ciudad: solicitud.id_ciudad,
      id_pais: solicitud.id_pais,
      id_vehiculo: solicitud.id_vehiculo
  }
    this.dataSolicitudes.updateSolicitud(solicitud.id_formulario, nuevaSol).subscribe((response) => {});
  }

  rechazarSolicitud(solicitud: Solicitud): void {
    const nuevaSol = {
      id_formulario: solicitud.id_formulario,
      telefono_conductor: solicitud.telefono_conductor,
      licencia: solicitud.licencia,
      matricula: solicitud.matricula,
      numero_cuenta_bancaria: solicitud.numero_cuenta_bancaria,
      cedula: solicitud.cedula,
      entidad_bancaria: solicitud.entidad_bancaria,
      tipo_cuenta_bancaria: solicitud.tipo_cuenta_bancaria,
      correo_electronico: solicitud.correo_electronico,
      fecha_envio: solicitud.fecha_envio,
      estado_solicitud: "rechazado",
      id_usuario: solicitud.id_usuario,
      id_campana: solicitud.id_campana,
      id_ciudad: solicitud.id_ciudad,
      id_pais: solicitud.id_pais,
      id_vehiculo: solicitud.id_vehiculo
  }
    this.dataSolicitudes.updateSolicitud(solicitud.id_formulario, nuevaSol).subscribe((response) => {});
  }

  verFormulario(solicitud: Solicitud): void {

  }

  loadFilteredSolicitudes() {
    if (this.roleId === 4) {
      this.solicitudes = this.solicitudes.filter((solicitud) => solicitud.id_campana === this.campanaData.find(campana => campana.id_empresa === this.empresaId)?.id_campana);
    }
    /*if (this.solicitudes.length > 0) {
      this.solicitudes = this.solicitudes.filter((solicitud) =>
      );
    }*/
  }

  get totalPages(): number {
    return Math.ceil(this.solicitudes.length / this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }  
  getPagedSolicitudes(): Solicitud[] {
    this.loadFilteredSolicitudes();
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.solicitudes.slice(startIndex, endIndex);
  }

  getNombreCampana(id:number): string {
    return this.campanaData.find(campana => campana.id_campana === id)?.nombre_campana ?? '';
  }

  getNombre(id_usuario:number): string {
    return this.clienteData.find(cliente => cliente.id_usuario === id_usuario)?.nombre ?? '';
  }

}
