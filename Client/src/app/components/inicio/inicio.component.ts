import { Component, OnInit } from '@angular/core';
import { ApiService, IUsuario } from '../../services/api.service';
import { Router  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {

  Usuario: IUsuario[] = [];

  popoverTitle = 'Remover usuário';
  popoverMessage = 'Deseja excluir o usuário?';
  confirmClicked = false;
  cancelClicked = false;

  constructor(private ApiService: ApiService, private router: Router, private toastr: ToastrService) {
  
  }

  ngOnInit(): void {
    this.listar()
  }

  listar() {
    this.ApiService.listarUsuarios().subscribe(
      res => this.Usuario =<any>res,
      err => this.toastr.error(err)
    );
  }

  remover(id:string | undefined) {

    this.ApiService.removerUsuarios(id).subscribe(
      (res: any) => {
        this.toastr.error(res.message)
        this.listar()
      },
      err => console.log(err)
    );
  }

  atualizar(id:string | undefined) {
    this.router.navigate(['/editar/'+id])
  }

  novo() {
    this.router.navigate(['/novo'])
  }
}
