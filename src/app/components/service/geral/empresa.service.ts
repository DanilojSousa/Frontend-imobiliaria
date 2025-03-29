import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, delay, first, map } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { EmpresaDTO } from '../../interface/geral/empresa';
import { HttpClient } from '@angular/common/http';
import { Mensagem } from '../../utils/mensagem';
import { Paginacao } from '../../interface/produto/paginacao';
import { Pageable } from '../../interface/produto/pageable';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
 
  constructor(private http: HttpClient,
              private mensagem: Mensagem) { }

  cadastrarEmpresaDTO(empresa: EmpresaDTO): Observable<EmpresaDTO> {
    return this.http.post<EmpresaDTO>(environment.api_url + "/empresa/salvar", empresa, { withCredentials: true }).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluirEmpresaDTO(id: string){
    const url = environment.api_url + "/empresa/delete/" + id;
    return this.http.delete(url, { withCredentials: true }).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarTodos(): Observable<EmpresaDTO[]>{
    return this.http.get<EmpresaDTO[]>(environment.api_url + "/empresa/getAll", { withCredentials: true }).pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarPorId(empCodigo: number): Observable<EmpresaDTO>{
    return this.http.get<EmpresaDTO>(environment.api_url + "/empresa/getById?empCodigo="+empCodigo, { withCredentials: true });
  }

  selecionarAtivo(): Observable<EmpresaDTO>{
    return this.http.get<EmpresaDTO>(environment.api_url + "/empresa/getByAtivo", { withCredentials: true });
  }

  getByEmpresaDTO(empCodigo: number): Observable<EmpresaDTO>{
    return this.http.get<EmpresaDTO>(environment.api_url + "/empresa/getByEmpresaUsuario/"+ empCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  getAllPaginado(paginacao:Paginacao): Observable<Pageable<EmpresaDTO>> {
    return this.http.post<Pageable<EmpresaDTO>>(environment.api_url + "/empresa/getAllPaginado", paginacao, { withCredentials: true })
  }

  delete(empCodigo: number) {
    return this.http.get(environment.api_url + "/empresa/delete?empCodigo="+ empCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  desativar(empCodigo: number) {
    return this.http.get(environment.api_url + "/empresa/desativar?empCodigo="+empCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }

  getAll(): Observable<EmpresaDTO[]> {
    return this.http.get<EmpresaDTO[]>(environment.api_url + "/empresa/getAll", { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }

  salvar(empresa: EmpresaDTO): Observable<EmpresaDTO>  {
    return this.http.post<EmpresaDTO>(environment.api_url + "/empresa/salvar", empresa, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  getById(empCodigo: string): Observable<EmpresaDTO> {
    return this.http.get<EmpresaDTO>(environment.api_url + "/empresa/getById?empCodigo="+empCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }

  error(e: any): Observable<any>{
    this.mensagem.error("Ocorreu um erro!")
    return EMPTY;
  }
}
