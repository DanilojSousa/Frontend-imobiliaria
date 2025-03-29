import { Component, OnInit } from '@angular/core';
import { EmpresaDTO } from './../../../../interface/geral/empresa';
import { ActivatedRoute, Router } from '@angular/router';
import { Mensagem } from '../../../../utils/mensagem';
import { MatButtonModule } from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { forkJoin } from 'rxjs';
import { Situacao } from '../../../../interface/pessoa/situacao';
import { EmpresaService } from '../../../../service/geral/empresa.service';
import { SituacaoService } from '../../../../service/pessoa/situacao.service';
import { EnderecoDTO } from '../../../../interface/pessoa/endereco';
import { EnderecoService } from '../../../../service/pessoa/endereco.service';
import { Util } from '../../../../utils/util';

@Component({
    selector: 'app-cadastro-empresa',
    imports: [MatButtonModule, MatStepperModule, FormsModule,
        ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule,
        MatCheckboxModule, MatSelectModule],
    templateUrl: './cadastro-empresa.component.html',
    styleUrl: './cadastro-empresa.component.css'
})
export class CadastroEmpresaComponent implements OnInit {

  empresa: EmpresaDTO = new EmpresaDTO();
  listaSituacao: Situacao[] = [];
  listaEndereco: EnderecoDTO[] = [];
  valida = false;
  emailInvlaido = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private mensagemService: Mensagem,
              private empresaService: EmpresaService,
              private situacaoService: SituacaoService,
              private enderecoService: EnderecoService){}

  ngOnInit(): void {
    this.carregaListas();
  }
  carregaListas() {
    forkJoin({
      situacao: this.situacaoService.getAll(),
      endereco: this.enderecoService.getAll(),
    }).subscribe({
      next: (result) => {
        this.listaSituacao = result.situacao;
        this.listaEndereco = result.endereco;
        this.detalhe();
      },
      error: (err) => {
        console.error('Erro ao carregar dados iniciais:', err);
      }
    });
  }

  detalhe() {
    const empCodigo =  this.route.snapshot.paramMap.get('empCodigo');
    if(empCodigo != null){
      this.empresaService.getById(empCodigo).subscribe({
        next:(res)=>{
          this.empresa = res;
          this.sicronizarListas();
        },error:(err)=>{
          this.mensagemService.error("Erro ao carregar a empresa")
        }
      })
    }
  }

  sicronizarListas(){
    const situacao = this.listaSituacao.find(situacao => situacao.stcCodigo === this.empresa.situacao.stcCodigo);
    const endereco = this.listaEndereco.find(endereco => endereco.endCodigo === this.empresa.endereco.endCodigo);
    // Atualiza as propriedades do objeto imovel
    if (situacao) this.empresa.situacao = situacao;
    if (endereco) this.empresa.endereco = endereco;
  }

  voltar(){
    this.router.navigate(['detalhe/empresa'])
  }
  salvar(){;
    if(this.validaCampos()){
      return;
    }
    this.empresa.empCnpj = this.empresa.empCnpj .replace(/\D/g, '');
    this.empresa.contato.cntWhatsapp = this.empresa.contato.cntWhatsapp.replace(/[^0-9]/g, '');
    console.log(this.empresa)
    this.empresaService.salvar(this.empresa).subscribe({
      next:(res)=>{
        this.empresa = res;
        this.mensagemService.sucesso("Empresa salvo com sucesso");
      }, error:(err)=>{
        this.mensagemService.error("Erro ao salvar a empresa");
        console.log("Erro ao salvar a empresa: "+ err);
      }
    });
  }
  validaCampos(): Boolean{
    if(this.empresa.empRazaoSocial === undefined || this.empresa.empRazaoSocial.length === 0
      && this.empresa.situacao.stcCodigo === undefined
      && this.empresa.email.emaEmail === undefined || this.empresa.email.emaEmail.length === 0
      && this.empresa.endereco.endCodigo === undefined
      && this.empresa.contato.cntWhatsapp === undefined || this.empresa.contato.cntWhatsapp.length === 0
      && this.empresa.empCnpj === undefined || this.empresa.empCnpj.length === 0
    ){
      this.valida = true;
      return true;
    }
    this.valida = false;
    return false;
  }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.empresa.contato.cntWhatsapp = this.formatPhone(value);
  }

  formatPhone(phone: string): string {
    phone = phone.replace(/\D/g, '');
    if (phone.length <= 10) {
      return phone.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      return phone.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }
    if (file.type === 'image/png') {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1]; // Remove o prefixo "data:image/png;base64,"
        const image = new Image();
        image.src = `data:image/png;base64,${base64String}`;
        image.onload = () => {
          if (image.width <= 300 && image.height <= 300) {
            this.empresa.empLogo = base64String;
          } else {
            this.mensagemService.atencao(`Arquivo ${file.name} inválido: dimensões maiores que 150x150.`);
            console.error(`Arquivo ${file.name} inválido: dimensões maiores que 150x150.`);
          }
        };
      };
      reader.readAsDataURL(file);
    } else {
      this.mensagemService.atencao(`Arquivo ${file.name} inválido: não é uma imagem PNG.`);
      console.error(`Arquivo ${file.name} inválido: não é uma imagem PNG.`);
    }
  }

  mostrarImagens(): string{
    if(this.empresa.empLogo != undefined && this.empresa.empLogo != ''){
      return Util.mostraImagemString(this.empresa.empLogo);
    }
    return '';
  }

  checarEmail(email: string){
    this.emailInvlaido = !email.includes("@");
  }
  deletePhoto(){
    this.empresa.empLogo = '';
  }

  formataCnpj(cnpj: string){
    let value: string = cnpj.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Limita o tamanho a 14 caracteres (tamanho do CNPJ sem formatação)
    if (value.length > 14) {
      value = value.substring(0, 14);
    }

    // Aplica a máscara de CNPJ
    if (value.length <= 2) {
      value = value;
    } else if (value.length <= 5) {
      value = value.replace(/(\d{2})(\d+)/, '$1.$2');
    } else if (value.length <= 8) {
      value = value.replace(/(\d{2})(\d{3})(\d+)/, '$1.$2.$3');
    } else if (value.length <= 12) {
      value = value.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3/$4');
    } else {
      value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    this.empresa.empCnpj = value;
  }
}
