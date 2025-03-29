import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { EstadoCidade } from '../../interface/pessoa/estadoCidade';
import { Estado } from '../../interface/pessoa/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  
  constructor(private http: HttpClient) { }

  getAllPorImovelAtivo(): Observable<EstadoCidade[]> {
    return this.http.get<EstadoCidade[]>(environment.api_url + "/estado/getAllPorImovelAtivo", { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }

  getAll(): Observable<Estado[]> {
    return this.http.get<Estado[]>(environment.api_url + "/estado/getAll", { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
}
