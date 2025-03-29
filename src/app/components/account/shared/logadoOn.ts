import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../pages/login/login/login.component';
import { LoginService } from '../../service/acesso/login.service';


@Injectable({providedIn: 'root'})
export class LogadoOnGuard implements CanActivate{
    constructor(private loginService: LoginService) { }

    readonly dialog = inject(MatDialog);
    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        if(this.loginService.logado){
          return true;
        }
        this.dialog.open(LoginComponent,{
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
        });
        return false;
    }
}
