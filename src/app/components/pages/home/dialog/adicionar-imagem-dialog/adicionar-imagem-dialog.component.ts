import { Imagens } from './../../../../interface/produto/imagens';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Imovel } from '../../../../interface/produto/imovel';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import { Mensagem } from '../../../../utils/mensagem';
import { Util } from '../../../../utils/util';
import { ImagensService } from '../../../../service/produto/imagens.service';

@Component({
    selector: 'app-adicionar-imagem-dialog',
    imports: [MatRadioModule, FormsModule, MatDividerModule,
        MatButtonModule, MatCardModule, MatIconModule, MatTooltipModule, CommonModule],
    templateUrl: './adicionar-imagem-dialog.component.html',
    styleUrl: './adicionar-imagem-dialog.component.css'
})
export class AdicionarImagemDialogComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<AdicionarImagemDialogComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: { imovel: Imovel},
              private mensagemService: Mensagem,
              private imagensService: ImagensService){}
  errors: string[] = [];
  imovel: Imovel = new Imovel();
  index: number = 0;
  
  ngOnInit(): void {
    this.imovel = this.data.imovel;
    this.carregaImagem();
  }

  carregaImagem(){
    if(this.imovel.imvCodigo != undefined){
      this.imagensService.getAllPorImvCodigo(this.imovel.imvCodigo).subscribe({
        next:(res)=>{
          this.imovel.imagens = res;
        }
      })
    }
  }

  fecharDialog(){
    this.imovel.imagens.map(x => x.imgPrincipal = false)
    this.imovel.imagens[this.index].imgPrincipal = true;
    this.dialogRef.close(this.imovel);
  }
  
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      this.validateAndProcessFiles(Array.from(input.files));
    }
  }

  // Método chamado ao arrastar arquivos para a área de drop
  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.validateAndProcessFiles(Array.from(event.dataTransfer.files));
    }
  }

  // Previne o comportamento padrão do arrastar
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  // Valida e processa os arquivos
  private validateAndProcessFiles(files: File[]): void {
    files.forEach((file) => {
      if (file.type === 'image/png') {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = (reader.result as string).split(',')[1]; // Remove o prefixo "data:image/png;base64,"
          const image = new Image();
          image.src = `data:image/png;base64,${base64String}`;
          image.onload = () => {
            if (image.width >= 800 && image.height >= 600) {
              const imagens = new Imagens();
              imagens.imgImagem = base64String; // Armazena apenas o conteúdo Base64
              imagens.imgPrincipal = this.imovel.imagens.length === 0;
              this.imovel.imagens.push(imagens);
            } else {
              this.mensagemService.atencao(`Arquivo ${file.name} inválido: dimensões menores que 800x600.`);
              console.error(`Arquivo ${file.name} inválido: dimensões menores que 800x600.`);
            }
          };
        };
        reader.readAsDataURL(file);
      } else {
        this.mensagemService.atencao(`Arquivo ${file.name} inválido: não é uma imagem PNG.`);
        console.error(`Arquivo ${file.name} inválido: não é uma imagem PNG.`);
      }
    });
  }

  mostrarImagem(imagem: string): string{
    return Util.mostraImagemString(imagem);;
  }
  deletarImagens(index: number){
    this.imovel.imagens.splice(index, 1);
  }
  limparTudo(){
    this.imovel.imagens = [];
  }
}
