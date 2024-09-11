import { ChangeDetectionStrategy, Component, computed, HostListener, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown)': 'handleKeyobardEvent($event)',
  },
})
export class CalculatorComponent {

  private _calculatorService = inject(CalculatorService);

  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  public resultText = computed(() => this._calculatorService.resultText());
  public subResultText = computed(() => this._calculatorService.subResultText());
  public lastOperator = computed(() => this._calculatorService.lastOperator());

  handleClick(key: string) {
    this._calculatorService.constructNumber(key)
  }


  handleKeyobardEvent(event: KeyboardEvent) {

    const keyEquivalents: Record<string, string> = {
      Enter: '=',
      Escape: 'C',
      Clear: 'C',
      '*': 'x',
      '/': '÷',
    }
    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorButtons().forEach(button => {
      button.keyBoardPressedStyle(key)
    });
  }




  /**
   * No es la forma recomendada
   * @param event
   */
  // @HostListener('document:keydown', ['$event'])
  // handleKeyobardEvent(event: KeyboardEvent) {
  //   this.handleClick(event.key);
  // }


}
