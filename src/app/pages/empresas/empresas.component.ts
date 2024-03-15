import { Component } from '@angular/core';
import { NombreVentanaService } from '../../providers/nombre-ventana.service';
import { EmpresalistService } from 'src/app/providers/empresalist.service';
import { Empresa } from 'src/app/interfaces/empresa';
import { MatDialog } from '@angular/material/dialog';
import { EmpresaformComponent } from 'src/app/forms/empresaform/empresaform.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { UserlistService } from 'src/app/providers/userlist.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent {

  constructor(private nombreVentanaService: NombreVentanaService, private datae: EmpresalistService,
    private formulario: MatDialog,private snackBar:MatSnackBar, private datau:UserlistService) {}

  empresasdata: Empresa[]= [];
  datausuario: User[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 4; 
  idrole:number =0;
  idmain: number =0;
  ngOnInit(){
    this.nombreVentanaService.setWindowName('EMPRESAS');
    /*this.datae.getResponse().subscribe((response) => {
      this.empresasdata = response as Empresa[];
    });*/
    forkJoin([
      this.datae.getResponse(),
      this.datau.getResponse()
    ]).subscribe((responses) => {
      this.empresasdata = responses[0] as Empresa[];
      this.datausuario = responses[1] as User[];
    });
  }
  
  habilitarUsuario(empresaId: number): void {
    const empresa = this.empresasdata.find((user) => user.id_empresa === empresaId);
    if (empresa) {
      empresa.estado = 1;
      this.datae.updateEmpresa(empresa.id_empresa, empresa).subscribe((response) => {
        //this.usuariodata = (response as User[]);
      });
      this.openSnackBar('1');
    }
  }
  deshabilitarUsuario(empresaId: number): void {
    const empresa = this.empresasdata.find((user) => user.id_empresa === empresaId);
    if (empresa) {
      empresa.estado = 0;
      this.datae.updateEmpresa(empresa.id_empresa, empresa).subscribe((response) => {
        //this.usuariodata = (response as User[]);
      });
      this.openSnackBar('0');
    }
  }
  eliminarUsuario(empresaId: number): void {
    const empresa = this.empresasdata.find((user) => user.id_empresa === empresaId);
    if (empresa) {
      empresa.estado = -1;
      this.datae.updateEmpresa(empresa.id_empresa, empresa).subscribe((response) => {
        //this.usuariodata = (response as User[]);
      });
      this.openSnackBar('-1');
    }
  }


  get totalPages(): number {
    return Math.ceil(this.empresasdata.length / this.itemsPerPage);
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
  getPagedClients(): Empresa[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.empresasdata.slice(startIndex, endIndex);
  }
  openFormDialog(): void {
    this.nombreVentanaService.setUserQuantity(this.datausuario.reduce((maxIdUsuario, usuarioActual) => {
      return usuarioActual.id_usuario > maxIdUsuario ? usuarioActual.id_usuario : maxIdUsuario;
    }, this.datausuario[0].id_usuario));
    const dialogRef = this.formulario.open(EmpresaformComponent, {
      width: '450px',
      height:'600px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  openSnackBar(s:string):void {
    this.snackBar.open('✅ El estado del conductor ha sido actualizado a ' +s+ ' en la base de datos', 'Listo', {
      duration: 4500,
    });
  }

}
