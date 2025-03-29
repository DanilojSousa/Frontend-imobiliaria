import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { Contato } from '../../interface/pessoa/contato';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private http: HttpClient) { }

  selecionarContatoPorUsrCodigo(usrCodigo: number): Observable<Contato>{
    const params = {
      usrCodigo: usrCodigo
    }
    return this.http.get<Contato>(environment.api_url + "/contato/getByUsrCodigo", {params});
  }
}
