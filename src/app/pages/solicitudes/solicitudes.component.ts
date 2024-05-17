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
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { HttpClient } from '@angular/common/http';
import { SolicitudDetailComponent } from '../solicitud-detail/solicitud-detail.component';
import { VehiculolistService } from 'src/app/providers/vehiculolist.service';
import { Marcaconfig } from 'src/app/interfaces/marcaconfig';
import { MarcasconfigService } from 'src/app/providers/marcasconfig.service';
import { Modeloconfig } from 'src/app/interfaces/modeloconfig';
import { ModelosconfigService } from 'src/app/providers/modelosconfig.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent {
  
  constructor(private dataCampanas: CampanialistService,private dataEmpresas: EmpresalistService, private dataSolicitudes: SolicitudeslistService,
    private formulario: MatDialog, private nombreVentanaService: NombreVentanaService, private http: HttpClient,
    private snackBar:MatSnackBar, private dataClientes: ClientelistService, private vehiculoService: VehiculolistService,
    private marcaService: MarcasconfigService, private modeloService: ModelosconfigService){}
    
  solicitudes: Solicitud[]= [];
  campanaData: Campania[] = [];
  empresaData: Empresa[] = [];
  clienteData: Cliente[] = [];
  vehiculoData: any[] = [];

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

    this.vehiculoService.getResponse().subscribe((data: Object) => {
      this.vehiculoData = data as Vehiculo[];
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
    var nuevaSol = {
      estado_solicitud: "aceptado",
    }

    this.dataSolicitudes.updateSolicitud(solicitud.id_formulario, nuevaSol).subscribe((response) => {});

    this.snackBar.open('Solicitud aceptada', 'Cerrar', {
      duration: 2000,
    });
  }

  rechazarSolicitud(solicitud: Solicitud): void {
    const nuevaSol = {
      estado_solicitud: "rechazado",
    }
    this.dataSolicitudes.updateSolicitud(solicitud.id_formulario, nuevaSol).subscribe((response) => {});

    this.snackBar.open('Solicitud rechazada', 'Cerrar', {
      duration: 2000,
    });
  }

  verFormulario(solicitud: Solicitud): void {
    console.log(this.getNombre(solicitud.id_campana));
    const dialogRef = this.formulario.open(SolicitudDetailComponent, {
      width: '950px',
      height: '800px',
      data: {formulario: solicitud, campana: this.getNombreCampana(solicitud.id_campana), nombre: this.getNombre(solicitud.id_usuario),
              vehiculo: this.vehiculoData.find(vehiculo => vehiculo.id_vehiculo === solicitud.id_vehiculo,)}
    });

    dialogRef.afterClosed().subscribe(result => {
      ////
    });
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
