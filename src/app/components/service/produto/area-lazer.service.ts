import { AreaLazer } from './../../interface/produto/areaLazer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { Paginacao } from '../../interface/produto/paginacao';
import { Pageable } from '../../interface/produto/pageable';

@Injectable({
  providedIn: 'root'
})
export class AreaLazerService {
   
  constructor(private http: HttpClient) { }

    getAllPorImvCodigo(imvCodigo: number): Observable<AreaLazer[]> {
      return this.http.get<AreaLazer[]>(environment.api_url + "/areaLazer/getAllPorImvCodigo?imvCodigo="+imvCodigo, { withCredentials: true }).pipe(
        map((obj) => obj),
      );
    }

    salvar(areaLazer: AreaLazer): Observable<AreaLazer> {
      return this.http.post<AreaLazer>(environment.api_url + "/areaLazer/salvar", areaLazer, { withCredentials: true });
    }

    getAll(): Observable<AreaLazer[]> {
      return this.http.get<AreaLazer[]>(environment.api_url + "/areaLazer/getAll", { withCredentials: true }).pipe(
        map((obj) => obj),
      );
    }

    getAllPaginado(paginacao:Paginacao): Observable<Pageable<AreaLazer>> {
      return this.http.post<Pageable<AreaLazer>>(environment.api_url + "/areaLazer/getAllPaginado", paginacao, { withCredentials: true }).pipe(
        map((obj) => obj),
      );
    }
    delete(arlCodigo: number) {
      return this.http.get(environment.api_url + "/areaLazer/delete?arlCodigo="+ arlCodigo, { withCredentials: true }).pipe(
        map((obj) => obj),
      );
    }

    getById(arlCodigo: number): Observable<AreaLazer> {
      return this.http.get<AreaLazer>(environment.api_url + "/areaLazer/getById?arlCodigo="+arlCodigo, { withCredentials: true }).pipe(
        map((obj) => obj),
      );
    }
}
