import { Injectable } from '@angular/core';
import { Imovel } from '../../interface/produto/imovel';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PesquisaFiltradaImovel } from '../../interface/produto/pesquisaFiltradaImovel';
import { environment } from '../../../../environments/environment.prod';
import { ImovelLancamento } from '../../interface/produto/imovelLancamento';
import { Pageable } from '../../interface/produto/pageable';
import { TipoImovel } from '../../interface/produto/tipoImovel';
import { Negocio } from '../../interface/produto/negocio';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {

  constructor(private http: HttpClient) { }

  pesquisaFiltrada(pesquisa: PesquisaFiltradaImovel): Observable<Pageable<Imovel>> {
    return this.http.post<Pageable<Imovel>>(environment.api_url + "/imovel/getAllFilter", pesquisa, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  getAllLancamento(): Observable<ImovelLancamento[]> {
    return this.http.get<ImovelLancamento[]>(environment.api_url + "/imovel/getAllLancamento", { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  getAllDestaque(): Observable<ImovelLancamento[]> {
    return this.http.get<ImovelLancamento[]>(environment.api_url + "/imovel/getAllDestaque", { withCredentials: true }).pipe(
      map((obj) => obj),
      catchError(error => {
        console.error('Erro ao buscar imóveis em destaque:', error);
        return throwError(error);
      })
    );
  }
  salvar(imovel: Imovel): Observable<Imovel> {
    return this.http.post<Imovel>(environment.api_url + "/imovel/salvar", imovel, { withCredentials: true });
  }
  getById(imvCodigo: number): Observable<Imovel> {
    return this.http.get<Imovel>(environment.api_url + "/imovel/getById?imvCodigo="+imvCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
      catchError(error => {
        console.error('Erro ao buscar imóveis em destaque:', error);
        return throwError(error);
      })
    );
  }
  getAllNegocioPorImovel(): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(environment.api_url + "/imovel/getAllNegocioPorImovel", { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  getAllTipoImovelPorImovel(): Observable<TipoImovel[]> {
    return this.http.get<TipoImovel[]>(environment.api_url + "/imovel/getAllTipoImovelPorImovel", { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }

  getAllOportunidade(): Observable<ImovelLancamento[]> {
    return this.http.get<ImovelLancamento[]>(environment.api_url + "/imovel/getAllOportunidade", { withCredentials: true }).pipe(
      map((obj) => obj),
      catchError(error => {
        console.error('Erro ao buscar imóveis oportunidade:', error);
        return throwError(error);
      })
    );
  }

  delete(imvCodigo: number) {
    return this.http.get(environment.api_url + "/imovel/delete?imvCodigo="+imvCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
      catchError(error => {
        console.error('Erro ao deletar o imovel: '+imvCodigo, error);
        return throwError(error);
      })
    );
  }
  desativar(imvCodigo: number) {
    return this.http.get(environment.api_url + "/imovel/desativar?imvCodigo="+imvCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
      catchError(error => {
        console.error('Erro ao desativar o imovel: '+imvCodigo, error);
        return throwError(error);
      })
    );
  }
  getAll(pesquisa: PesquisaFiltradaImovel): Observable<Pageable<Imovel>> {
    return this.http.post<Pageable<Imovel>>(environment.api_url + "/imovel/getAll", pesquisa, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }

}
