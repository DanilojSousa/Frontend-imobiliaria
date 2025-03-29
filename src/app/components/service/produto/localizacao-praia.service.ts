import { Injectable } from '@angular/core';
import { LocalizacaoPraia } from '../../interface/produto/localizacaoPraia';
import { Pageable } from '../../interface/produto/pageable';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Paginacao } from '../../interface/produto/paginacao';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LocalizacaoPraiaService {

  constructor(private http: HttpClient) { }

  salvar(localizacaoPraia: LocalizacaoPraia): Observable<LocalizacaoPraia>{
    return this.http.post<LocalizacaoPraia>(environment.api_url + "/localizacao/salvar", localizacaoPraia, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }

    getAll(): Observable<LocalizacaoPraia[]> {
      return this.http.get<LocalizacaoPraia[]>(environment.api_url + "/localizacao/getAll", { withCredentials: true }).pipe(
        map((obj) => obj),
      );
    }
  
    getAllPaginado(paginacao:Paginacao): Observable<Pageable<LocalizacaoPraia>> {
      return this.http.post<Pageable<LocalizacaoPraia>>(environment.api_url + "/localizacao/getAllPaginado", paginacao, { withCredentials: true }).pipe(
        map((obj) => obj),
      );
    }
    getById(lcpCodigo: number): Observable<LocalizacaoPraia> {
      return this.http.get<LocalizacaoPraia>(environment.api_url + "/localizacao/getById?lcpCodigo="+lcpCodigo, { withCredentials: true }).pipe(
        map((obj) => obj),
      );
    }
    delete(lcpCodigo: number) {
      return this.http.get(environment.api_url + "/localizacao/delete?lcpCodigo="+ lcpCodigo, { withCredentials: true }).pipe(
        map((obj) => obj),
      );
    }
}
