import { Pageable } from '../../../../interface/produto/pageable';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../../login/login/login.component'
import { AfterViewInit, Component, inject, LOCALE_ID, OnInit } from '@angular/core';
import { MatTableModule} from '@angular/material/table'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ImovelService } from '../../../../service/produto/imovel.service';
import { PesquisaFiltradaImovel } from '../../../../interface/produto/pesquisaFiltradaImovel';
import { Imovel } from '../../../../interface/produto/imovel';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Mensagem } from '../../../../utils/mensagem';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DeletarComponent } from '../../../home/dialog/deletar/deletar.component';
import { SessaoService } from '../../../../service/sessao/sessao.service';
import { BreakpointObserver } from '@angular/cdk/layout'

@Component({
    selector: 'app-imovel',
    imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule,
        MatTableModule, MatPaginatorModule, CommonModule, MatIcon, MatSlideToggleModule, MatButtonModule],
    providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
    templateUrl: './imovel.component.html',
    styleUrl: './imovel.component.css'
})
export class ImovelComponent implements OnInit, AfterViewInit  {

  isLoadingResults = true;
  spinnerAcao = false;
  readonly dialog = inject(MatDialog);
  pesquisaFiltradaImovel: PesquisaFiltradaImovel = new PesquisaFiltradaImovel();
  pageable!: Pageable<Imovel>;
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['Ref:', 'Descrição', 'Valor', 'Situação', 'Ação'];
  constructor(private imovelService : ImovelService,
              private mensagem: Mensagem,
              private route: Router, 
              private breakpointObserver: BreakpointObserver){}

  ngAfterViewInit(): void {
    this.atualizaColunaTabela();
    this.observaMudancasDeTamanho();
  }
  
  ngOnInit(): void {
    this.pesquisaFiltrada();
  }

  pesquisaFiltrada() {
    this.pesquisaFiltradaImovel.size = 10
    this.imovelService.getAll(this.pesquisaFiltradaImovel).subscribe({
      next:(res)=>{
        this.pageable = res;
        this.isLoadingResults = false;
        this.spinnerAcao = false;
      },error: (err) => {
        this.mensagem.error("Erro buscar imóvel cadastrado")
        this.isLoadingResults = false;
        this.spinnerAcao = false;
      }
    })
  }
  handlePageEvent(e: PageEvent) {
    this.pesquisaFiltradaImovel.page = e.pageIndex;
    this.pageEvent = e;
    this.pesquisaFiltrada();
  }

  detalhe(imvCodigo: number){
    this.route.navigate(['cadastro/imovel/'+imvCodigo]);
  }

  delete(imvCodigo: number){
    this.spinnerAcao = true;
    this.imovelService.delete(imvCodigo).subscribe({
      next:(res)=>{
        this.mensagem.sucesso("Imovel deletado com sucesso")
        this.pesquisaFiltrada();
      },
      error: (err) => {
        this.mensagem.error("Erro ao deletar o Imovel")
        this.spinnerAcao = false;
      }
    })
  }
  desativar(imvCodigo: number){
    this.spinnerAcao = true;
    this.imovelService.desativar(imvCodigo).subscribe({
      next:(res)=>{
        this.mensagem.sucesso("Imovel destivado com sucesso")
        this.pesquisaFiltrada();
      },
      error: (err) => {
        this.mensagem.error("Erro ao desativar o Imovel")
        this.spinnerAcao = false;
      }
    })
  }

  novo(){
    this.route.navigate(['cadastro/imovel']);
  }

  voltar(){
    this.route.navigate(['acesso/sistema']);
  }
  abrirDialogDeletar(imovel: Imovel){
    const dialogRef = this.dialog.open(DeletarComponent, {
      width: '250px',
      data:{valor: imovel.imvDescricao}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(imovel.imvCodigo);
      }
    });
  }

  atualizaColunaTabela() {
    const isSmall = this.breakpointObserver.isMatched('(max-width: 458px)');
    const isMedium = this.breakpointObserver.isMatched('(max-width: 560px)');
    const isLarge = this.breakpointObserver.isMatched('(max-width: 750px)');

    if (isSmall) {
      this.displayedColumns = ['Descrição', 'Ação'];
    } else if (isMedium) {
      this.displayedColumns = ['Ref:', 'Descrição', 'Ação'];
    } else if (isLarge) {
      this.displayedColumns = ['Ref:', 'Descrição', 'Situação', 'Ação'];
    } else {
      this.displayedColumns = ['Ref:', 'Descrição', 'Valor', 'Situação', 'Ação'];
    }
  }

  observaMudancasDeTamanho() {
    this.breakpointObserver.observe(['(max-width: 750px)', '(max-width: 560px)', '(max-width: 458px)'])
      .subscribe(result => {
        this.atualizaColunaTabela();
      });
  }
}