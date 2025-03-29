import { Pageable } from './../../../../interface/produto/pageable';
import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, inject, LOCALE_ID, OnInit } from '@angular/core';
import { MatTableModule} from '@angular/material/table'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Mensagem } from '../../../../utils/mensagem';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { EnderecoDTO } from '../../../../interface/pessoa/endereco';
import { EnderecoService } from '../../../../service/pessoa/endereco.service';
import { Paginacao } from '../../../../interface/produto/paginacao';
import { DeletarComponent } from '../../../home/dialog/deletar/deletar.component';
import { SessaoService } from '../../../../service/sessao/sessao.service';
import { BreakpointObserver } from '@angular/cdk/layout'

@Component({
    selector: 'app-endereco',
    imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule,
        MatTableModule, MatPaginatorModule, CommonModule, MatIcon, MatSlideToggleModule, MatButtonModule],
    providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
    templateUrl: './endereco.component.html',
    styleUrl: './endereco.component.css'
})
export class EnderecoComponent implements OnInit, AfterViewInit  {

  isLoadingResults = true;
  spinnerAcao = false;
  readonly dialog = inject(MatDialog);

  pageable!: Pageable<EnderecoDTO>;
  paginacao: Paginacao = new Paginacao();
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['Ref:', 'Endereço', 'Bairro', 'Cidade/UF', 'Ação'];
  constructor(private enderecoService : EnderecoService,
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

  atualizaColunaTabela() {
    const isSmall = this.breakpointObserver.isMatched('(max-width: 582px)');
    const isMedium = this.breakpointObserver.isMatched('(max-width: 812px)');

    if (isSmall) {
      this.displayedColumns = ['Ref:', 'Endereço', 'Ação'];
    } else if (isMedium) {
      this.displayedColumns = ['Ref:', 'Endereço', 'Bairro', 'Ação'];
    } else {
      this.displayedColumns = ['Ref:', 'Endereço', 'Bairro', 'Cidade/UF', 'Ação'];
    }
  }

  observaMudancasDeTamanho() {
    this.breakpointObserver.observe(['(max-width: 812px)', '(max-width: 582px)'])
      .subscribe(() => {
        this.atualizaColunaTabela();
      });
  }

  pesquisaFiltrada() {
    this.enderecoService.getAllPaginado(this.paginacao).subscribe({
      next:(res)=>{
        this.pageable = res;
        this.isLoadingResults = false;
        this.spinnerAcao = false;
      },error: (err) => {
        this.mensagem.error("Erro buscar endereço cadastrado")
        this.isLoadingResults = false;
        this.spinnerAcao = false;
      }
    })
  }
  handlePageEvent(e: PageEvent) {
    this.paginacao.page = e.pageIndex;
    this.pageEvent = e;
    this.pesquisaFiltrada();
  }

  detalhe(endCodigo: number){
    this.route.navigate(['cadastro/endereco/'+endCodigo]);
  }

  delete(endCodigo: number){
    this.spinnerAcao = true;
    this.enderecoService.delete(endCodigo).subscribe({
      next:(res)=>{
        this.mensagem.sucesso("Endereço deletado com sucesso")
        this.pesquisaFiltrada();
      },
      error: (err) => {
        this.mensagem.error("Erro ao deletar o Endereço, favor validar se possui vinculação com outros cadastros")
        this.spinnerAcao = false;
      }
    })
  }
  novo(){
    this.route.navigate(['cadastro/endereco']);
  }
  voltar(){
    this.route.navigate(['acesso/sistema']);
  }
  abrirDialogDeletar(endereco: EnderecoDTO){
    const dialogRef = this.dialog.open(DeletarComponent, {
      width: '250px',
      data:{valor: endereco.endEndereco}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(endereco.endCodigo);
      }
    });
  }
}
