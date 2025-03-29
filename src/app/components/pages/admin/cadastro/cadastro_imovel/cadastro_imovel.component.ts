import { Component, inject, OnInit } from '@angular/core';
import { Imovel } from '../../../../interface/produto/imovel';
import { ImovelService } from '../../../../service/produto/imovel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Mensagem } from '../../../../utils/mensagem';
import { MatButtonModule } from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyMaskDirectiveDirective } from '../../../../diretivas/currency-mask-directive.directive';
import { MetragemMaskDirective } from '../../../../diretivas/metragem-mask-directive.directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TipoImovel } from '../../../../interface/produto/tipoImovel';
import { Negocio } from '../../../../interface/produto/negocio';
import { Usuario } from '../../../../interface/acesso/usuario';
import { SituacaoImovel } from '../../../../interface/produto/situacaoImovel';
import { LocalizacaoPraia } from '../../../../interface/produto/localizacaoPraia';
import { EnderecoDTO } from '../../../../interface/pessoa/endereco';
import { NegocioService } from '../../../../service/produto/negocio.service';
import { TipoImovelService } from '../../../../service/produto/tipo-imovel.service';
import { UsuarioService } from '../../../../service/acesso/usuario.service';
import { LocalizacaoPraiaService } from '../../../../service/produto/localizacao-praia.service';
import { EnderecoService } from '../../../../service/pessoa/endereco.service';
import { SituacaoImovelService } from '../../../../service/produto/situacao-imovel.service';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { AdicionarImagemDialogComponent } from '../../../home/dialog/adicionar-imagem-dialog/adicionar-imagem-dialog.component';
import { forkJoin } from 'rxjs';
import { AreaLazer } from '../../../../interface/produto/areaLazer';
import { Proximidade } from '../../../../interface/produto/proximidade';
import { AreaLazerService } from '../../../../service/produto/area-lazer.service';
import { ProximidadeService } from '../../../../service/produto/proximidade.service';

@Component({
    selector: 'app-cadastro',
    imports: [MatButtonModule, MatStepperModule, FormsModule,
        ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, CurrencyMaskDirectiveDirective,
        MetragemMaskDirective, MatCheckboxModule, MatSelectModule, MatProgressSpinnerModule],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { displayDefaultIndicatorType: false },
        },
    ],
    templateUrl: './cadastro_imovel.component.html',
    styleUrl: './cadastro_imovel.component.css'
})
export class CadastroImovelComponent implements OnInit {

  imovel: Imovel = new Imovel();
  listaNegocio: Negocio[] = [];
  listaTipoImovel: TipoImovel[] = [];
  listaUsuario: Usuario[] = [];
  listaSituacaoImovel: SituacaoImovel[] = [];
  listaLocalizacaoPraia: LocalizacaoPraia[] = [];
  listaEndereco: EnderecoDTO[] = [];
  valida = false;
  spinner = false;
  valor: string = '';
  area: string = '';
  areaTotal: string = '';
  ativo = true;
  inativo = false;
  readonly dialog = inject(MatDialog);
  listaAreaLazer: AreaLazer[] = []
  listaProximidade: Proximidade[] = []

  constructor(private imovelService: ImovelService,
              private route: ActivatedRoute,
              private router: Router,
              private mensagem: Mensagem,
              private negocioService: NegocioService,
              private tipoImovelService: TipoImovelService,
              private usuarioService: UsuarioService,
              private situacaoImovelService: SituacaoImovelService,
              private localizacaoPraiaService: LocalizacaoPraiaService,
              private enderecoService: EnderecoService,
              private areaLazerService: AreaLazerService,
              private proximidadeService: ProximidadeService){}

  ngOnInit(): void {
    this.carregaListas();
  }
  carregaListas() {
    forkJoin({
      negocio: this.negocioService.getAll(),
      tipoImovel: this.tipoImovelService.getAll(),
      usuario: this.usuarioService.getAll(),
      situacaoImovel: this.situacaoImovelService.getAll(),
      localizacaoPraia: this.localizacaoPraiaService.getAll(),
      endereco: this.enderecoService.getAll(),
      areaLazer: this.areaLazerService.getAll(),
      proximidade: this.proximidadeService.getAll()
    }).subscribe({
      next: (result) => {
        this.listaNegocio = result.negocio;
        this.listaTipoImovel = result.tipoImovel;
        this.listaUsuario = result.usuario;
        this.listaSituacaoImovel = result.situacaoImovel;
        this.listaLocalizacaoPraia = result.localizacaoPraia;
        this.listaEndereco = result.endereco;
        this.listaAreaLazer = result.areaLazer;
        this.listaProximidade = result.proximidade;
        this.detalhe();
      },
      error: (err) => {
        console.error('Erro ao carregar dados iniciais:', err);
      }
    });
  }

