import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../interface/acesso/usuario';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { UsuarioAlterarSenha } from '../../interface/acesso/usuarioAlterarSenha';
import { Pageable } from '../../interface/produto/pageable';
import { Paginacao } from '../../interface/produto/paginacao';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(environment.api_url + "/usuario/getAll", { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }

  selecionarPorId(usrCodigo: number): Observable<Usuario>{
    const params = {
      usrCodigo: usrCodigo
    }
    return this.http.get<Usuario>(environment.api_url + "/usuario/getById", {params});
  }
  salvar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<any>(environment.api_url + "/usuario/salvar", usuario, { withCredentials: true });
  }

  getById(usrCodigo: string): Observable<Usuario> {
    const params = {
      usrCodigo: usrCodigo
    }
    return this.http.get<Usuario>(environment.api_url + "/usuario/getById", {params, withCredentials: true})
  }

  alteraSenha(usuarioAlterarSenha: UsuarioAlterarSenha): Observable<UsuarioAlterarSenha> {
    return this.http.put<any>(environment.api_url + "/usuario/alterarSenha", usuarioAlterarSenha, { withCredentials: true })
  }
  getAllPaginado(paginacao:Paginacao): Observable<Pageable<Usuario>> {
    return this.http.post<Pageable<Usuario>>(environment.api_url + "/usuario/getAllPaginado", paginacao, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }

  delete(usrCodigo: number) {
    return this.http.get(environment.api_url + "/usuario/delete?usrCodigo="+ usrCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  desativar(usrCodigo: number) {
    return this.http.get(environment.api_url + "/usuario/desativar?usrCodigo="+usrCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
}
