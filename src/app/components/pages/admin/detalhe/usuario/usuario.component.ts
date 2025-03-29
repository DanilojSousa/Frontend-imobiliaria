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
import { Usuario } from '../../../../interface/acesso/usuario';
import { UsuarioService } from '../../../../service/acesso/usuario.service';
import { SessaoService } from '../../../../service/sessao/sessao.service';
import { BreakpointObserver } from '@angular/cdk/layout'

@Component({
    selector: 'app-usuario',
    imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule,
        MatTableModule, MatPaginatorModule, CommonModule, MatIcon, MatSlideToggleModule, MatButtonModule],
    templateUrl: './usuario.component.html',
    styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit, AfterViewInit  {

  isLoadingResults = true;
  spinnerAcao = false;
  readonly dialog = inject(MatDialog);
  pageable!: Pageable<Usuario>;
  paginacao: Paginacao = new Paginacao();
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['Ref:', 'Nome','Nível','Situação','Ação'];
  constructor(private usuarioService : UsuarioService,
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
    const isSmall = this.breakpointObserver.isMatched('(max-width: 508px)');
    const isMedium = this.breakpointObserver.isMatched('(max-width: 582px)');

    if (isSmall) {
      this.displayedColumns = ['Ref:', 'Nome', 'Ação'];
    } else if (isMedium) {
      this.displayedColumns = ['Ref:', 'Nome', 'Situação', 'Ação'];
    } else {
      this.displayedColumns = ['Ref:', 'Nome', 'Nível', 'Situação', 'Ação'];
    }
  }

  observaMudancasDeTamanho() {
    this.breakpointObserver.observe(['(max-width: 582px)', '(max-width: 508px)'])
      .subscribe(() => {
        this.atualizaColunaTabela();
      });
  }

  pesquisaFiltrada() {
    this.usuarioService.getAllPaginado(this.paginacao).subscribe({
      next:(res)=>{
        this.pageable = res;
        this.isLoadingResults = false;
        this.spinnerAcao = false;
      },error: (err) => {
        this.mensagem.error("Erro ao buscar o usuário")
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

  detalhe(usrCodigo: number){
    this.route.navigate(['cadastro/usuario/'+usrCodigo]);
  }

  delete(usrCodigo: number){
    this.spinnerAcao = true;
    this.usuarioService.delete(usrCodigo).subscribe({
      next:(res)=>{
        this.mensagem.sucesso("Usuário deletado com sucesso")
        this.pesquisaFiltrada();
      },
      error: (err) => {
        this.mensagem.error("Erro ao deletar usuário, favor validar se possui vinculação com outros cadastros")
        this.spinnerAcao = false;
      }
    })
  }
  desativar(usrCodigo: number){
    this.spinnerAcao = true;
    this.usuarioService.desativar(usrCodigo).subscribe({
      next:(res)=>{
        this.mensagem.sucesso("Usuário alterado com sucesso")
        this.pesquisaFiltrada();
      },
      error: (err) => {
        this.mensagem.error("Erro ao alterar o Usuário")
        this.spinnerAcao = false;
      }
    })
  }
  novo(){
    this.route.navigate(['cadastro/usuario']);
  }
  voltar(){
    this.route.navigate(['acesso/sistema']);
  }
  abrirDialogDeletar(usuario: Usuario){
    const dialogRef = this.dialog.open(DeletarComponent, {
      width: '250px',
      data:{valor: usuario.usrNome}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(usuario.usrCodigo);
      }
    });
  }

}
