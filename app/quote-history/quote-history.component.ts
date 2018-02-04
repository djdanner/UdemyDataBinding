import { Component, Input, OnInit } from '@angular/core';

import { cmcJasonResponseItem } from '../shared/cmc-jason-response-item';

@Component({
  selector: 'app-quote-history',
  templateUrl: './quote-history.component.html',
  styleUrls: ['./quote-history.component.css']
})
export class QuoteHistoryComponent implements OnInit {
  @Input('quoteChangeEvent')
    myQuoteHistory: cmcJasonResponseItem[][];

    oneQuoteHistoryEntry: cmcJasonResponseItem[] = cmcJasonResponseItem[0];

  constructor() { }

  ngOnInit() {
  }

}
