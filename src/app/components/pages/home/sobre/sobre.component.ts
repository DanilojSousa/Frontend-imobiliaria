import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sobre',
    imports: [CommonModule],
    templateUrl: './sobre.component.html',
    styleUrl: './sobre.component.css'
})
export class SobreComponent implements OnInit {

  mostraTexto = false;
  constructor(){}

  ngOnInit(): void {
    
  }
  mostrarTexto(){
    this.mostraTexto = !this.mostraTexto;
  }

  

}
