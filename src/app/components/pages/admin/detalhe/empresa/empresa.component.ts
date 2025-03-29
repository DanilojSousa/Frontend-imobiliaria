import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { DeletarComponent } from '../../../home/dialog/deletar/deletar.component';
import { EmpresaDTO } from '../../../../interface/geral/empresa';
import { EmpresaService } from '../../../../service/geral/empresa.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Mensagem } from '../../../../utils/mensagem';
import { Pageable } from '../../../../interface/produto/pageable';
import { Paginacao } from '../../../../interface/produto/paginacao';
import { Router } from '@angular/router';
import { SessaoService } from '../../../../service/sessao/sessao.service';

@Component({
    selector: 'app-empresa',
    imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule,
        MatTableModule, MatPaginatorModule, CommonModule, MatIcon, MatSlideToggleModule, MatButtonModule],
    templateUrl: './empresa.component.html',
    styleUrl: './empresa.component.css'
})
export class EmpresaComponent implements OnInit, AfterViewInit  {

  isLoadingResults = true;
  spinnerAcao = false;
  readonly dialog = inject(MatDialog);
  pageable!: Pageable<EmpresaDTO>;
  paginacao: Paginacao = new Paginacao();
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['Ref:', 'Razão Social','CNPJ','Situação','Ação'];
  constructor(private empresaService : EmpresaService,
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
    const isSmall = this.breakpointObserver.isMatched('(max-width: 516px)');
    const isMedium = this.breakpointObserver.isMatched('(max-width: 712px)');

    if (isSmall) {
      this.displayedColumns = ['Ref:', 'Razão Social', 'Ação'];
    } else if (isMedium) {
      this.displayedColumns = ['Ref:', 'Razão Social', 'Situação', 'Ação'];
    } else {
      this.displayedColumns = ['Ref:', 'Razão Social', 'CNPJ', 'Situação', 'Ação'];
    }
  }

  observaMudancasDeTamanho() {
    this.breakpointObserver.observe(['(max-width: 712px)', '(max-width: 516px)'])
      .subscribe(() => {
        this.atualizaColunaTabela();
      });
  }

  pesquisaFiltrada() {
    this.empresaService.getAllPaginado(this.paginacao).subscribe({
      next:(res)=>{
        this.pageable = res;
        this.isLoadingResults = false;
        this.spinnerAcao = false;
      },error: (err) => {
        this.mensagem.error("Erro ao buscar a empresa")
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

  detalhe(empCodigo: number){
    this.route.navigate(['cadastro/empresa/'+empCodigo]);
  }

  delete(empCodigo: number){
    this.spinnerAcao = true;
    this.empresaService.delete(empCodigo).subscribe({
      next:(res)=>{
        this.mensagem.sucesso("Empresa deletado com sucesso")
        this.pesquisaFiltrada();
      },
      error: (err) => {
        this.mensagem.error("Erro ao deletar empresa, favor validar se possui vinculação com outros cadastros")
        this.spinnerAcao = false;
      }
    })
  }
  desativar(empCodigo: number){
    this.spinnerAcao = true;
    this.empresaService.desativar(empCodigo).subscribe({
      next:(res)=>{
        this.mensagem.sucesso("Empresa alterado com sucesso")
        this.pesquisaFiltrada();
      },
      error: (err) => {
        this.mensagem.error("Erro ao alterar a Empresa")
        this.spinnerAcao = false;
      }
    })
  }
  novo(){
    this.route.navigate(['cadastro/empresa']);
  }
  voltar(){
    this.route.navigate(['acesso/sistema']);
  }
  abrirDialogDeletar(empresa: EmpresaDTO){
    const dialogRef = this.dialog.open(DeletarComponent, {
      width: '250px',
      data:{valor: empresa.empRazaoSocial}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(empresa.empCodigo);
      }
    });
  }

  formatCNPJ(cnpj:string): string {
    if(cnpj != null){
      const cnpjFormat = cnpj.replace(/\D/g, '');
      return cnpjFormat.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5'
      );
    }
    return '';
  }

  bloquearExcluir(situacao : number): boolean{
    return situacao === 2;
  }
}
