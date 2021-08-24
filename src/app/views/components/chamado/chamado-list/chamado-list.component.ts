import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements AfterViewInit {

 chamados: Chamado[] = [];

  displayedColumns: string[] = ['id', 'cliente', 'observacoes', 'prioridade', 'status','tecnico',
  'dataAbertura','dataFechamento','action'];
  
  dataSource = new MatTableDataSource<Chamado>(this.chamados);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ChamadoService,
    private router: Router,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService
    ){}

  ngAfterViewInit() {
    this.findAll();
  }

findAll(): void{
  this.service.findAll().subscribe((resposta)=> {
    resposta.forEach(x=> { 
      if(x.status!="ENCERRADO"){
        this.chamados.push(x)
      }
    })
   this.listarTecnicos();
   this.listarClientes();
   this.dataSource = new MatTableDataSource<Chamado>(this.chamados);
   this.dataSource.paginator = this.paginator;
  })
}

navigateToCreate(): void {
   this.router.navigate(['chamados/create'])
}

listarTecnicos(): void {
  this.chamados.forEach((x=>{ 
    this.tecnicoService.findById(x.tecnico).subscribe(resposta=>{ 
      x.tecnico = resposta.nome
    })
  }))
}

listarClientes(): void {
  this.chamados.forEach((x=>{ 
    this.clienteService.findById(x.cliente).subscribe(resposta=>{ 
      x.cliente = resposta.nome
    })
  }))
}

prioridade(x:any) {
  if(x == 'BAIXA'){
    return 'baixa'
  }else if(x == 'MEDIA'){
    return 'media'
  }else
    return 'alta'
  }
}




