import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { SessaoService } from '../../service/sessao/sessao.service';

@Injectable({providedIn: 'root'})
export class UserGuard{
    constructor(private sessaoService:SessaoService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if(this.sessaoService.getRole().includes("ADMIN")
          || this.sessaoService.getRole().includes("USER")){
          return true;
      }
      return false;
    }
}
