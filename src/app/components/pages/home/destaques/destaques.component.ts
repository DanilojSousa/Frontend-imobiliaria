import { Component, OnInit } from '@angular/core';
import { BlocosCaroucelComponent } from "../blocos-caroucel/blocos-caroucel.component";
import { ImovelService } from '../../../service/produto/imovel.service';
import { Imovel } from '../../../interface/produto/imovel';
import { Pageable } from '../../../interface/produto/pageable';
import { PesquisaFiltradaImovel } from '../../../interface/produto/pesquisaFiltradaImovel';

@Component({
    selector: 'app-destaques',
    imports: [BlocosCaroucelComponent],
    templateUrl: './destaques.component.html',
    styleUrl: './destaques.component.css'
})
export class DestaquesComponent implements OnInit{

  pageable!: Pageable<Imovel>
  pesquisaFiltradaImovel: PesquisaFiltradaImovel = new PesquisaFiltradaImovel();
  constructor(private imovelService : ImovelService){

  }
  ngOnInit(): void {
    this.pesquisaFiltrada();
  }

  pesquisaFiltrada() {
    this.pesquisaFiltradaImovel.imvDestaque = true;
    this.imovelService.pesquisaFiltrada(this.pesquisaFiltradaImovel).subscribe({
      next:(res)=>{
        this.pageable = res;
      },error: (err) => {
        console.log(err)
      }
    })
  }

}
