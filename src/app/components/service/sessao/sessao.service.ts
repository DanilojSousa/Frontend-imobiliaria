import { inject, Injectable } from '@angular/core';
import { EmpresaDTO } from '../../interface/geral/empresa';
import { PesquisaFiltradaImovel } from '../../interface/produto/pesquisaFiltradaImovel';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from '../../pages/login/login/login.component';
import { Pageable } from '../../interface/produto/pageable';
import { Imovel } from '../../interface/produto/imovel';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  private empresa: EmpresaDTO = new EmpresaDTO();
  private usrLogin!: string;
  private role!: string;
  private token!: string | null;
  private pesquisaFiltradaImovel = new PesquisaFiltradaImovel()
  readonly dialog = inject(MatDialog);
  private pageable!: Pageable<Imovel>
  constructor(private cookieService: CookieService){}

  inicializa(){
    this.setUsrLogin('');
    this.setRole('');
  }

 setEmpresa(empresa: EmpresaDTO): void{
    this.empresa = empresa;
 }
 getEmpresa(): EmpresaDTO{
  return this.empresa;
 }

 setUsrLogin(usrLogin: string){
  this.usrLogin = usrLogin;
 }
 getUsrLogin(): string{
    return this.usrLogin;
 }
 setRole(role: string){
   this.role = role;
 }
 getRole(): string{
  return this.role;
 }

  setToken(token: string | null){
    this.token = token;
  }
  getToken(): string | null{
  return this.token;
  }

  setPesquisaFiltradaImovel(pesquisaFiltradaImovel: PesquisaFiltradaImovel){
    this.pesquisaFiltradaImovel = pesquisaFiltradaImovel;
  }
  getPesquisaFiltradaImovel(): PesquisaFiltradaImovel{
  return this.pesquisaFiltradaImovel;
  }
 setPageable(pageable: Pageable<Imovel>){
  this.pageable = pageable;
 }
 getPageable(): Pageable<Imovel>{
  return this.pageable;
 }
 validaLogin(): boolean{
  if(this.cookieService.get('XAuthorization') === ''){
    localStorage.removeItem('XAuthorization');
    this.dialog.open(LoginComponent,{
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
    });
    return false;
  }
  return true;
 }
}
