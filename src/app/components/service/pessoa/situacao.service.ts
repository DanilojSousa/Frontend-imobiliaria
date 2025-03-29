import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Situacao } from '../../interface/pessoa/situacao';

@Injectable({
  providedIn: 'root'
})
export class SituacaoService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Situacao[]> {
    return this.http.get<Situacao[]>(environment.api_url + "/situacao/getAll", { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
}
