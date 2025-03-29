import { Injectable } from '@angular/core';
import { Negocio } from '../../interface/produto/negocio';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { Paginacao } from '../../interface/produto/paginacao';
import { Pageable } from '../../interface/produto/pageable';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {
  
  constructor(private http: HttpClient) { }
  
  salvar(negocio: Negocio): Observable<Negocio>{
    return this.http.post<Negocio>(environment.api_url + "/negocio/salvar", negocio, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  getAll(): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(environment.api_url + "/negocio/getAll", { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }

  getAllPorImovelAtivo(): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(environment.api_url + "/negocio/getAllPorImovelAtivo", { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  getAllPaginado(paginacao:Paginacao): Observable<Pageable<Negocio>> {
    return this.http.post<Pageable<Negocio>>(environment.api_url + "/negocio/getAllPaginado", paginacao, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  getById(ngcCodigo: number): Observable<Negocio> {
    return this.http.get<Negocio>(environment.api_url + "/negocio/getById?ngcCodigo="+ngcCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  delete(ngcCodigo: number) {
    return this.http.get(environment.api_url + "/negocio/delete?ngcCodigo="+ ngcCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
}
