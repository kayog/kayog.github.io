import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements AfterViewInit {

  clientes: Cliente[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone','action'];
  dataSource = new MatTableDataSource<Cliente>(this.clientes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ClienteService,
    private router: Router
    ){}

  ngAfterViewInit() {
    this.findAll();
  }

findAll(): void{
   this.service.findAll().subscribe((resposta)=> {
   this.clientes = resposta;
   this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
   this.dataSource.paginator = this.paginator;
  })
}

navigateToCreate(): void {
   this.router.navigate(['clientes/create'])
}

}



