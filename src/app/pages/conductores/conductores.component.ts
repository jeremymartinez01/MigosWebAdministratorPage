import { Component } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente';
import { User } from 'src/app/interfaces/user';
import { ClientelistService } from 'src/app/providers/clientelist.service';
import { UserlistService } from 'src/app/providers/userlist.service';
import { MatDialog } from '@angular/material/dialog';
import { UserformComponent } from 'src/app/forms/userform/userform.component';
@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.css']
})
export class ConductoresComponent {
  constructor(private datac: ClientelistService,private datau: UserlistService, private formulario: MatDialog){}
  clientedata: Cliente[]=[];
  usuariodata: User[]=[];
  
  ngOnInit():void {
    this.datac.getResponse().subscribe((response) => { 
      this.clientedata = (response as Cliente[]);
      this.loadFilteredClients(); 
    });
    this.datau.getResponse().subscribe((response)=> {
      this.usuariodata = (response as User[]);
      this.loadFilteredClients();
      //this.loadFilteredUsers();
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
  /*loadFilteredUsers(): void {
    if (this.usuariodata.length > 0) {
      this.usuariodata = this.usuariodata.filter((user) => user.estado === 1);
    }
  }*/
  loadFilteredClients(): void {
    if (this.clientedata.length > 0) {
      //this.clientedata = this.clientedata.filter((cliente) => cliente.estado === 1);
      this.clientedata = this.clientedata.filter((cliente) =>
      this.usuariodata.some((user) => user.id_usuario === cliente.id_cliente)
    );
    }
  }
  habilitarUsuario(clienteId: number): void {
    const usuario = this.usuariodata.find((user) => user.id_usuario === clienteId);
    if (usuario) {
      usuario.estado = 1;
      this.datau.updateUser(usuario.id_usuario, usuario).subscribe((response) => {
        //this.usuariodata = (response as User[]);
      });
    }
  }
  deshabilitarUsuario(clienteId: number): void {
    const usuario = this.usuariodata.find((user) => user.id_usuario === clienteId);
    if (usuario) {
      usuario.estado = 0;
      this.datau.updateUser(usuario.id_usuario, usuario).subscribe((response) => {
        //this.usuariodata = (response as User[]);
      });

    }
  }
  eliminarUsuario(clienteId: number): void {
    this.deshabilitarUsuario(clienteId);
  }
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
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.clientedata.slice(startIndex, endIndex);
  }
  openFormDialog(): void {
    const dialogRef = this.formulario.open(UserformComponent, {
      width: '450px',
      height:'600px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