  detalhe() {
    const imvCodigo =  this.route.snapshot.paramMap.get('imvCodigo');
    if(imvCodigo != null){
      this.imovelService.getById(Number(imvCodigo)).subscribe({
        next:(res)=>{
          this.imovel = res;
          this.sicronizarListas();
          this.spinner = true;
        },error:(err)=>{
          this.mensagem.error("Erro ao carregar o imovel")
          this.spinner = true;
        }
      })
    }else{
      this.spinner = true;
    }
  }

  sicronizarListas(){
    const negocio = this.listaNegocio.find(negocio => negocio.ngcCodigo === this.imovel.negocio.ngcCodigo);
    const tipoImovel = this.listaTipoImovel.find(tipoImovel => tipoImovel.tpiCodigo === this.imovel.tipoImovel.tpiCodigo);
    const usuario = this.listaUsuario.find(usuario => usuario.usrCodigo === this.imovel.usuario.usrCodigo);
    const situacaoImovel = this.listaSituacaoImovel.find(situacaoImovel => situacaoImovel.stiCodigo === this.imovel.situacaoImovel.stiCodigo);
    const localizacaoPraia = this.listaLocalizacaoPraia.find(localizacaoPraia => localizacaoPraia.lcpCodigo === this.imovel.localizacaoPraia?.lcpCodigo);
    const endereco = this.listaEndereco.find(endereco => endereco.endCodigo === this.imovel.endereco.endCodigo);
    console.log(this.imovel)
    const areaLazer = this.listaAreaLazer.filter(areaLazer => this.imovel.areaLazer?.some(a => a.arlCodigo === areaLazer.arlCodigo)) || [];
    const proximidade = this.listaProximidade.filter(proximdade => this.imovel.proximidade?.some(p => p.prxCodigo === proximdade.prxCodigo)) || [];
    // Atualiza as propriedades do objeto imovel
    if (negocio) this.imovel.negocio = negocio;
    if (tipoImovel) this.imovel.tipoImovel = tipoImovel;
    if (usuario) this.imovel.usuario = usuario;
    if (situacaoImovel) this.imovel.situacaoImovel = situacaoImovel;
    if (localizacaoPraia) this.imovel.localizacaoPraia = localizacaoPraia;
    if (endereco) this.imovel.endereco = endereco;
    if (areaLazer) this.imovel.areaLazer = areaLazer;
    if (proximidade) this.imovel.proximidade = proximidade;

    this.valor = this.formatarValorBR(this.imovel.imvValor);
    this.area = this.formatarArea(this.imovel.imvAreaConstruida);
    this.areaTotal = this.formatarArea(this.imovel.imvAreaTotal);
  }

  formatarValorBR(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  }

  formatarArea(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor) + ' m²';
  }

  voltar(){
    this.router.navigate(['detalhe/imovel'])
  }
  salvar(){
    if(this.validaCampos()){
      return;
    }
    this.imovelService.salvar(this.imovel).subscribe({
      next:(res)=>{
        this.imovel = res;
        this.sicronizarListas();
        this.mensagem.sucesso("Imóvel salvo com sucesso");
      }, error:(err)=>{
        this.mensagem.error("Erro ao salvar o Imóvel");
        console.log("Erro ao salvar o Imóvel: "+ err);
      }
    });
  }
  validaCampos(): Boolean{
    this.valida = true;
    if(this.imovel.imvDescricao === undefined || this.imovel.imvDescricao.length === 0
      && this.imovel.imvObservacao === undefined || this.imovel.imvObservacao.length === 0
      && this.imovel.imvValor === undefined || this.imovel.imvValor === 0
      && this.imovel.imvAreaConstruida === undefined || this.imovel.imvAreaConstruida >0
      && this.imovel.imvAreaTotal === undefined || this.imovel.imvAreaTotal > 0
      && this.imovel.endereco.endEndereco === undefined || this.imovel.endereco.endEndereco.length === 0
      && this.imovel.negocio.ngcDescricao === undefined || this.imovel.negocio.ngcDescricao.length === 0
      && this.imovel.tipoImovel.tpiDescricao === undefined || this.imovel.tipoImovel.tpiDescricao.length === 0
      && this.imovel.situacaoImovel.stiDescricao === undefined || this.imovel.situacaoImovel.stiDescricao.length === 0
      && this.imovel.usuario.usrNome === undefined || this.imovel.usuario.usrNome.length === 0
      && this.imovel.imvAtivo === undefined
    ){
      return true;
    }
    return false;
  }

  adicionarImagemDialog(){
    const dialogRef = this.dialog.open(AdicionarImagemDialogComponent, {
      width: '90%',
      height: '90%',
      maxWidth: '100%',
      maxHeight: '100%',
      panelClass: 'custom-dialog-container',
      data:{imovel: this.imovel}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.imovel = result;
      }
    });
  }

  onValueChangeValor(valor: number): void {
    this.imovel.imvValor = valor;
  }
  onValueChangeArea(valor: number): void {
    this.imovel.imvAreaConstruida = valor;
  }
  onValueChangeAreaTotal(valor: number): void {
    this.imovel.imvAreaTotal = valor;
  }

}
