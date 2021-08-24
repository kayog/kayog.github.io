import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  id_tec = ''

  tecnico: Tecnico = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };

nome = new FormControl('', [Validators.minLength(5)])
cpf = new FormControl('', [Validators.minLength(11)])
telefone = new FormControl('', [Validators.minLength(11 )])

  constructor(
    private service: TecnicoService, 
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
     this.id_tec = this.route.snapshot.paramMap.get('id')!
     this.findById();
  }

  update():void{
    this.service.update(this.tecnico).subscribe(resposta=>{
      this.router.navigate(["tecnicos"]);
      this.service.message("Tecnico atualizado com sucesso!");  
    }, err => {
      if (err.error.error.match("já cadastrado")) {
        this.service.message(err.error.error);
      }else if (err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido") {
        this.service.message("CPF inválido.");  
      }
    });
  }

  findById():void{
    this.service.findById(this.id_tec).subscribe(resposta=>{
       this.tecnico = resposta;
    })
  }

  errorValidName(){
    if(this.nome.invalid){
      return 'O nome não pode conter menos de 5 caracteres.'
    }
    return false;
  }
  
  errorValidCPF(){
    if(this.cpf.invalid){
      return 'O CPF não pode conter menos de 11 caracteres.'
    }
    return false;
  }
  
  errorValidTelefone(){
    if(this.telefone.invalid){
      return 'O Telefone não pode conter menos de 11 caracteres.'
    }
    return false;
  }

  }
