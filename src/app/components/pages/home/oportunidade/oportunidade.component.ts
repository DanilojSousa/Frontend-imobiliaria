import { Component, OnInit } from '@angular/core';
import { ImovelService } from '../../../service/produto/imovel.service';
import { ImovelLancamento } from '../../../interface/produto/imovelLancamento';
import { Util } from '../../../utils/util';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';

@Component({
    selector: 'app-oportunidade',
    imports: [],
    templateUrl: './oportunidade.component.html',
    styleUrl: './oportunidade.component.css'
})
export class OportunidadeComponent implements OnInit {

  listaImovelOportunidade: ImovelLancamento[] = [];
  constructor(private imovelService: ImovelService,
              private router: Router){

  }
  ngOnInit(): void {
    this.carregaLista();
  }

  carregaLista() {
    this.imovelService.getAllOportunidade().subscribe({
      next:(res)=>{
        this.listaImovelOportunidade = res;
      }
    })
  }

  detalhes(imvCodigo : number){
    this.router.navigate(['imovel/detalhes/'+imvCodigo])
  }

  mostraImagem(imgCodigo: number): string{
    return `${environment.api_url}/imagens/getImagem?imgCodigo=${imgCodigo}`;
  }
}
