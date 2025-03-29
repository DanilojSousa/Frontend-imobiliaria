import { Component } from '@angular/core';
import { CardsComponent } from "./cards/cards.component";
import { PesquisaComponent } from "./pesquisa/pesquisa.component";
import { OportunidadeComponent } from "./oportunidade/oportunidade.component";
import { DestaquesComponent } from "./destaques/destaques.component";
import { SobreComponent } from "./sobre/sobre.component";
import { ContatoComponent } from "./contato/contato.component";

@Component({
    selector: 'app-inicio',
    imports: [CardsComponent, PesquisaComponent, OportunidadeComponent, DestaquesComponent, SobreComponent, ContatoComponent],
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.css'
})
export class InicioComponent {
  
}
