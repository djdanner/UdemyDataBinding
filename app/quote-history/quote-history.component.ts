import { Component, Input, OnInit } from '@angular/core';

import { cmcJasonResponseItem } from '../shared/cmc-jason-response-item';

@Component({
  selector: 'app-quote-history',
  templateUrl: './quote-history.component.html',
  styleUrls: ['./quote-history.component.css']
})
export class QuoteHistoryComponent implements OnInit {
  @Input()
  allQuoteHistory: cmcJasonResponseItem[][];

  @Input()
  adaQuoteHistory: cmcJasonResponseItem[];

  //oneQuoteHistoryEntry: cmcJasonResponseItem[] = this.allQuoteHistory[0];

  constructor() { }

  ngOnInit() {
  }

}
