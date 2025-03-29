import { AreaLazer } from './../../../../interface/produto/areaLazer';
import { Subscription } from 'rxjs';
import { LocalizacaoPraiaService } from './../../../../service/produto/localizacao-praia.service';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LocalizacaoPraia } from '../../../../interface/produto/localizacaoPraia';
import { TipoCadastro } from '../../../../interface/enum/tipoCadastro';
import { Negocio } from '../../../../interface/produto/negocio';
import { TipoImovel } from '../../../../interface/produto/tipoImovel';
import { SituacaoImovel } from '../../../../interface/produto/situacaoImovel';
import { NegocioService } from '../../../../service/produto/negocio.service';
import { TipoImovelService } from '../../../../service/produto/tipo-imovel.service';
import { SituacaoImovelService } from '../../../../service/produto/situacao-imovel.service';
import { Mensagem } from '../../../../utils/mensagem';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Condominio } from '../../../../interface/pessoa/condominio';
import { EnderecoDTO } from '../../../../interface/pessoa/endereco';
import { CondominioService } from '../../../../service/pessoa/condominio.service';
import { EnderecoService } from '../../../../service/pessoa/endereco.service';
import { MatSelectModule } from '@angular/material/select';
import { Proximidade } from '../../../../interface/produto/proximidade';
import { ProximidadeService } from '../../../../service/produto/proximidade.service';
import { AreaLazerService } from '../../../../service/produto/area-lazer.service';

