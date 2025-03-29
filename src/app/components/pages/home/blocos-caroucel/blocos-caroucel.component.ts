import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PesquisaFiltradaImovel } from '../../../interface/produto/pesquisaFiltradaImovel';
import { Pageable } from '../../../interface/produto/pageable';
import { Imovel } from '../../../interface/produto/imovel';
import { ImovelService } from '../../../service/produto/imovel.service';
import localePt from '@angular/common/locales/pt';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SessaoService } from '../../../service/sessao/sessao.service';
import { ImagensFiltrada } from '../../../interface/produto/imagens_filtrada';
import { environment } from '../../../../../environments/environment.prod';
import { ImagensCodigo } from '../../../interface/produto/ImagensCodigo';


registerLocaleData(localePt, 'pt-BR');

@Component({
    selector: 'app-blocos-caroucel',
    imports: [MatIcon, CommonModule, MatGridListModule, MatDividerModule, MatPaginatorModule, MatProgressSpinnerModule],
    providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
    templateUrl: './blocos-caroucel.component.html',
    styleUrl: './blocos-caroucel.component.css'
})
export class BlocosCaroucelComponent implements OnInit{

  pesquisaFiltradaImovel: PesquisaFiltradaImovel = new PesquisaFiltradaImovel();
  @Input() pageable!: Pageable<Imovel>
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageSize = 12;
  spinner: boolean = false;
  filtro: boolean = false;
  pageEvent!: PageEvent;
  imagensFiltrada: ImagensFiltrada = new ImagensFiltrada();
  constructor(private imovelService : ImovelService,
              private router: Router,
              private sessaoService: SessaoService){}

  ngOnInit(): void {
    if(this.sessaoService.getPageable() != null){
      this.pageable = this.sessaoService.getPageable();
    }else{
      this.pesquisaFiltrada();
    }
  }

  pesquisaFiltrada() {
    this.imovelService.pesquisaFiltrada(this.pesquisaFiltradaImovel).subscribe({
      next:(res)=>{
        this.pageable = res;
      }
    })
  }

  indexImagem(imagens: ImagensCodigo[]): number {
    if(imagens[0].index === null || imagens[0].index === undefined){
      imagens[0].index = 0;
    }
    return imagens[0].index < imagens.length ? imagens[0].index : 0;
  }

  navegarImagem(direcao: string, imagens: ImagensCodigo[]): void {
    if(imagens[0].index === null || imagens[0].index === undefined){
      imagens[0].index = 0;
    }
    if (direcao === 'prev') {
      if(imagens[0].index === 0){
        imagens[0].index = imagens.length
      }else{
        imagens[0].index -= 1;
      }
    } else if (direcao === 'next') {
      if(imagens[0].index > imagens.length){
        imagens[0].index = 0;
      }else{
        imagens[0].index += 1;
      }
    }
  }
  mostraImagem(imgCodigo: number): string{
    return `${environment.api_url}/imagens/getImagem?imgCodigo=${imgCodigo}`;
  }

  compartilhar(imovel : Imovel){
    if (navigator.share) {
      navigator
        .share({
          title: imovel.imvDescricao,
          text: imovel.imvObservacao,
          url: window.location.href.replace("/imovel/filtro","") + "/imovel/detalhes/"+imovel.imvCodigo, // Compartilha a URL atual
        })
        .then(() => console.log('Compartilhamento bem-sucedido!'))
        .catch((error) => console.error('Erro ao compartilhar:', error));
    } else {
      // Fallback para navegadores que não suportam a Web Share API
      alert('A funcionalidade de compartilhamento não está disponível neste dispositivo.');
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pesquisaFiltradaImovel.page = e.pageIndex;
    this.pageEvent = e;
    this.pesquisaFiltrada();
  }

  detalhes(imvCodigo : number){
    this.sessaoService.setPageable(this.pageable);
    this.router.navigate(['imovel/detalhes/'+imvCodigo])
  }
}
