import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs/Rx';
import { cmcJasonResponseItem } from '../shared/cmc-jason-response-item';

@Component({
  selector: 'app-stockquote',
  templateUrl: './stockquote.component.html',
  styleUrls: ['./stockquote.component.css']
})
export class StockquoteComponent implements OnInit {

  cmcUrls = [
    // The first call gets the Top 10 currencies by Market Capitalization.
    // The other ones get a specific crypto currency.
    "https://api.coinmarketcap.com/v1/ticker/?limit=10",
    "https://api.coinmarketcap.com/v1/ticker/bitcoin/",
    "https://api.coinmarketcap.com/v1/ticker/ethereum/"
  ];

  quoteList: cmcJasonResponseItem[] = [];
  fullResponse: any;
  ethPriceUsd: number = 0;

  timerSubscription: any;
  timer1Subscription: any;

  currentDate: any;
  currentMinutes: number;


  constructor(private http: HttpClient) { }

  checkForSynchIntervalAndUnsubscribeToTimer(){
    console.log("Ticking!!!");
    this.currentMinutes = this.currentDate.getMinutes();
    if ((this.currentMinutes == 1) || ((this.currentMinutes % 6) == 0)){
      // stop the timer.  we should also exit the while lopo.
      this.timer1Subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.getQuotesAndProccesThem();

    // The cmc data is updated every 5 minutes, starting on the Hour
    // (i.e., at 0, 5, 10 minutes, etc.).  But there is a 1 minute delay or so
    // before that data is actually available via the web api, so it really
    // changes at 1, 6, 11, etc., so synch-up the starting of our 5 minute timer
    // with one of those intervals.
    this.currentDate = new Date();
    this.currentMinutes = this.currentDate.getMinutes();
    console.log("Minutes = " + this.currentMinutes);

    console.log("Before loop.");
    console.log(((this.currentMinutes != 1) && ((this.currentMinutes % 6) != 0)));
    while ((this.currentMinutes != 1) && ((this.currentMinutes % 6) != 0))
    {
      console.log("In while.");
      console.log("Minutes = " + this.currentMinutes);
      let timer1 = Observable.timer(0, (1000));
      this.timer1Subscription = timer1.subscribe(t1 => {
        this.checkForSynchIntervalAndUnsubscribeToTimer();(t1);
        }
      );
    }
    console.log("After loop.");

    // Start a timer to periodicallyt call the specified function.
    // this.getQuotesAndProccesThem();
    // param1 = delay the start of this timer in ms.
    // param2 = period of timer in ms
    //          here period = 5 min
    let timer = Observable.timer(0, (1000 * 60 * 5));
    this.timerSubscription = timer.subscribe(t => {
      this.getQuotesAndProccesThem();(t);
      }
    );
  }

  processQuotes(){
    var j = 0;

    for (var i = 0; i <= 4 ; i++){

      if ( (i==0) || (i==1) || (i==2) || (i==4) ){
        // console.log(i, j);
        var tempItem = new cmcJasonResponseItem();
        // var tempItem: any; // = new cmcJasonResponseItem();

        tempItem.name               = this.fullResponse[i].name;
        tempItem.symbol             = this.fullResponse[i].symbol;
        tempItem.price_usd          = this.fullResponse[i].price_usd;
        tempItem.percent_change_24h = this.fullResponse[i].percent_change_24h;
        tempItem.last_updated       = this.fullResponse[i].last_updated;

        this.quoteList[j] = tempItem;
        j++;
      }
      this.ethPriceUsd = this.fullResponse[1].price_usd;
    }

    // console.log(this.quoteList);
  }

  // I think that all processing of the quote data must be done in the context
  // this function, because the get operation is asynchronous, so you
  // don't know when it will return the data.
  getQuotesAndProccesThem(){
    // Note that this.http is created in the Constructor()
    console.log("Clicked.");
    this.http.get(this.cmcUrls[0]).subscribe(response => {

      this.fullResponse = response;

      // console.log(response);
      // console.log(this.fullResponse[0]);
      this.processQuotes();
    });
  }

}
// This WORKS 4 !!!
// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
// import { Component, OnInit } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClient } from '@angular/common/http';
//
// import { cmcJasonResponseItem } from '../shared/cmc-jason-response-item';
//
// @Component({
//   selector: 'app-stockquote',
//   templateUrl: './stockquote.component.html',
//   styleUrls: ['./stockquote.component.css']
// })
// export class StockquoteComponent implements OnInit {
//
//   cmcUrls = [
//     // The first call gets the Top 10 currencies by Market Capitalization.
//     // The other ones get a specific crypto currency.
//     "https://api.coinmarketcap.com/v1/ticker/?limit=10",
//     "https://api.coinmarketcap.com/v1/ticker/bitcoin/",
//     "https://api.coinmarketcap.com/v1/ticker/ethereum/"
//   ];
//
//   //     {
//   //         "id": "bitcoin",
//   //         "name": "Bitcoin",
//   //         "symbol": "BTC",
//   //         "rank": "1",
//   //         "price_usd": "573.137",
//   //         "price_btc": "1.0",
//   //         "24h_volume_usd": "72855700.0",
//   //         "market_cap_usd": "9080883500.0",
//   //         "available_supply": "15844176.0",
//   //         "total_supply": "15844176.0",
//   //         "percent_change_1h": "0.04",
//   //         "percent_change_24h": "-0.3",
//   //         "percent_change_7d": "-0.57",
//   //         "last_updated": "1472762067"
//
//   //quoteList : cmcJasonResponseItem [];
//
//     // id:                 string;  // ex:
//     // name:               string;  // ex:
//     // symbol:             string;  // ex:
//     // rank:               string;  // ex:
//     // price_usd:          string;  // ex:
//     // price_btc:          string;  // ex:
//     // _24h_volume_usd:    string;   // I added an underscore - you can't begin a
//     //                             // symbol with a number, but the JSON does.
//     //                             // Don't know how to handle this.
//     // market_cap_usd:             string;  // ex:
//     // available_supply:   string;  // ex:
//     // total_supply:       string;  // ex:
//     // percent_change_1h:  string;  // ex:
//     // percent_change_24h: string;  // ex:
//     // percent_change_7d:  string;  // ex:
//     // last_updated:       string;  // ex:
//
//   btcQuote: any;
//   ethQuote: any;
//   xrpQuote: any;
//   adaQuote: any;
//
//   aaaTest: string;
//
//   // quoteList: any[];
//   quoteList: cmcJasonResponseItem[] = [];
//
//   fullResponse: any;
//
//   constructor(private http: HttpClient) { }
//
//   ngOnInit() {
//     this.getQuotesAndProccesThem();
//   }
//
//   processQuotes(){
//       // console.log(this.ethQuote);
//       var j = 0;
//
//       for (var i = 0; i <= 4 ; i++){
//
//         if ( (i==0) || (i==1) || (i==2) || (i==4) ){
//           // console.log(i, j);
//           var tempItem = new cmcJasonResponseItem();
//
//           tempItem.name               = this.fullResponse[i].name;
//           tempItem.symbol             = this.fullResponse[i].symbol;
//           tempItem.price_usd          = this.fullResponse[i].price_usd;
//           tempItem.percent_change_24h = this.fullResponse[i].percent_change_24h;
//           tempItem.last_updated       = this.fullResponse[i].last_updated;
//
//           this.quoteList[j] = tempItem;
//           j++;
//         }
//       }
//
//       console.log(this.quoteList);
//
//       // tempItem.name               = this.fullResponse[1].name;
//       // tempItem.symbol             = this.fullResponse[1].symbol;
//       // tempItem.price_usd          = this.fullResponse[1].price_usd;
//       // tempItem.percent_change_24h = this.fullResponse[1].percent_change_24h;
//       // tempItem.last_updated       = this.fullResponse[1].last_updated;
//       //
//       // this.quoteList[0] = tempItem;
//       //
//       // this.aaaTest = this.quoteList[0].name;
//
//       //this.quoteList[0].name = this.fullResponse[1].name;
//       // this.quoteList[1] = this.fullResponse[2];
//       // this.quoteList[2] = this.fullResponse[4];
//       // this.quoteList[3] = this.fullResponse[0];
//   }
//
//   // I think that all processing of the quote data must be done in the context
//   // this function, because the get operation is asynchronous, so you
//   // don't know when it will return the data.
//   getQuotesAndProccesThem(){
//     // Note that this.http is created in the Constructor()
//     console.log("Clicked.");
//     this.http.get(this.cmcUrls[0]).subscribe(response => {
//
//       this.btcQuote = response[0];
//       this.ethQuote = response[1];
//       this.xrpQuote = response[2];
//       this.adaQuote = response[4];
//
//       this.fullResponse = response;
//
//       // console.log(response);
//       // console.log(this.fullResponse[0]);
//       this.processQuotes();
//     });
//   }
//
// }
// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww


// This WORKS 3 !!!
// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
// import { Component, OnInit } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClient } from '@angular/common/http';
//
// import { cmcJasonResponseItem } from '../shared/cmc-jason-response-item';
//
// interface cmcResponseInterface {
//   response: cmcJasonResponseItem[];
// }
//
// interface cmcResponseObject {
//    id:      string;
//    name:    string;
//    symbol:  string;
//    rank:    string;
//    price_usd:  string;
//    price_btc:  string;
//    _24h_volume_usd:  string;  // I added an underscore - you can't begin a symbol with a number
//    market_cap_usd:  string;
//    available_supply:  string;
//    total_supply:  string;
//    percent_change_1h:  string;
//    percent_change_24h:  string;
//    percent_change_7d:  string;
//    last_updated:  string;
// }
//
// @Component({
//   selector: 'app-stockquote',
//   templateUrl: './stockquote.component.html',
//   styleUrls: ['./stockquote.component.css']
// })
// export class StockquoteComponent implements OnInit {
//
//   cmcUrls = [
//     // The first call gets the Top 10 currencies by Market Capitalization.
//     // The other ones get a specific crypto currency.
//     "https://api.coinmarketcap.com/v1/ticker/?limit=10",
//     "https://api.coinmarketcap.com/v1/ticker/bitcoin/",
//     "https://api.coinmarketcap.com/v1/ticker/ethereum/"
//   ];
//
//   // I can't figure-out how to define a type for the JSON obj returned
//   // by cmc because one of the fields starts with a #, and the compiler
//   // doesn't allow that!!!  So I denied this as type "any", so then
//   // compiler will figure-out what it is, and it seems to work.
//   btcQuote: any;
//   ethQuote: any;
//   xrpQuote: any;
//   adaQuote: any;
//
//   fullResponse: any;
//   quoteList: any[];
//
//   date = new Date(null);
//
//   btcLastUpdateTime: any;
//   ethLastUpdateTime: any;
//   xrpLastUpdateTime: any;
//   adaLastUpdateTime: any;
//
//   constructor(private http: HttpClient) { }
//
//   ngOnInit() {
//     this.getQuotesAndProccesThem();
//   }
//
//   processQuotes(){
//       // console.log(this.ethQuote);
//
//       this.quoteList[0] = this.fullResponse[1];
//       this.quoteList[1] = this.fullResponse[2];
//       this.quoteList[2] = this.fullResponse[4];
//       this.quoteList[3] = this.fullResponse[0];
//   }
//
//   // I think that all processing of the quote data must be done in the context
//   // this function, because the get operation is asynchronous, so you
//   // don't know when it will return the data.
//   getQuotesAndProccesThem(){
//     // Note that this.http is created in the Constructor()
//     console.log("Clicked.");
//     this.http.get(this.cmcUrls[0]).subscribe(response => {
//
//       this.btcQuote = response[0];
//       this.ethQuote = response[1];
//       this.xrpQuote = response[2];
//       this.adaQuote = response[4];
//
//       this.fullResponse = response;
//
//       // console.log(response);
//       // console.log(this.fullResponse[0]);
//       this.processQuotes();
//     });
//   }
//
//}
// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
