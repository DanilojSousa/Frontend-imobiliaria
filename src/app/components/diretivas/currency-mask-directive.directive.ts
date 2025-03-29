import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appCurrencyMask]',
  standalone: true
})
export class CurrencyMaskDirectiveDirective {

  @Output() valueChange = new EventEmitter<number>(); // Emite o valor numérico puro ao perder o foco
  private numericValue: number | null = null; // Armazena o valor numérico enquanto o usuário digita

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(): void {
    const inputElement = this.el.nativeElement;

    // Remove caracteres que não sejam números
    let value = inputElement.value.replace(/[^\d]/g, '');

    if (value) {
      // Divide o valor por 100 para adicionar as casas decimais
      this.numericValue = parseFloat(value) / 100;

      // Formata o valor para exibição
      inputElement.value = this.formatCurrency(this.numericValue.toFixed(2));
    } else {
      this.numericValue = null;
      inputElement.value = '';
    }
  }

  @HostListener('blur')
  onBlur(): void {
    // Emite o valor numérico puro quando o campo perde o foco
    this.valueChange.emit(this.numericValue || 0);
  }

  @HostListener('focus')
  onFocus(): void {
    const inputElement = this.el.nativeElement;
    if (this.numericValue !== null) {
      // Remove a formatação ao ganhar foco
      inputElement.value = this.numericValue.toString().replace('.', ',');
    }
  }

  private formatCurrency(value: string): string {
    const parts = value.split('.'); // Divide o número em inteiro e decimal
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona pontos nos milhares
    const decimalPart = parts[1] || '00'; // Garante duas casas decimais

    return `R$ ${integerPart},${decimalPart}`;
  }
}

