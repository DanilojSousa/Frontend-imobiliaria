import { SessaoService } from './../../../service/sessao/sessao.service';
import { Component, inject, OnInit } from '@angular/core';
import { EmailService } from '../../../service/geral/email.service';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Email } from '../../../interface/geral/email';

@Component({
    selector: 'app-contato',
    imports: [MatButtonModule, FormsModule, CommonModule, MatSnackBarModule],
    templateUrl: './contato.component.html',
    styleUrl: './contato.component.css'
})
export class ContatoComponent implements OnInit{

  private _snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  formattedPhone!: string;
  valida: boolean = false;
  constructor(private emailService: EmailService,
              private sessaoService: SessaoService){}
  ngOnInit(): void {
    
  }

  onEmail(myForm: NgForm){
    if(this.validarFormulario(myForm)){
      const email = new Email();
      email.evmAssunto = myForm.value.assunto;
      email.evmConteudo = myForm.value.mensagem +"<br/><br/>"+myForm.value.nome+"<br/> Telefone: "+this.formattedPhone+"<br/> Email: "+myForm.value.email
      this.emailService.enviarEmail(email).subscribe({
        next:(res) =>{
          this.openSnackBar("Email enviado com sucesso", "sucesso");
        },error:(er)=>{
          this.openSnackBar("Erro ao enviar o e-mail","error");
        }
      })
    }
  }
  onWhatsapp(myForm: NgForm){
    if(this.validarFormulario(myForm)){
      const url =  "https://api.whatsapp.com/send?phone=55"+this.sessaoService.getEmpresa().contato.cntWhatsapp+"&text="+myForm.value.mensagem;
      window.open(url, '_blank')
    }
  }

  validarFormulario(myForm: NgForm): boolean{
    if(myForm.value.mensagem === ""
       || myForm.value.assunto === ""
       || myForm.value.email === ""
       || myForm.value.telfone === ""
       || myForm.value.nome === ""
    ){
      this.valida = true;
      return false;
    }
    this.valida = false;
    return true;
  }

  openSnackBar(text: string, tipo: string) {
    this._snackBar.open(text, 'X',{
      duration: 3000,
      panelClass: [tipo],
    });
  }
  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.formattedPhone = this.formatPhone(value);
  }

  formatPhone(phone: string): string {
    phone = phone.replace(/\D/g, '');
    if (phone.length <= 10) {
      return phone.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      return phone.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  }

}
