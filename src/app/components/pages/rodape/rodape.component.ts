import { Component, OnInit } from '@angular/core';
import { EmpresaDTO } from '../../interface/geral/empresa';
import { Util } from '../../utils/util';
import {MatIconModule} from '@angular/material/icon';
import { timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '../../service/geral/empresa.service';
import { SessaoService } from '../../service/sessao/sessao.service';

@Component({
    selector: 'app-rodape',
    imports: [MatIconModule],
    templateUrl: './rodape.component.html',
    styleUrl: './rodape.component.css'
})
export class RodapeComponent implements OnInit {

  empresa: EmpresaDTO = new EmpresaDTO();
  copiado = false;
  constructor(private empresaService: EmpresaService,
              private router: Router,
              private route: ActivatedRoute,
              private sessaoService: SessaoService){}

  ngOnInit(): void {
    this.carregaEmpresa();
    this.route.queryParams.subscribe(params => {
      const sectionId = params['section'];
      if (sectionId) {
        setTimeout(() => {
          this.scrollToSection(sectionId);
        }, 100); // Aguarde 100ms para garantir que o DOM está renderizado
      }
    });
  }

  carregaEmpresa(){
    this.empresaService.selecionarAtivo().subscribe({
      next:(res)=>{
        this.empresa = res;
      }
    })
  }

  mostraImagem(empCodigo: number): string{
      return Util.mostraImagemEmpresa(empCodigo);
  }

  formatarTelefone(){
    if(this.empresa.contato?.cntWhatsapp != null){
      const match = this.empresa.contato?.cntWhatsapp.match(/^(\d{2})(\d{4,5})(\d{4})$/);
      return match ? `(${match[1]}) ${match[2]}-${match[3]}` : this.empresa.contato?.cntWhatsapp;
    }
    return '';
  }
  copiarEmail(){
    this.copiado = true;
    navigator.clipboard.writeText(this.empresa.email.emaEmail);
    timer(5000).subscribe(() => {
      this.copiado = false;
    });
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      this.smoothScroll(element, 1000); // 1000ms (1 segundo) para ajustar a velocidade
    }
  }
  smoothScroll(target: HTMLElement, duration: number) {
    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top;
    const startTime = performance.now();
  
    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const run = this.ease(elapsedTime, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (elapsedTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    };
  
    requestAnimationFrame(animateScroll);
  }
  
  ease(t: number, b: number, c: number, d: number) {
    // Easing function for smoother scrolling
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  formataWatssap(): string{
    return "https://api.whatsapp.com/send?phone=55"+this.empresa.contato?.cntWhatsapp+"&text=Olá, preciso de informações.";
  }

  formatCNPJ(): string {
    if(this.empresa.empCnpj != null){
      const cnpj = this.empresa.empCnpj.replace(/\D/g, '');
      return cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5'
      );
    }
    return '';
  }
  acessoSistema(){
    this.router.navigate(['acesso/sistema'])
  }
  acessoHome(id: string){
    this.router.navigate(["home"], { queryParams: { section: id } })
  }
}
