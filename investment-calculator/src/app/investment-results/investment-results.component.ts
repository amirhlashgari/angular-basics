import { Component, inject, input, Input } from '@angular/core';

import { InvestmentOutput } from '../investment-input.model';
import { CurrencyPipe } from '@angular/common';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  // @Input() results?: InvestmentOutput[];
  private investmentService = inject(InvestmentService);
  
  get results() {
    return this.investmentService.resultsData;
  }
}
