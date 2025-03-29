import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

import { environment } from '../../../environments/environment.prod';
import { Util } from './util';

@Injectable()
export class TokenHeader implements HttpInterceptor{

    intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{

        const requestUrl: Array<any> = request.url.split('/');
        const apiUrl: Array<any> = environment.api_url.split('/');
        const token = localStorage.getItem("XAuthorization");
        if(token && (apiUrl[2] === apiUrl[2])){
            const newRequest = request.clone({setHeaders: {'XAuthorization':'Bearer ' + token}})
            return next.handle(newRequest)
        }
        return next.handle(request);
    }

}
