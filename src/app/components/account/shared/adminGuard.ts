import { SessaoService } from './../../service/sessao/sessao.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Util } from '../../utils/util';

@Injectable({providedIn: 'root'})
export class AdminGuard{
    constructor(private sessaoService:SessaoService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.sessaoService.getRole().includes("ADMIN")){
            return true;
        }
        return false;
    }
}
