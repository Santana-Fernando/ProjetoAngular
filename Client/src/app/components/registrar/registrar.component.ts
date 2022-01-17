import { Component, OnInit } from '@angular/core';
import { ApiService, IUsuario } from '../../services/api.service';
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  Usuario: IUsuario = {
    id: '',
    nome_completo:'',
    nome_usuario:'',
    email:'',
    senha:'',
    cep:'',
    logradouro:'',
    complemento:'',
    bairro: '',
    numero:'',
    uf:'',
    cidade:''
  };

  constructor(private ApiService: ApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  async registrarNovoUsuario() {
    delete this.Usuario.id
    let confirmarSenha: any;

    confirmarSenha = document.getElementById('confirmarSenha')

    if(confirmarSenha.value != this.Usuario.senha) {
      this.toastr.warning("As senhas não batem!!")
      return
    }

    let validacoes = await this.ApiService.validarCampo(this.Usuario)

    if(validacoes != true) {
      this.toastr.warning(validacoes)
      return
    }

    this.ApiService.addUsuarios(this.Usuario).subscribe(
      (res: any) => {
        this.toastr.success(res.message)
        this.router.navigate(['/inicio'])
      },
      (error) => this.toastr.error(error)
    )
  }

  buscarCep() {
    this.ApiService.buscarPorCep(this.Usuario.cep).subscribe(
      (res: any) => {
        this.Usuario.logradouro = res.logradouro,
        this.Usuario.uf = res.uf,
        this.Usuario.cidade = res.localidade,
        this.Usuario.bairro = res.bairro
      }
    )
  }
}
