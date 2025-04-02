import { SessaoService } from './../../../service/sessao/sessao.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaDTO } from '../../../interface/geral/empresa';
import { Util } from '../../../utils/util';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoginService } from '../../../service/acesso/login.service';
import { Login } from '../../../interface/acesso/login';
import { Mensagem } from '../../../utils/mensagem';
import { Config } from '../../../interface/acesso/config';
import { UsuarioAlterarSenha } from '../../../interface/acesso/usuarioAlterarSenha';
import { UsuarioService } from '../../../service/acesso/usuario.service';
import { EmailService } from '../../../service/geral/email.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    providers: [LoginService],
    imports: [FormsModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {

  config: Config = new Config();
  loginForm: FormGroup
  empresa: EmpresaDTO = new EmpresaDTO();
  usuarioAlterarSenha: UsuarioAlterarSenha = new UsuarioAlterarSenha();
  acesso: Login = new Login();
  carregaPagina = false;
  primeiraSenha!: string;
  segundaSenha!: string;
  cpfEmail!: string;
  emailForm: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private sessaoService: SessaoService,
              private loginService: LoginService,
              private mensagem: Mensagem,
              private usuarioService: UsuarioService,
              private emailService: EmailService,
              private dialogRef: MatDialogRef<LoginComponent>,
              private fb: FormBuilder){
                this.loginForm = this.fb.group({
                  email: ['', [Validators.required, this.emailValidator]],
                  login: [''],
                  senha: [''],
                  confirmarSenha: ['']
                });
              }

  ngOnInit(): void {
    this.carregaPagina = false;
    this.empresa = this.sessaoService.getEmpresa();
    this.mudarSenha();
    this.carregaPagina = true;
  }

  enviarEmail(){
    this.atualizaConfig(false, true, 'Enviar','RECUPERAR SENHA');
  }

  mudarSenha(){
    const id =  Util.decodeTime(this.route.snapshot.paramMap.get('id')!);
    if(id != undefined && id != 'Tempo expirou' && id != ''){
          this.usuarioAlterarSenha.usrCodigo = Number(id);
          this.atualizaConfig(true, false, 'Confirmar Senha','TROCAR DE SENHA');
          this.carregaPagina = true;
          return
    }else if(id === 'Tempo expirou'){
      this.mensagem.atencao(id);
    }
    this.atualizaConfig(false, false, 'Entrar','BEM VINDO');
  }

  voltar(){
    this.atualizaConfig(false, false, 'Entrar','BEM VINDO');
    this.sessaoService.validaLogin();
  }

  mostrarImagem(): string{
    if(this.empresa.empLogo != undefined){
      return Util.mostraImagemString(this.empresa.empLogo);
    }
    return '';
  }

  onSubmit(){
    if(!this.config.novaSenha && !this.config.recuperarSenha){
      this.acesso.login = this.loginForm.value.login;
      this.acesso.password = this.loginForm.value.senha;
      this.loginService.entrar(this.acesso).subscribe({
        next: () =>{
          this.mensagem.sucesso("Login efetuado com sucesso");
          this.close();
        },
        error: (e) =>{
          this.mensagem.error("Favor validar a senha");
        }
      });
    }else if(this.config.novaSenha){
      if(this.loginForm.value.senha == this.loginForm.value.confirmarSenha){
        this.usuarioAlterarSenha.usrPassword = this.loginForm.value.senha;
      }else{
        this.mensagem.atencao("Senha não confere");
        return
      }
      this.usuarioService.alteraSenha(this.usuarioAlterarSenha).subscribe({
        next:()=>{
          this.mensagem.sucesso("Senha alterado com sucesso");
          this.voltar();
        }
      })
    }else if(this.config.recuperarSenha){
      this.emailService.esqueceuSenha(this.loginForm.value.email).subscribe({
        next: (res) =>{
          this.voltar();
          this.mensagem.sucesso("Foi enviado um e-mail de autenticação")
        }
      })
    }
  }

  atualizaConfig(novaSenha:boolean, recuperarSenha:boolean, button: string, titulo: string){
    this.config = {
      novaSenha: novaSenha,
      recuperarSenha: recuperarSenha,
      button: button,
      titulo: titulo
    }
  }

  emailValidator(email: string): { [key: string]: any } | null {
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegexp.test(email) ? null : { invalidEmail: true };
  }
  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
  close(){
    this.dialogRef.close()
  }
  closeSair(){
    this.dialogRef.close()
    this.router.navigate(['home'])
  }
}
