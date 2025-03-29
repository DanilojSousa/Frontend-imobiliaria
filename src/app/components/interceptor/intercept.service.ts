import { LoginService } from './../service/acesso/login.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Util } from '../utils/util';


@Injectable({
  providedIn: 'root',
})
export class InterceptService {
  constructor(private router: Router,
              private loginService: LoginService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("entrou")
    if (
      this.loginService.logado != null &&
      this.loginService.logado != undefined
    ) {
      let token = this.loginService.obterToken?.toString();
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }else{
        this.router.navigate(['login'])
      }
    }

    return next.handle(request).pipe(
      tap(
        () => {},
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status !== 401) return;
            sessionStorage.removeItem('XAuthorization');
            this.router.navigate(['login']);
          }
        }
      )
    );
  }
}
