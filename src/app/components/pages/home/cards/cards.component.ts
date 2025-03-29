import { ImovelLancamento } from '../../../interface/produto/imovelLancamento';
import {  Component, inject, Inject, Input, LOCALE_ID, OnInit, PLATFORM_ID} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ImovelService } from '../../../service/produto/imovel.service';
import { Subscription, timer } from 'rxjs';
import { Util } from '../../../utils/util';
import { CommonModule, isPlatformBrowser, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { EmpresaDTO } from '../../../interface/geral/empresa';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContatoService } from '../../../service/pessoa/contato.service';
import { environment } from '../../../../../environments/environment.prod';

registerLocaleData(localePt, 'pt-BR');

@Component({
    selector: 'app-cards',
    imports: [MatSelectModule, MatFormFieldModule, MatInputModule, CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatDialogModule],
    providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
    templateUrl: './cards.component.html',
    styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {

  selected!: string;
  timerSubs!: Subscription;
  empresa: EmpresaDTO = new EmpresaDTO();
  readonly dialog = inject(MatDialog);
  @Input() imovelLancamento: ImovelLancamento[] = [];
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private imovelService: ImovelService,
              private contatoService: ContatoService,
              private router: Router){}

  ngOnInit(): void {
    this.carregaLista();
    if (isPlatformBrowser(this.platformId)) {
      this.iniciarTimer();
    }
  }

  private _indexImagemAtiva: number = 0;
  get indexImagemAtiva() {
    return this._indexImagemAtiva;
  }

  set indexImagemAtiva(value: number) {
    this._indexImagemAtiva =
      value < this.imovelLancamento.length ? value : 0;
  }

  ngOnDestroy(): void {
    this.pararTimer();
  }

  carregaLista() {
    this.imovelService.getAllLancamento().subscribe({
      next:(res)=>{
        this.imovelLancamento = res;
      }
    })
  }

  mostraImagem(imgCodigo: number): string{
    return `${environment.api_url}/imagens/getImagem?imgCodigo=${imgCodigo}`;
  }

  //slide
  iniciarTimer(): void {
    this.pararTimer();
    this.timerSubs = timer(3000).subscribe(() => {
      this.ativarImagem(this.indexImagemAtiva + 1);
    });
  }

  pararTimer(): void {
    this.timerSubs?.unsubscribe();
  }

  ativarImagem(index: number): void {
    this.indexImagemAtiva = index;
    this.iniciarTimer();
  }

  navegarImagem(direcao: string): void {
    if (direcao === 'prev') {
      this.indexImagemAtiva = (this.indexImagemAtiva === 0) ? this.imovelLancamento.length - 1 : this.indexImagemAtiva - 1;
    } else if (direcao === 'next') {
      this.indexImagemAtiva = (this.indexImagemAtiva === this.imovelLancamento.length - 1) ? 0 : this.indexImagemAtiva + 1;
    }
    this.pararTimer(); // Se necessário parar o timer de navegação automática
    this.ativarImagem(this.indexImagemAtiva); // Atualiza a imagem ativa
  }

  formataWatssap(imovel : ImovelLancamento){
    this.contatoService.selecionarContatoPorUsrCodigo(imovel.usuario.usrCodigo).subscribe({
      next:(res)=>{
        const url =  "https://api.whatsapp.com/send?phone=55"+res.cntWhatsapp+"&text=Olá, tenho interesse.";
        window.open(url, '_blank')
      }
    })

  }

  detalhes(imovel : ImovelLancamento){
    this.router.navigate(['imovel/detalhes/'+imovel.imvCodigo])
  }

}


