import { Component, OnInit } from '@angular/core';
import { ApiService, IUsuario } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.component.html',
  styleUrls: ['./atualizar.component.css']
})

export class AtualizarComponent implements OnInit {

  Usuarios: IUsuario = {
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

  constructor(private ApiService: ApiService, private router: Router, private activatedRoute:ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id']
    
    this.getUsuarioById(id)
  }

  getUsuarioById(id: string) {
    this.ApiService.listarUsuariosPorId(id).subscribe(
      (res: any) => {
        this.Usuarios = res[0]
      },
      (err) =>  this.toastr.error(err)
    )
  }

  async atualizar() {
    const id = this.activatedRoute.snapshot.params['id']
    delete this.Usuarios.id

    let validacoes = await this.ApiService.validarCampo(this.Usuarios)

    if(validacoes != true) {
      this.toastr.warning(validacoes)
      return
    }

    this.ApiService.atualizarUsuarios(id, this.Usuarios).subscribe(
      (res: any) => {
        this.toastr.success(res.message)
        this.router.navigate(['/inicio'])
      },
      (err) =>  this.toastr.error(err)
    )
  }
}
