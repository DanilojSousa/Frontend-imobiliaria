
import { Component, inject, LOCALE_ID, OnInit } from '@angular/core';
import { MatTableModule} from '@angular/material/table'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import localePt from '@angular/common/locales/pt';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SessaoService } from '../../../service/sessao/sessao.service';
import { MatDialog } from '@angular/material/dialog';

registerLocaleData(localePt, 'pt-BR');

@Component({
    selector: 'app-sistema',
    imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule,
        MatTableModule, MatPaginatorModule, CommonModule, MatIcon, MatSlideToggleModule, MatButtonModule],
    providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
    templateUrl: './sistema.component.html',
    styleUrl: './sistema.component.css'
})
export class SistemaComponent {

  readonly dialog = inject(MatDialog);
  isLoadingResults = false;

  constructor(private route: Router){}

  navegar(valor: string) {
    this.route.navigate([valor]);
  }
}
