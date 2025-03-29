import { EmpresaDTO } from './../../../../interface/geral/empresa';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mensagem } from '../../../../utils/mensagem';
import { MatButtonModule } from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Usuario } from '../../../../interface/acesso/usuario';
import { UsuarioService } from '../../../../service/acesso/usuario.service';
import { MatSelectModule } from '@angular/material/select';
import { forkJoin } from 'rxjs';
import { Situacao } from '../../../../interface/pessoa/situacao';
import { EmpresaService } from '../../../../service/geral/empresa.service';
import { SituacaoService } from '../../../../service/pessoa/situacao.service';
import { EnderecoDTO } from '../../../../interface/pessoa/endereco';
import { EnderecoService } from '../../../../service/pessoa/endereco.service';
import { Util } from '../../../../utils/util';

@Component({
    selector: 'app-cadastro-usuario',
    imports: [MatButtonModule, MatStepperModule, FormsModule,
        ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule,
        MatCheckboxModule, MatSelectModule],
    templateUrl: './cadastro-usuario.component.html',
    styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  listaEmpresa: EmpresaDTO[] = [];
  listaSituacao: Situacao[] = [];
  listaEndereco: EnderecoDTO[] = [];
  valida = false;
  hide = true;
  hide2 = true;
  senha!: string;
  confirmarSenha!: string;
  cpfInvalido = false;
  emailInvlaido = false;
  validaSenha = false;
  validaSenha2 = false;

  constructor(private usuarioService: UsuarioService,
              private route: ActivatedRoute,
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
      empresa: this.empresaService.getAll(),
      situacao: this.situacaoService.getAll(),
      endereco: this.enderecoService.getAll(),
    }).subscribe({
      next: (result) => {
        this.listaEmpresa = result.empresa;
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
    const usrCodigo =  this.route.snapshot.paramMap.get('usrCodigo');
    if(usrCodigo != null){
      this.usuarioService.getById(usrCodigo).subscribe({
        next:(res)=>{
          this.usuario = res;
          this.sicronizarListas();
        },error:(err)=>{
          this.mensagemService.error("Erro ao carregar o usuário")
        }
      })
    }
  }

  sicronizarListas(){
    const empresa = this.listaEmpresa.find(empresa => empresa.empCodigo === this.usuario.empresa.empCodigo);
    const situacao = this.listaSituacao.find(situacao => situacao.stcCodigo === this.usuario.situacao.stcCodigo);
    const endereco = this.listaEndereco.find(endereco => endereco.endCodigo === this.usuario.endereco.endCodigo);
    // Atualiza as propriedades do objeto imovel
    if (empresa) this.usuario.empresa = empresa;
    if (situacao) this.usuario.situacao = situacao;
    if (endereco) this.usuario.endereco = endereco;
  }

  voltar(){
    this.router.navigate(['detalhe/usuario'])
  }
  salvar(){;
    if(this.validaCampos()){
      return;
    }
    if(this.senha != undefined) this.usuario.usrPassword = this.senha;
    this.usuario.usrCpf = this.usuario.usrCpf.replace(/\D/g, '');
    this.usuario.contato.cntWhatsapp = this.usuario.contato.cntWhatsapp.replace(/[^0-9]/g, '');
    this.usuarioService.salvar(this.usuario).subscribe({
      next:(res)=>{
        this.usuario = res;
        this.mensagemService.sucesso("Usuário salvo com sucesso");
      }, error:(err)=>{
        this.mensagemService.error("Erro ao salvar o Usuário");
        console.log("Erro ao salvar o Usuário: "+ err);
      }
    });
  }
  validaCampos(): Boolean{
    if(this.usuario.usrCodigo === undefined && this.senha != this.confirmarSenha){
      this.validaSenha2 = true;
      return true;
    }
    if(this.usuario.usrNome === undefined || this.usuario.usrNome.length === 0
      && this.usuario.situacao.stcCodigo === undefined
      && this.usuario.endereco.endCodigo === undefined
      && this.usuario.email.emaEmail === undefined || this.usuario.email.emaEmail.length === 0
      && this.usuario.contato.cntWhatsapp === undefined || this.usuario.contato.cntWhatsapp.length === 0
      && this.usuario.usrLogin === undefined || this.usuario.usrLogin.length === 0
      && (this.usuario.usrCodigo === undefined && (this.senha === undefined || this.senha.length === 0))
      && (this.usuario.usrCodigo === undefined && (this.confirmarSenha === undefined || this.confirmarSenha.length === 0))
      && this.usuario.empresa.empCodigo === undefined
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
    this.usuario.contato.cntWhatsapp = this.formatPhone(value);
  }

  formatPhone(phone: string): string {
    phone = phone.replace(/\D/g, '');
    if (phone.length <= 10) {
      return phone.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      return phone.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  }
  clickEvent(senha: number) {
    if(senha === 1){
      this.hide = !this.hide;
    }else{
      this.hide2 = !this.hide2;
    }
  }
  validarSenha(senha: number) {
    if(this.senha != undefined && this.confirmarSenha != undefined && this.senha != this.confirmarSenha){
      if(senha === 1){
        this.validaSenha = true;
        this.validaSenha2 = false;
      }else{
        this.validaSenha = false;
        this.validaSenha2 = true;
      }
    }else{
      this.validaSenha = false;
        this.validaSenha2 = false;
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
          if (image.width <= 150 && image.height <= 150) {
            this.usuario.usrImagem = base64String;
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
    if(this.usuario.usrImagem != undefined && this.usuario.usrImagem != ''){
      return Util.mostraImagemString(this.usuario.usrImagem);
    }
    return '';
  }

  checarCpf(cpf: string): void {
    if(cpf.length === 14){
      this.cpfInvalido = !this.validarCpf(cpf);
    }
    cpf = cpf.replace(/\D/g, '');

    // Aplica a formatação conforme o usuário digita
    if (cpf.length > 3) {
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    }
    if (cpf.length > 6) {
      cpf = cpf.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    }
    if (cpf.length > 9) {
      cpf = cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    }

    // Atualiza o modelo
    this.usuario.usrCpf = cpf
  }

  validarCpf(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false; // Verifica se tem 11 dígitos e não é uma repetição
    }

    let soma = 0, resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    return resto === parseInt(cpf.substring(10, 11));
  }
  checarEmail(email: string){
    this.emailInvlaido = !email.includes("@");
  }
  deletePhoto(){
    this.usuario.usrImagem = '';
  }
}
