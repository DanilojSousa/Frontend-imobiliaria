import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Condominio } from '../../../../interface/pessoa/condominio';
import { Pageable } from '../../../../interface/produto/pageable';
import { Paginacao } from '../../../../interface/produto/paginacao';
import { CondominioService } from '../../../../service/pessoa/condominio.service';
import { Mensagem } from '../../../../utils/mensagem';
import { Router } from '@angular/router';
import { CadastroOpcoesComponent } from '../../../home/dialog/cadastro-opcoes/cadastro-opcoes.component';
import { TipoCadastro } from '../../../../interface/enum/tipoCadastro';
import { DeletarComponent } from '../../../home/dialog/deletar/deletar.component';
import { SessaoService } from '../../../../service/sessao/sessao.service';
import { BreakpointObserver } from '@angular/cdk/layout'

@Component({
    selector: 'app-condominio',
    imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule,
        MatTableModule, MatPaginatorModule, CommonModule, MatIcon, MatSlideToggleModule, MatButtonModule],
    templateUrl: './condominio.component.html',
    styleUrl: './condominio.component.css'
})
export class CondominioComponent implements OnInit, AfterViewInit  {

  isLoadingResults = true;
  readonly dialog = inject(MatDialog);
  pageable!: Pageable<Condominio>;
  paginacao: Paginacao = new Paginacao();
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['Ref:', 'Descrição','Endereço','Ação'];
  constructor(private condominioService : CondominioService,
              private mensagem: Mensagem,
              private route: Router, 
              private breakpointObserver: BreakpointObserver){}

  ngAfterViewInit(): void {
    this.atualizaColunaTabela();
  }

  ngOnInit(): void {
    this.pesquisaFiltrada();
  }

  atualizaColunaTabela(){
    this.breakpointObserver.observe(['(max-width: 540px)']).subscribe(result => {
      if (result.matches) {
        // Remova a coluna "Valor" se a tela for menor que 750px
        this.displayedColumns = ['Ref:', 'Descrição','Ação'];
      } else {
        // Adicione novamente a coluna "Valor" se a tela for maior que 750px
        this.displayedColumns = ['Ref:', 'Descrição','Endereço','Ação'];
      }
    });
  }

  pesquisaFiltrada() {
    this.condominioService.getAllPaginado(this.paginacao).subscribe({
      next:(res)=>{
        this.pageable = res;
        this.isLoadingResults = false;
      },error: (err) => {
        this.mensagem.error("Erro ao buscar o condomínio: "+err)
        this.isLoadingResults = false;
      }
    })
  }
  handlePageEvent(e: PageEvent) {
    this.paginacao.page = e.pageIndex;
    this.pageEvent = e;
    this.pesquisaFiltrada();
  }

  detalhe(conCodigo: number | null){
    const dialogRef = this.dialog.open(CadastroOpcoesComponent, {
      width: '500px',
      data:{id: conCodigo, tipo: TipoCadastro.CONDOMINIO}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pesquisaFiltrada();
    });
  }

  novo(){
    const dialogRef = this.dialog.open(CadastroOpcoesComponent, {
      width: '500px',
      data:{tipo: TipoCadastro.CONDOMINIO}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pesquisaFiltrada();
    });
  }

  delete(conCodigo: number){
    this.condominioService.delete(conCodigo).subscribe({
      next:(res)=>{
        this.mensagem.sucesso("Condomínio deletado com sucesso")
        this.pesquisaFiltrada();
      },
      error: (err) => {
        this.mensagem.error("Erro ao deletar condomínio, favor validar se possui vinculação com outros cadastros")
      }
    })
  }

  voltar(){
    this.route.navigate(['acesso/sistema']);
  }
  abrirDialogDeletar(condominio: Condominio){
    const dialogRef = this.dialog.open(DeletarComponent, {
      width: '250px',
      data:{valor: condominio.conDescricao}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(condominio.conCodigo);
      }
    });
  }
}
