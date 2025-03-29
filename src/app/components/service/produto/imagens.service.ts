import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Imagens } from '../../interface/produto/imagens';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ImagensService {

  constructor(private http: HttpClient) { }

  getAllPorImvCodigo(imvCodigo: number): Observable<Imagens[]> {
    return this.http.get<Imagens[]>(environment.api_url + "/imagens/getAllPorImvCodigo?imvCodigo="+imvCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
      catchError(error => {
        console.error('Erro ao buscar imóveis em destaque:', error);
        return throwError(error);
      })
    )
  }
}