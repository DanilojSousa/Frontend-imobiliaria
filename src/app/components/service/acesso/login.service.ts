import { environment } from '../../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../interface/acesso/login';
import { Mensagem } from './../../utils/mensagem';
import { Router } from '@angular/router';
import { SessaoService } from '../sessao/sessao.service';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private mensagem: Mensagem,
              private http: HttpClient,
              private router: Router,
              private sessaoService: SessaoService,
              private cookieService: CookieService) { }

  entrar(login: Login){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(environment.api_url + "/auth", JSON.stringify(login), {headers:headers}).pipe(
      tap ((res) =>{
            this.setToken(res.token);
            this.sessaoService.setUsrLogin(res.usrLogin);
            this.sessaoService.setRole(res.role);
            this.sessaoService.setToken(res.token);
            this.redirecionar()
      }),
    )
  }

  redirecionar() {
    setTimeout(() => {
      window.location.reload();
    }, 50);
    this.router.navigate(['acesso/sistema'])
  }

  setToken(token: any): void{
    localStorage.setItem('XAuthorization', token);
    this.cookieService.set('XAuthorization', token, 1, '/');
  }

deslogar() {
  localStorage.clear();
  this.cookieService.delete('XAuthorization', '/');
  this.router.navigate(['']);
}

get obterToken(): any {
  return this.cookieService.get('XAuthorization')
    ? this.cookieService.get('XAuthorization')
    : null;
}
get logado(): boolean {
  return this.cookieService.get('XAuthorization') ? true
  : localStorage.getItem('XAuthorization') ? true : false;
}
sair(): void{
  this.cookieService.delete('XAuthorization');
  localStorage.clear();
  this.sessaoService.inicializa();
  this.mensagem.sucesso("Deslogado com sucesso")
  this.router.navigate([''])
}

}
