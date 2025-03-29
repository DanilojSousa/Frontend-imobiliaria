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
import { Negocio } from '../../../../interface/produto/negocio';
import { NegocioService } from '../../../../service/produto/negocio.service';
import { DeletarComponent } from '../../../home/dialog/deletar/deletar.component';
import { CadastroOpcoesComponent } from '../../../home/dialog/cadastro-opcoes/cadastro-opcoes.component';
import { TipoCadastro } from '../../../../interface/enum/tipoCadastro';
import { SessaoService } from '../../../../service/sessao/sessao.service';

@Component({
    selector: 'app-negocio',
    imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule,
        MatTableModule, MatPaginatorModule, CommonModule, MatIcon, MatSlideToggleModule, MatButtonModule],
    templateUrl: './negocio.component.html',
    styleUrl: './negocio.component.css'
})
export class NegocioComponent implements OnInit {

  isLoadingResults = true;
  spinnerAcao = false;
  readonly dialog = inject(MatDialog);
  pageable!: Pageable<Negocio>;
  paginacao: Paginacao = new Paginacao();
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['Ref:', 'Descrição', 'Ação'];
  constructor(private negocioService : NegocioService,
              private mensagem: Mensagem,
              private route: Router){}

  ngOnInit(): void {
    this.pesquisaFiltrada();
  }

  pesquisaFiltrada() {
    this.negocioService.getAllPaginado(this.paginacao).subscribe({
      next:(res)=>{
        this.pageable = res;
        this.isLoadingResults = false;
        this.spinnerAcao = false;
      },error: (err) => {
        this.mensagem.error("Erro buscar a localização")
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

  detalhe(ngcCodigo: number | null){
    const dialogRef = this.dialog.open(CadastroOpcoesComponent, {
      width: '500px',
      data:{id: ngcCodigo, tipo: TipoCadastro.NEGOCIO}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pesquisaFiltrada();
    });
  }

  novo(){
    const dialogRef = this.dialog.open(CadastroOpcoesComponent, {
      width: '500px',
      data:{tipo: TipoCadastro.NEGOCIO}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pesquisaFiltrada();
    });
  }

  delete(ngcCodigo: number){
    this.spinnerAcao = true;
    this.negocioService.delete(ngcCodigo).subscribe({
      next:(res)=>{
        this.mensagem.sucesso("Negócio deletado com sucesso")
        this.pesquisaFiltrada();
      },
      error: (err) => {
        this.mensagem.error("Erro ao deletar o Negócio, favor validar se possui vinculação com outros cadastros")
        this.spinnerAcao = false;
      }
    })
  }
  voltar(){
    this.route.navigate(['acesso/sistema']);
  }
  abrirDialogDeletar(negocio: Negocio){
    const dialogRef = this.dialog.open(DeletarComponent, {
      width: '250px',
      data:{valor: negocio.ngcDescricao}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(negocio.ngcCodigo);
      }
    });
  }
}
