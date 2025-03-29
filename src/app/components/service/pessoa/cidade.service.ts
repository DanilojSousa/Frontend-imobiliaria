import { Injectable } from '@angular/core';
import { Cidade } from '../../interface/pessoa/cidade';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(private http: HttpClient) { }

  getAllPorEstCodigo(estCodigo: number): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(environment.api_url + "/cidade/getAllPorEstCodigo?estCodigo="+estCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }

  getAllPorEstCodigoGeral(estCodigo: number): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(environment.api_url + "/cidade/getAllPorEstCodigoGeral?estCodigo="+estCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
}
