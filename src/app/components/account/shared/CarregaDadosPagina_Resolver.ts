
import { Observable, map } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { EmpresaService } from '../../service/geral/empresa.service';

@Injectable()
export class CarregaDadosPaginaResolver implements Resolve<any>{

constructor(private empresaService: EmpresaService){}
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

     return this.empresaService.selecionarAtivo().pipe(
        map(res =>{
            return res;
        })
     );

    }

}
