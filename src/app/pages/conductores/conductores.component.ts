import { Component } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente';
import { User } from 'src/app/interfaces/user';
import { ClientelistService } from 'src/app/providers/clientelist.service';
import { UserlistService } from 'src/app/providers/userlist.service';
import { MatDialog } from '@angular/material/dialog';
import { UserformComponent } from 'src/app/forms/userform/userform.component';
import { forkJoin } from 'rxjs';
import { NombreVentanaService } from '../../providers/nombre-ventana.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.css']
})
export class ConductoresComponent {
  constructor(private datac: ClientelistService,private datau: UserlistService, 
    private formulario: MatDialog, private nombreVentanaService: NombreVentanaService,
    private snackBar:MatSnackBar){}
  clientedata: Cliente[]=[];
  usuariodata: User[]=[];
  idrole:number =0;
  idmain: number =0;
  
  ngOnInit(): void {
    this.nombreVentanaService.setWindowName('CONDUCTORES');
    this.nombreVentanaService.idRole$.subscribe((id: number) => {
      this.idrole = id;
    });
    this.nombreVentanaService.idMain$.subscribe((id: number) => {
      this.idmain = id;
    });
    forkJoin([
      this.datac.getResponse(),
      this.datau.getResponse()
    ]).subscribe((responses) => {
      this.clientedata = responses[0] as Cliente[];
      this.usuariodata = responses[1] as User[];
    });
  }
  getUsuarioFechaCreacion(clienteId: number): String {
    const usuario = this.usuariodata.find(user => user.id_usuario === clienteId);
    return usuario ? usuario.fecha_creacion : '';
  }

  getUsuarioEmail(clienteId: number): String {
    const usuario = this.usuariodata.find(user => user.id_usuario === clienteId);
    return usuario ? usuario.email : '';
  }

  loadFilteredClients(): void {
    if (this.clientedata.length > 0) {
      this.clientedata = this.clientedata.filter((cliente) =>
      this.usuariodata.some((user) => user.id_usuario === cliente.id_usuario));
      //this.clientedata = this.clientedata.filter((cliente) => cliente.estado === 2);
      if(this.idrole === 2){
        this.clientedata.filter(cliente => cliente.id_empresa === this.idmain);
        //console.log("1");
      }
    }
  }
  habilitarUsuario(clienteId: number): void {
    const usuario = this.usuariodata.find((user) => user.id_usuario === clienteId);
    if (usuario) {
      usuario.estado = 1;
      this.datau.updateUser(usuario.id_usuario, usuario).subscribe((response) => {
        //this.usuariodata = (response as User[]);
      });
      this.openSnackBar('1');
    }
  }
  deshabilitarUsuario(clienteId: number): void {
    const usuario = this.usuariodata.find((user) => user.id_usuario === clienteId);
    if (usuario) {
      usuario.estado = 0;
      this.datau.updateUser(usuario.id_usuario, usuario).subscribe((response) => {
        //this.usuariodata = (response as User[]);
      });
      this.openSnackBar('0');
    }
  }
  eliminarUsuario(clienteId: number): void {
    const usuario = this.usuariodata.find((user) => user.id_usuario === clienteId);
    if (usuario) {
      usuario.estado = -1;
      this.datau.updateUser(usuario.id_usuario, usuario).subscribe((response) => {
      });
      this.openSnackBar('-1');
    }  }
  currentPage: number = 0;
  itemsPerPage: number = 4; 

  get totalPages(): number {
    return Math.ceil(this.clientedata.length / this.itemsPerPage);
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
  getPagedClients(): Cliente[] {
    this.loadFilteredClients();
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.clientedata.slice(startIndex, endIndex);
  }
  openFormDialog(): void {
    this.nombreVentanaService.setUserQuantity(this.usuariodata.reduce((maxIdUsuario, usuarioActual) => {
      return usuarioActual.id_usuario > maxIdUsuario ? usuarioActual.id_usuario : maxIdUsuario;
    }, this.usuariodata[0].id_usuario));
    const dialogRef = this.formulario.open(UserformComponent, {
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
