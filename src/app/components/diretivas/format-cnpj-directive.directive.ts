import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFormatCnpjDirective]',
  standalone: true
})
export class FormatCnpjDirectiveDirective {
  
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any): void {
    const input = this.el.nativeElement;
    let value: string = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

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

    // Atualiza o valor formatado no campo
    input.value = value;
  }

}
