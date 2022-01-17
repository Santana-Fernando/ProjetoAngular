import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  url="http://localhost:3000/api";
  constructor(private http: HttpClient) {}

  listarUsuarios() {
    return this.http.get(this.url)
  }

  listarUsuariosPorId(id: string) {
    return this.http.get(this.url+'/'+id)
  }

  
  addUsuarios(usuario: any) {
    return this.http.post(this.url+'/new', usuario)
  }

  atualizarUsuarios(id: string | undefined, usuario: any) {
    return this.http.put(this.url+'/update/'+id, usuario)
  }

  removerUsuarios(id: string | undefined) {
    return this.http.delete(this.url+'/remove/'+id)
  }

  buscarPorCep(cep:string | undefined){
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
  }

  validarCampo(usuario: any) {
    let { nome_completo, nome_usuario, email, senha, cep, complemento, numero } = usuario

    if(!this.hasValue(nome_completo)) return 'Insira seu nome completo'
    if(!this.hasValue(nome_usuario)) return 'Insira um nome de usuário'
    if(!this.hasValue(email)) return 'Insira um email'
    if(!this.hasValue(senha)) return 'Insira um senha'
    if(!this.hasValue(cep)) return 'Informe seu cep'
    if(!this.hasValue(complemento)) return 'Complemente o seu endereço'
    if(!this.hasValue(numero)) return 'Insira um número (ou digite "sn" para "Sem número")'

    return true
  }

  hasValue(value: string | undefined) {
    if(value != null && value != "") return true;
	  else return false;
  }
}

export interface IUsuario {
  id?: string;
  nome_completo?: string;
  nome_usuario?: string;
  email?: string;
  senha?: string;
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  numero?: string;
  uf?: string;
  cidade?: string;
}