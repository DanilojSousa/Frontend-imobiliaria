import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Condominio } from '../../interface/pessoa/condominio';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { EnderecoDTO } from '../../interface/pessoa/endereco';
import { Paginacao } from '../../interface/produto/paginacao';
import { Pageable } from '../../interface/produto/pageable';

@Injectable({
  providedIn: 'root'
})
export class CondominioService {

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Condominio> {
    return this.http.get<Condominio>(environment.api_url + "/condominio/getById?conCodigo="+id, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  salvar(condominio: Condominio): Observable<Condominio> {
    return this.http.post<Condominio>(environment.api_url + "/condominio/salvar",condominio, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }

  getAllPorEndCodigo(endCodigo: number): Observable<Condominio[]> {
    return this.http.get<Condominio[]>(environment.api_url + "/condominio/getAllPorEndCodigo?endCodigo="+endCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  carregaCondominioPorEnderecos(enderecos: number[]): Observable<Condominio[]> {
    return this.http.post<Condominio[]>(environment.api_url + "/condominio/getAllPorEnderecos", enderecos, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  getAllPorImovelAtivo(): Observable<Condominio[]> {
    return this.http.get<Condominio[]>(environment.api_url + "/condominio/getAllPorImovelAtivo", { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  getAllPaginado(paginacao:Paginacao): Observable<Pageable<Condominio>> {
    return this.http.post<Pageable<Condominio>>(environment.api_url + "/condominio/getAllPaginado", paginacao, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  delete(conCodigo: number) {
    return this.http.get(environment.api_url + "/condominio/delete?conCodigo="+ conCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
}
