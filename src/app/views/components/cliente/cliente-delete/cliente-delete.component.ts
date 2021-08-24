import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  id_tec = ''

  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };

  constructor(
    private service: ClienteService, 
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
     this.id_tec = this.route.snapshot.paramMap.get('id')!
     this.findById();
  }

  delete():void{
    this.service.delete(this.id_tec).subscribe(resposta=>{
      this.router.navigate(["clientes"]);
      this.service.message("Cliente deletado com sucesso!");  
    }, err => {
      if (err.error.error.match("possui OS")) {
        this.service.message(err.error.error);
      }
      console.log(err)
    });
  }

  findById():void{
    this.service.findById(this.id_tec).subscribe(resposta=>{
       this.cliente = resposta;
    })
  }

  }

