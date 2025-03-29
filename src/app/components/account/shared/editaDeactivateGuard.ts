import { Observable } from 'rxjs';
import { Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { IEditaCanDeactivate } from './intefaceEditaDeactivateGuard';

@Injectable({providedIn: 'root'})
export class EditaDeactivateGuard implements CanDeactivate<IEditaCanDeactivate>  {
    constructor() { }

    canDeactivate(
        component: IEditaCanDeactivate,
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | boolean{
           return component.podeDesativar();
        }


}