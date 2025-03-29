import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login/login.component';
import { InicioComponent } from './components/pages/home/inicio.component';
import { DetalheComponent } from './components/pages/home/detalhe/detalhe.component';
import { FiltradoComponent } from './components/pages/home/filtrado/filtrado.component';
import { SistemaComponent } from './components/pages/admin/sistema/sistema.component';
import { LogadoOnGuard } from './components/account/shared/logadoOn';
import { CadastroImovelComponent } from './components/pages/admin/cadastro/cadastro_imovel/cadastro_imovel.component';
import { ImovelComponent } from './components/pages/admin/detalhe/imovel/imovel.component';
import { UsuarioComponent } from './components/pages/admin/detalhe/usuario/usuario.component';
import { EnderecoComponent } from './components/pages/admin/detalhe/endereco/endereco.component';
import { NegocioComponent } from './components/pages/admin/detalhe/negocio/negocio.component';
import { TipoImovelComponent } from './components/pages/admin/detalhe/tipo-imovel/tipo-imovel.component';
import { SituacaoComponent } from './components/pages/admin/detalhe/situacao/situacao.component';
import { LocalizacaoComponent } from './components/pages/admin/detalhe/localizacao/localizacao.component';
import { CadastroEnderecoComponent } from './components/pages/admin/cadastro/cadastro-endereco/cadastro-endereco.component';
import { CadastroUsuarioComponent } from './components/pages/admin/cadastro/cadastro-usuario/cadastro-usuario.component';
import { CondominioComponent } from './components/pages/admin/detalhe/condominio/condominio.component';
import { EmpresaComponent } from './components/pages/admin/detalhe/empresa/empresa.component';
import { CadastroEmpresaComponent } from './components/pages/admin/cadastro/cadastro-empresa/cadastro-empresa.component';
import { AreaLazerComponent } from './components/pages/admin/detalhe/area-lazer/area-lazer.component';
import { ProximidadeComponent } from './components/pages/admin/detalhe/proximidade/proximidade.component';

export const routes: Routes = [
  {
    path: '', component: InicioComponent,
    children:[
      {path: 'home', component: InicioComponent},
    ]
  },
  {path: 'imovel/detalhes/:imvCodigo', component: DetalheComponent},
  {path: 'imovel/filtro', component: FiltradoComponent},
  {path: 'acesso/sistema', component: SistemaComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'login/:id', component: LoginComponent},
  {path: 'detalhe/imovel', component: ImovelComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
  {path: 'detalhe/usuario', component: UsuarioComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
  {path: 'detalhe/endereco', component: EnderecoComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
  {path: 'detalhe/negocio', component: NegocioComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
  {path: 'detalhe/tipoImovel', component: TipoImovelComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
  {path: 'detalhe/situacao', component: SituacaoComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
  {path: 'detalhe/localizacao', component: LocalizacaoComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
  {path: 'detalhe/condominio', component: CondominioComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
  {path: 'detalhe/empresa', component: EmpresaComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
  {path: 'detalhe/areaLazer', component: AreaLazerComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
  {path: 'detalhe/proximidade', component: ProximidadeComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
  {path: 'cadastro/imovel', component: CadastroImovelComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
  {path: 'cadastro/imovel/:imvCodigo', component: CadastroImovelComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
  {path: 'cadastro/endereco', component: CadastroEnderecoComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
  {path: 'cadastro/endereco/:endCodigo', component: CadastroEnderecoComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
  {path: 'cadastro/usuario', component: CadastroUsuarioComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
  {path: 'cadastro/usuario/:usrCodigo', component: CadastroUsuarioComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
  {path: 'cadastro/empresa', component: CadastroEmpresaComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
  {path: 'cadastro/empresa/:empCodigo', component: CadastroEmpresaComponent, canLoad:[LogadoOnGuard], canActivate:[LogadoOnGuard]},
];
