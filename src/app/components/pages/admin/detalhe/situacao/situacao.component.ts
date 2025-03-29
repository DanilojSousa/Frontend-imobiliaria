import { Pageable } from '../../../../interface/produto/pageable';
import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
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
import { Paginacao } from '../../../../interface/produto/paginacao';
import { DeletarComponent } from '../../../home/dialog/deletar/deletar.component';
import { SituacaoImovel } from '../../../../interface/produto/situacaoImovel';
import { SituacaoImovelService } from '../../../../service/produto/situacao-imovel.service';
import { CadastroOpcoesComponent } from '../../../home/dialog/cadastro-opcoes/cadastro-opcoes.component';
import { TipoCadastro } from '../../../../interface/enum/tipoCadastro';
import { SessaoService } from '../../../../service/sessao/sessao.service';

@Component({
    selector: 'app-situacao',
    imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule,
        MatTableModule, MatPaginatorModule, CommonModule, MatIcon, MatSlideToggleModule, MatButtonModule],
    templateUrl: './situacao.component.html',
    styleUrl: './situacao.component.css'
})
export class SituacaoComponent implements OnInit {

  isLoadingResults = true;
  spinnerAcao = false;
  readonly dialog = inject(MatDialog);
  pageable!: Pageable<SituacaoImovel>;
  paginacao: Paginacao = new Paginacao();
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['Ref:', 'Descrição', 'Ação'];
  constructor(private situacaoImovelService : SituacaoImovelService,
              private mensagem: Mensagem,
              private route: Router){}

  ngOnInit(): void {
    this.pesquisaFiltrada();
  }

  pesquisaFiltrada() {
    this.situacaoImovelService.getAllPaginado(this.paginacao).subscribe({
      next:(res)=>{
        this.pageable = res;
        this.isLoadingResults = false;
        this.spinnerAcao = false;
      },error: (err) => {
        this.mensagem.error("Erro buscar a situação do Imovel")
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

  detalhe(stiCodigo: number | null){
    const dialogRef = this.dialog.open(CadastroOpcoesComponent, {
      width: '500px',
      data:{id: stiCodigo, tipo: TipoCadastro.SITUACAO_IMOVEL}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pesquisaFiltrada();
    });
  }

  novo(){
    const dialogRef = this.dialog.open(CadastroOpcoesComponent, {
      width: '500px',
      data:{tipo: TipoCadastro.SITUACAO_IMOVEL}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pesquisaFiltrada();
    });
  }

  delete(stiCodigo: number){
    this.spinnerAcao = true;
    this.situacaoImovelService.delete(stiCodigo).subscribe({
      next:(res)=>{
        this.mensagem.sucesso("Situação do imovel deletado com sucesso")
        this.pesquisaFiltrada();
      },
      error: (err) => {
        this.mensagem.error("Erro ao deletar a situação do Imovel, favor validar se possui vinculação com outros cadastros")
        this.spinnerAcao = false;
      }
    })
  }

  voltar(){
    this.route.navigate(['acesso/sistema']);
  }
  abrirDialogDeletar(situacao: SituacaoImovel){
    const dialogRef = this.dialog.open(DeletarComponent, {
      width: '250px',
      data:{valor: situacao.stiDescricao}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(situacao.stiCodigo);
      }
    });
  }
}
