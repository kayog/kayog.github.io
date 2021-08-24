import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-delete',
  templateUrl: './chamado-delete.component.html',
  styleUrls: ['./chamado-delete.component.css']
})
export class ChamadoDeleteComponent implements OnInit {

  id_tec = ''

  chamado: Chamado = {
    prioridade:  '',
    status:      '',
    observacoes: '',
    tecnico:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  delete():void{
    this.chamadoService.delete(this.id_tec).subscribe(resposta=>{
      this.router.navigate(["chamados"]);
      this.chamadoService.message("Chamado deletado com sucesso!");  
    }, err => {
      if (err.error.error.match("Chamados")) {
        this.chamadoService.message(err.error.error);
      }
      console.log(err)
    });
  }
  
  findById():void{
    this.chamadoService.findById(this.id_tec).subscribe(resposta=>{
       this.chamado = resposta;
    })
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }


}
