import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paginacao } from '../../interface/produto/paginacao';
import { Pageable } from '../../interface/produto/pageable';
import { SituacaoImovel } from '../../interface/produto/situacaoImovel';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SituacaoImovelService {
  
  constructor(private http: HttpClient) { }
  
  salvar(situacaoImovel: SituacaoImovel): Observable<SituacaoImovel>{
    return this.http.post<SituacaoImovel>(environment.api_url + "/situacao/imovel/salvar", situacaoImovel, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  getAllPaginado(paginacao:Paginacao): Observable<Pageable<SituacaoImovel>> {
    return this.http.post<Pageable<SituacaoImovel>>(environment.api_url + "/situacao/imovel/getAllPaginado", paginacao, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  getById(stiCodigo: number): Observable<SituacaoImovel> {
    return this.http.get<SituacaoImovel>(environment.api_url + "/situacao/imovel/getById?stiCodigo="+stiCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  delete(stiCodigo: number) {
    return this.http.get(environment.api_url + "/situacao/imovel/delete?stiCodigo="+ stiCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  getAll(): Observable<SituacaoImovel[]> {
    return this.http.get<SituacaoImovel[]>(environment.api_url + "/situacao/imovel/getAll", { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
}
