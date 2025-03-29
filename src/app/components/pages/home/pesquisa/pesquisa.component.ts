import { CondominioService } from './../../../service/pessoa/condominio.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Negocio } from '../../../interface/produto/negocio';
import { TipoImovel } from '../../../interface/produto/tipoImovel';
import { EnderecoDTO } from '../../../interface/pessoa/endereco';
import { Condominio } from '../../../interface/pessoa/condominio';
import { EstadoService } from '../../../service/pessoa/estado.service';
import { EnderecoService } from '../../../service/pessoa/endereco.service';
import { PesquisaFiltradaImovel } from '../../../interface/produto/pesquisaFiltradaImovel';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { EstadoCidade } from '../../../interface/pessoa/estadoCidade';
import { CurrencyMaskDirectiveDirective } from '../../../diretivas/currency-mask-directive.directive';
import { Cidade } from '../../../interface/pessoa/cidade';
import { Router } from '@angular/router';
import { SessaoService } from '../../../service/sessao/sessao.service';
import { ImovelService } from '../../../service/produto/imovel.service';
import { NegocioService } from '../../../service/produto/negocio.service';
import { TipoImovelService } from '../../../service/produto/tipo-imovel.service';

@Component({
    selector: 'app-pesquisa',
    imports: [MatSelectModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, CommonModule, CurrencyMaskDirectiveDirective],
    templateUrl: './pesquisa.component.html',
    styleUrl: './pesquisa.component.css'
})
export class PesquisaComponent implements OnInit{

  listaNegocio: Negocio[] = [];
  listaTipoImovel: TipoImovel[] = [];
  listaEstadoCidade: EstadoCidade[] = [];
  listaEnderecoSelecionado = new FormControl<EnderecoDTO[] | null>(null);
  listaCondominioSelecionado = new FormControl<Condominio[] | null>(null);
  listaNegocioSelecionado = new FormControl<Negocio | null>(null);
  listaTipoImovelSelecionado = new FormControl<TipoImovel | null>(null);
  listaCidadeSelecionado = new FormControl<Cidade | null>(null);
  listaEndereco: EnderecoDTO[] = [];
  listaCondominio: Condominio[] = [];
  pesquisaFiltradaImovel: PesquisaFiltradaImovel = new PesquisaFiltradaImovel();
  constructor(private imovelService: ImovelService,
              private estadoService: EstadoService,
              private enderecoService: EnderecoService,
              private condominioService: CondominioService,
              private sessaoService: SessaoService,
              private negocioService: NegocioService,
              private tipoImovelService: TipoImovelService,
              private router: Router){}
  ngOnInit(): void {
    this.carregaNegocio();
    this.carregaTipoImovel();
    this.carregaEstado();
    this.carregaEndereco();
    this.carregaCondominio();
  }

  pesquisaFiltrada(){
    if(this.listaNegocioSelecionado.value != null){
      this.pesquisaFiltradaImovel.ngcCodigo = this.listaNegocioSelecionado.value.ngcCodigo;
    }
    if(this.listaTipoImovelSelecionado.value != null){
      this.pesquisaFiltradaImovel.tpiCodigo!.push(this.listaTipoImovelSelecionado.value.tpiCodigo);
    }
    if(this.listaCidadeSelecionado.value != null){
      this.pesquisaFiltradaImovel.cidCodigo = this.listaCidadeSelecionado.value.cidCodigo;
    }
    if(this.listaEnderecoSelecionado.value != null){
      this.pesquisaFiltradaImovel.endCodigo = this.listaEnderecoSelecionado.value.map(x => x.endCodigo);
    }
    if(this.listaCondominioSelecionado.value != null){
      this.pesquisaFiltradaImovel.conCodigo = this.listaCondominioSelecionado.value.map(x => x.conCodigo);
    }
    localStorage.setItem('pesquisaFiltradaImovel', JSON.stringify(this.pesquisaFiltradaImovel));
    this.sessaoService.setPesquisaFiltradaImovel(this.pesquisaFiltradaImovel);
    this.router.navigate(['imovel/filtro'])
  }

  carregaNegocio(){
    this.negocioService.getAllPorImovelAtivo().subscribe({
      next:(res)=>{
        this.listaNegocio = res;
      }
    })
  }
  carregaTipoImovel(){
    this.tipoImovelService.getAllPorImovelAtivo().subscribe({
      next:(res)=>{
        this.listaTipoImovel = res;
      }
    })
  }
  carregaEstado(){
    this.estadoService.getAllPorImovelAtivo().subscribe({
      next:(res)=>{
        this.listaEstadoCidade = res;
      }
    })
  }

  carregaEndereco(){
    this.enderecoService.getAllPorImovelAtivo().subscribe({
      next:(res)=>{
        this.listaEndereco = res;
      }
    })
  }
  carregaEnderecoSelecionado(){
    this.enderecoService.getAllPorCidCodigo(this.listaCidadeSelecionado.value!.cidCodigo).subscribe({
      next:(res)=>{
        this.listaEndereco = res;
        this.carregaCondominioPorEnderecos(res);
      }
    })
  }
  carregaCondominio(){
    this.condominioService.getAllPorImovelAtivo().subscribe({
      next:(res)=>{
        this.listaCondominio = res;
      }
    })
  }
  carregaCondominioPorEnderecos(enderecos: EnderecoDTO[]){
    const num: number[] = enderecos.map(end => end.endCodigo);
    this.condominioService.carregaCondominioPorEnderecos(num).subscribe({
      next:(res)=>{
        this.listaCondominio = res;
      }
    })
  }
  carregaCondominioSelecionado(){
    this.listaCondominio = []
    if(this.listaEnderecoSelecionado.value!.length > 0){
      this.listaEnderecoSelecionado.value?.forEach(x =>{
        this.condominioService.getAllPorEndCodigo(x.endCodigo).subscribe({
          next:(res)=>{
            this.listaCondominio = [...this.listaCondominio, ...res];
          }
        })
      })
    }else{
      this.carregaCondominio();
    }
  }
  valorMaximo(value: number | null){
    if(value != null){
      this.pesquisaFiltradaImovel.valorMaximo = value;
    }
  }
  valorMinimo(value: number | null){
    if(value != null){
      this.pesquisaFiltradaImovel.valorMinimo = value;
    }
  }
}
