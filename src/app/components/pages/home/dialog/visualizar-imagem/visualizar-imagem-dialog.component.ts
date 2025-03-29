import { Component, HostListener, Inject, inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Imagens } from '../../../../interface/produto/imagens';
import { Util } from '../../../../utils/util';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-visualizar-imagem',
    imports: [CommonModule],
    templateUrl: './visualizar-imagem-dialog.component.html',
    styleUrl: './visualizar-imagem-dialog.component.css'
})
export class VisualizarImagemDialogComponent implements OnInit {

  imagemPrincipal!: string;
  imagemSlide!: Imagens[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: { listaImagens: Imagens[], indice: number },
              private dialogRef: MatDialogRef<VisualizarImagemDialogComponent>){
  }

  ngOnInit(): void {
    this.imagemPrincipal = this.data.listaImagens[this.data.indice].imgImagem;
    this.imagemSlide = [...this.data.listaImagens];
  }

  mostraImagem(arquivo: any){
    return Util.mostraImagem(arquivo);
  }

  navegarImagem(direcao: string): void {
    if (direcao === 'prev') {
      const ultimoElemento = this.imagemSlide.pop(); // Remove o último elemento
      if (ultimoElemento !== undefined) {
        this.imagemSlide.unshift(ultimoElemento); // Adiciona no início
      }
    } else if (direcao === 'next') {
      const primeiroElemento = this.imagemSlide.shift();
      if (primeiroElemento !== undefined) {
        this.imagemSlide.push(primeiroElemento);
      }
    }
  }
  mudarImagem(indice: number){
    this.imagemPrincipal = this.imagemSlide[indice].imgImagem;
  }
  close(){
    this.dialogRef.close()
  }
}
