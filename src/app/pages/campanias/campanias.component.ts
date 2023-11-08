import { Component } from '@angular/core';
import { NombreVentanaService } from '../../providers/nombre-ventana.service';
import { Campania } from 'src/app/interfaces/campania';
import { CampanialistService } from 'src/app/providers/campanialist.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClientelistService } from 'src/app/providers/clientelist.service';
import { forkJoin } from 'rxjs';
import { CampaniaformComponent } from 'src/app/forms/campaniaform/campaniaform.component';
import { MatDialog } from '@angular/material/dialog';
import { EmpresalistService } from 'src/app/providers/empresalist.service';
import { Empresa } from 'src/app/interfaces/empresa';
@Component({
  selector: 'app-campanias',
  templateUrl: './campanias.component.html',
  styleUrls: ['./campanias.component.css']
})
export class CampaniasComponent {

  constructor(private datacam: CampanialistService,private dataclient: ClientelistService,
    private dataem: EmpresalistService, private formulario: MatDialog, private nombreVentanaService: NombreVentanaService) {}
  campaingdata: Campania[] = [];
  clientdata: Cliente[] = [];
  empresadata: Empresa[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 4; 
  ngOnInit(){
    this.nombreVentanaService.setWindowName('CAMPAÑAS');
    forkJoin([
      this.datacam.getResponse(),
      this.dataclient.getResponse(),
      this.dataem.getResponse()
    ]).subscribe((responses) => {
      this.campaingdata = responses[0] as Campania[];
      this.clientdata = responses[1] as Cliente[];
      this.empresadata = responses[2] as Empresa[];
    });
  }
  getTotalDrivers(idcampaign:number):number{
    const customersInCampaign = this.clientdata.filter(customer => customer.id_campana === idcampaign);
    return customersInCampaign.length;  
  }

  getEmpresa(idempresa:number): String{
    const empresa = this.empresadata.find(empresa => empresa.id_empresa === idempresa);
    return empresa ? empresa.nombre : '';
  }
  /*loadFilteredCampaigns(): void {
    if (this.campaingdata.length > 0) {
      this.clientedata = this.clientedata.filter((cliente) =>
      this.usuariodata.some((user) => user.id_usuario === cliente.id_cliente));
      this.clientedata = this.clientedata.filter((cliente) => cliente.estado === 2);
    }
  }*/

  get totalPages(): number {
    return Math.ceil(this.campaingdata.length / this.itemsPerPage);
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
  getPagedClients(): Campania[] {
    //this.loadFilteredClients();
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.campaingdata.slice(startIndex, endIndex);
  }
  editarCampania(id:number):void{}
  deshabilitarCampania(id:number):void{}
  eliminarCampania(id: number):void{}
  openFormDialog(): void {
    const dialogRef = this.formulario.open(CampaniaformComponent, {
      width: '450px',
      height:'600px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