@Component({
    selector: 'app-cadastro-opcoes',
    imports: [MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, MatSelectModule],
    templateUrl: './cadastro-opcoes.component.html',
    styleUrl: './cadastro-opcoes.component.css'
})
export class CadastroOpcoesComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<CadastroOpcoesComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number, tipo: string },
              private localizacaoPraiaService: LocalizacaoPraiaService,
              private proximidadeService: ProximidadeService,
              private areaLazerService: AreaLazerService,
              private negocioService: NegocioService,
              private tipoImovelService: TipoImovelService,
              private situacaoImovelService: SituacaoImovelService,
              private condominioService: CondominioService,
              private enderecoService: EnderecoService,
              private mensagemService: Mensagem){}

  tipoCadastro!: string;
  id!: number;
  localizacaoPraia: LocalizacaoPraia = new LocalizacaoPraia();
  negocio: Negocio = new Negocio();
  tipoImovel: TipoImovel = new TipoImovel();
  situacaoImovel: SituacaoImovel = new SituacaoImovel();
  condominio: Condominio = new Condominio();
  areaLazer: AreaLazer = new AreaLazer();
  proximidade: Proximidade = new Proximidade();
  mostraCampo!: string;
  listaEndereco: EnderecoDTO[] = [];
  titulo: string = '';
  valida = false;

  ngOnInit(): void {
    this.tipoCadastro = this.data.tipo;
    this.id = this.data.id;
    this.carregaDados();
  }
  carregaDados() {
    switch(this.tipoCadastro){
      case TipoCadastro.LOCALIZACAO_PRAIA:
        this.titulo = TipoCadastro.LOCALIZACAO_PRAIA;
        this.carregaLocalizacaoPraia();
        break;
      case TipoCadastro.NEGOCIO:
        this.titulo = TipoCadastro.NEGOCIO;
        this.mostraCampo = "negocio";
        this.carregaNegocio();
        break;
      case TipoCadastro.TIPO_IMOVEL:
        this.titulo = TipoCadastro.TIPO_IMOVEL;
        this.mostraCampo = "tipoImovel";
        this.carregaTipoImovel();
        break;
      case TipoCadastro.SITUACAO_IMOVEL:
        this.titulo = TipoCadastro.SITUACAO_IMOVEL;
        this.mostraCampo = "situacaoImovel";
        this.carregaSituacaoImovel();
        break;
      case TipoCadastro.CONDOMINIO:
        this.mostraCampo = "condominio";
        this.titulo = TipoCadastro.CONDOMINIO;
        this.carregaEndereco();
        break;
      case TipoCadastro.AREA_LAZER:
        this.mostraCampo = "areaLazer";
        this.titulo = TipoCadastro.AREA_LAZER;
        this.carregaAreaLazer();
        break;
      case TipoCadastro.PROXIMIDADE:
        this.mostraCampo = "proximidade";
        this.titulo = TipoCadastro.PROXIMIDADE;
        this.carregaProximidade();
        break;
    }
  }
  carregaProximidade() {
    if(this.id != null){
      this.proximidadeService.getById(this.id).subscribe({
        next:(res)=>{
          this.proximidade = res;
        }, error:(err)=>{
          console.log("Não foi possivel carregar a proximidade: "+ err);
        }
      })
    }
  }
  carregaAreaLazer() {
    if(this.id != null){
      this.areaLazerService.getById(this.id).subscribe({
        next:(res)=>{
          this.areaLazer = res;
        }, error:(err)=>{
          console.log("Não foi possivel carregar a àrea de lazer: "+ err);
        }
      })
    }
  }
  carregaEndereco() {
    this.enderecoService.getAll().subscribe({
      next:(res)=>{
        this.listaEndereco = res;
        this.carregaCondominio();
      }, error:(err)=>{
        console.log("Não foi possivel carregar o endereço: "+ err);
      }
    });
  }
  carregaCondominio() {
    if(this.id != null){
      this.condominioService.getById(this.id).subscribe({
        next:(res)=>{
          this.condominio = res;
          const endereco = this.listaEndereco.find(endereco => endereco.endCodigo === this.condominio.endereco.endCodigo);
          if (endereco) this.condominio.endereco = endereco;
        }, error:(err)=>{
          console.log("Não foi possivel carregar o condomínio: "+ err);
        }
      })
    }
  }

  carregaSituacaoImovel() {
    if(this.id != null){
      this.situacaoImovelService.getById(this.id).subscribe({
        next:(res)=>{
          this.situacaoImovel = res;
        },error:(err)=>{
          console.log("Não foi possivel carregar a situação imovel: "+ err);
        }
      })
    }
  }
  carregaTipoImovel() {
    if(this.id != null){
      this.tipoImovelService.getById(this.data.id).subscribe({
        next:(res)=>{
          this.tipoImovel = res;
        },error:(err)=>{
          console.log("Não foi possivel carregar a tipo imovel: "+ err);
        }
      })
    }
  }
  carregaNegocio() {
    if(this.id != null){
      this.negocioService.getById(this.data.id).subscribe({
        next:(res)=>{
          this.negocio = res;
        },error:(err)=>{
          console.log("Não foi possivel carregar a negócio: "+ err);
        }
      })
    }
  }

  carregaLocalizacaoPraia(){
    if(this.id != null){
      this.localizacaoPraiaService.getById(this.data.id).subscribe({
        next:(res)=>{
          this.localizacaoPraia = res;
        },error:(err)=>{
          console.log("Não foi possivel carregar a localização praia: "+ err);
        }
      })
    }
  }

  salvar(){
    if(this.validar()){
      return
    }
    switch(this.tipoCadastro){
      case TipoCadastro.LOCALIZACAO_PRAIA:
        this.salvarLocalizacaoPraia();
        break;
      case TipoCadastro.NEGOCIO:
        this.salvarNegocio();
        break;
      case TipoCadastro.TIPO_IMOVEL:
        this.salvarTipoImovel();
        break;
      case TipoCadastro.SITUACAO_IMOVEL:
        this.salvarSituacaoImovel();
        break;
      case TipoCadastro.CONDOMINIO  :
        this.salvarCondominio();
        break;
      case TipoCadastro.AREA_LAZER  :
        this.salvarAreaLazer();
        break;
      case TipoCadastro.PROXIMIDADE  :
        this.salvarProximidade();
        break;
    }
  }

  validar(): boolean{
    if(this.localizacaoPraia.lcpDescricao != null && this.localizacaoPraia.lcpDescricao.length > 0
      || this.negocio.ngcDescricao != null && this.negocio.ngcDescricao.length > 0
      || this.tipoImovel.tpiDescricao != null && this.tipoImovel.tpiDescricao.length > 0
      || this.situacaoImovel.stiDescricao != null && this.situacaoImovel.stiDescricao.length > 0
      || this.condominio.conDescricao != null && this.condominio.conDescricao.length > 0
      || this.condominio.endereco.endCodigo != null
      || this.areaLazer.arlDescricao != null && this.areaLazer.arlDescricao.length > 0
      || this.proximidade.prxDescricao != null && this.proximidade.prxDescricao.length > 0){
      return false;
    }
    this.valida = true;
    return true;
  }

  salvarCondominio() {
    this.condominioService.salvar(this.condominio).subscribe({
      next:(res)=>{
        this.condominio = res;
        this.mensagemService.sucesso("Condomínio salvo com sucesso")
        this.dialogRef.close();
      },error:(err)=>{
        console.log("Erro ao salvar o condomínio: "+ err);
      }
    })
  }

  salvarLocalizacaoPraia(){
    this.localizacaoPraiaService.salvar(this.localizacaoPraia).subscribe({
      next:(res)=>{
        this.localizacaoPraia = res;
        this.mensagemService.sucesso("Localização praia salvo com sucesso")
        this.dialogRef.close();
      },error:(err)=>{
        console.log("Erro ao salvar a localização praia: "+ err);
      }
    })
  }
  salvarNegocio(){
    this.negocioService.salvar(this.negocio).subscribe({
      next:(res)=>{
        this.negocio = res;
        this.mensagemService.sucesso("Negócio salvo com sucesso")
        this.dialogRef.close();
      },error:(err)=>{
        console.log("Erro ao salvar o Negócio: "+ err);
      }
    })
  }
  salvarTipoImovel(){
    this.tipoImovelService.salvar(this.tipoImovel).subscribe({
      next:(res)=>{
        this.tipoImovel = res;
        this.mensagemService.sucesso("Tipo imóvel salvo com sucesso")
        this.dialogRef.close();
      },error:(err)=>{
        console.log("Erro ao salvar o tipo imóvel: "+ err);
      }
    })
  }
  salvarSituacaoImovel(){
    this.situacaoImovelService.salvar(this.situacaoImovel).subscribe({
      next:(res)=>{
        this.situacaoImovel = res;
        this.mensagemService.sucesso("Situação imóvel salvo com sucesso")
        this.dialogRef.close();
      },error:(err)=>{
        console.log("Erro ao salvar a situação imóvel: "+ err);
      }
    })
  }
  salvarProximidade() {
    this.proximidadeService.salvar(this.proximidade).subscribe({
      next:(res)=>{
        this.proximidade = res;
        this.mensagemService.sucesso("Proximidade salvo com sucesso")
        this.dialogRef.close();
      },error:(err)=>{
        console.log("Erro ao salvar a proximidade: "+ err);
      }
    })
  }
  salvarAreaLazer() {
    this.areaLazerService.salvar(this.areaLazer).subscribe({
      next:(res)=>{
        this.areaLazer = res;
        this.mensagemService.sucesso("Área Lazer salvo com sucesso")
        this.dialogRef.close();
      },error:(err)=>{
        console.log("Erro ao salvar a àrea de lazer: "+ err);
      }
    })
  }

  close(){
    this.dialogRef.close();
  }

}
