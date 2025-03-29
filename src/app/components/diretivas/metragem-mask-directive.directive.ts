import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appMetragemMask]',
  standalone: true
})
export class MetragemMaskDirective {
    @Output() valueChange = new EventEmitter<number>(); // Emite o valor numérico puro

    private numericValue: number | null = null;
  
    constructor(private el: ElementRef) {}
  
    @HostListener('input')
    onInputChange(): void {
      const inputElement = this.el.nativeElement;
  
      // Remove caracteres que não sejam números
      let value = inputElement.value.replace(/[^\d]/g, '');
  
      if (value) {
        // Divide o valor por 100 para adicionar as casas decimais
        this.numericValue = parseFloat(value) / 100;
  
        // Formata o valor para exibição
        inputElement.value = this.formatMetric(this.numericValue.toFixed(2));
      } else {
        this.numericValue = null;
        inputElement.value = '';
      }
    }
  
    @HostListener('blur')
    onBlur(): void {
      // Emite o valor numérico quando o campo perde o foco
      this.valueChange.emit(this.numericValue!);
    }
  
    private formatMetric(value: string): string {
      const parts = value.split('.');
      const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      const decimalPart = parts[1] || '00';
  
      return `${integerPart},${decimalPart} m²`;
    }
}