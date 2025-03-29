import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { Email } from '../../interface/geral/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  esqueceuSenha(email: string){
    const params = {
      email: email
    }
      return this.http.get(environment.api_url + "/email/esqueceuSenha", {params});
  }
  enviarEmail(email: Email){
      return this.http.post(environment.api_url + "/email/salvar", email, { withCredentials: true });
  }
}
