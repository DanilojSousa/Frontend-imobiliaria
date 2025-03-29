import { Component, Inject, inject, model, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
    selector: 'app-deletar',
    imports: [MatDialogModule],
    templateUrl: './deletar.component.html',
    styleUrl: './deletar.component.css'
})
export class DeletarComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<DeletarComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: { valor: string } ){}

  ngOnInit(): void {
    
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
