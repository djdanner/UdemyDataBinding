import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs/Rx';

import { cmcJasonResponseItem } from '../shared/cmc-jason-response-item';
import { binanceJasonResponseItemPriceQuote } from '../shared/binance-jason-response-item-price-quote';

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

  binanceUrls = [
    // The first call gets the Top 10 currencies by Market Capitalization.
    // The other ones get a specific crypto currency.
    "https://api.binance.com/api/v1/ticker/price?symbol=XRPETH",
    "https://api.binance.com/api/v1/ticker/price?symbol=ADAETH"
  ];

  cmcQuoteList: cmcJasonResponseItem[] = [];
  binanceQuoteList: binanceJasonResponseItemPriceQuote[] = [];

  cmcFullResponse: any;

  binanceResponse: any;
  binanceFullResponse: any;

  ethPriceUsd: number = 0;

  timerSubscription: any;
  timer1Subscription: any;

  currentDate = new Date();
  currentMinutes: number;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    // The cmc data is updated every 5 minutes, starting on the Hour
    // (i.e., at 0, 5, 10 minutes, etc.).  But there is a 1 minute delay or so
    // before that data is actually available via the web api, so it really
    // changes at 1, 6, 11, etc., so synch-up the starting of our 5 minute timer
    // with one of those intervals.
    // this.currentDate = new Date();
    this.currentMinutes = this.currentDate.getMinutes();
    console.log("Minutes = " + this.currentMinutes);

    // var delayTimerStartToSynchItWithWwwDataUpdates = 0;
    var delayTimerStartToSynchItWithWwwDataUpdates = 6 - (this.currentMinutes % 5);

    // The delay seems to be taking a minute or two longer than it should, so I'm
    // adjusting it down.
    // if (delayTimerStartToSynchItWithWwwDataUpdates != 0){
    //   delayTimerStartToSynchItWithWwwDataUpdates--;
    // }

    console.log("StartDelay = " + delayTimerStartToSynchItWithWwwDataUpdates);

    // Start a timer to periodicallyt call the specified function.
    // this.getQuotesAndProccesThem();
    // param1 = delay the start of this timer in ms.
    // param2 = period of timer in ms
    //          here period = 5 min
    let timer = Observable.timer(delayTimerStartToSynchItWithWwwDataUpdates, (1000 * 60 * 5));
    this.timerSubscription = timer.subscribe(t => {
      this.getQuotesAndProccesThem();(t);
      }
    );

    console.log("End of ngOnInit()");
  }

  // I think that all processing of the quote data must be done in the context
  // this function, because the get operation is asynchronous, so you
  // don't know when it will return the data.
  getQuotesAndProccesThem(){
    this.getCmcQuotes();
    this.getBinanceQuotes();
  }

  getCmcQuotes(){
    // Note that this.http is created in the Constructor()
    this.http.get(this.cmcUrls[0]).subscribe(response => {

      // We could also use the existing currentDate variable, but have to
      // force it to get the ceuurent time.
      var tempDate = new Date();
      var tempMinutes = tempDate.getMinutes();

      console.log("Clicked. Minute: " + tempMinutes);

      this.cmcFullResponse = response;

      this.processCmcQuotes();
    });
  }

  // Note that this must be called within the context of the associated
  // http response processing.
  processCmcQuotes(){
    var j = 0;

    for (var i = 0; i <= 4 ; i++){

      // As of 2/1/2018:
      //   0 = BTC
      //   1 = ETH
      //   2 = XRP
      //   4 = ADA
      // TODO: Make this automatic rather than hard-coded

      if ( (i==0) || (i==1) || (i==2) || (i==4) ){
        // console.log(i, j);
        var tempItem = new cmcJasonResponseItem();
        // var tempItem: any; // = new cmcJasonResponseItem();

        tempItem.name               = this.cmcFullResponse[i].name;
        tempItem.symbol             = this.cmcFullResponse[i].symbol;
        tempItem.price_usd          = this.cmcFullResponse[i].price_usd;
        tempItem.percent_change_24h = this.cmcFullResponse[i].percent_change_24h;
        tempItem.last_updated       = this.cmcFullResponse[i].last_updated;

        this.cmcQuoteList[j] = tempItem;
        j++;
      }

      this.ethPriceUsd = this.cmcFullResponse[1].price_usd;
    }

    // console.log(this.cmcQuoteList);
  }

  getBinanceQuotes(){
    // Note that this.http is created in the Constructor()
    // console.log("Binance Quotes:");

    // XRPETH
    this.http.get(this.binanceUrls[0]).subscribe(response => {
      // console.log(response);
      // this.binanceQuoteList[0] = response;
      this.binanceResponse = response;
      this.cmcQuoteList[2].binanceEthPrice = this.binanceResponse.price;
      //console.log("this.binanceQuoteList[0]: " + this.binanceQuoteList[0]);
    });

    // ADAETH
    this.http.get(this.binanceUrls[1]).subscribe(response => {
      // console.log(response);
      // this.binanceQuoteList[1] = response;
      this.binanceResponse = response;
      this.cmcQuoteList[3].binanceEthPrice = this.binanceResponse.price;
    });

    this.processBinanceQuotes();
  }

  processBinanceQuotes(){
    
  }

}  // class StockquoteComponent

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
//   //cmcQuoteList : cmcJasonResponseItem [];
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
//   // cmcQuoteList: any[];
//   cmcQuoteList: cmcJasonResponseItem[] = [];
//
//   cmcFullResponse: any;
//
//   constructor(private http: HttpClient) { }
//
//   ngOnInit() {
//     this.getQuotesAndProccesThem();
//   }
//
//   processCmcQuotes(){
//       // console.log(this.ethQuote);
//       var j = 0;
//
//       for (var i = 0; i <= 4 ; i++){
//
//         if ( (i==0) || (i==1) || (i==2) || (i==4) ){
//           // console.log(i, j);
//           var tempItem = new cmcJasonResponseItem();
//
//           tempItem.name               = this.cmcFullResponse[i].name;
//           tempItem.symbol             = this.cmcFullResponse[i].symbol;
//           tempItem.price_usd          = this.cmcFullResponse[i].price_usd;
//           tempItem.percent_change_24h = this.cmcFullResponse[i].percent_change_24h;
//           tempItem.last_updated       = this.cmcFullResponse[i].last_updated;
//
//           this.cmcQuoteList[j] = tempItem;
//           j++;
//         }
//       }
//
//       console.log(this.cmcQuoteList);
//
//       // tempItem.name               = this.cmcFullResponse[1].name;
//       // tempItem.symbol             = this.cmcFullResponse[1].symbol;
//       // tempItem.price_usd          = this.cmcFullResponse[1].price_usd;
//       // tempItem.percent_change_24h = this.cmcFullResponse[1].percent_change_24h;
//       // tempItem.last_updated       = this.cmcFullResponse[1].last_updated;
//       //
//       // this.cmcQuoteList[0] = tempItem;
//       //
//       // this.aaaTest = this.cmcQuoteList[0].name;
//
//       //this.cmcQuoteList[0].name = this.cmcFullResponse[1].name;
//       // this.cmcQuoteList[1] = this.cmcFullResponse[2];
//       // this.cmcQuoteList[2] = this.cmcFullResponse[4];
//       // this.cmcQuoteList[3] = this.cmcFullResponse[0];
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
//       this.cmcFullResponse = response;
//
//       // console.log(response);
//       // console.log(this.cmcFullResponse[0]);
//       this.processCmcQuotes();
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
//   cmcFullResponse: any;
//   cmcQuoteList: any[];
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
//   processCmcQuotes(){
//       // console.log(this.ethQuote);
//
//       this.cmcQuoteList[0] = this.cmcFullResponse[1];
//       this.cmcQuoteList[1] = this.cmcFullResponse[2];
//       this.cmcQuoteList[2] = this.cmcFullResponse[4];
//       this.cmcQuoteList[3] = this.cmcFullResponse[0];
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
//       this.cmcFullResponse = response;
//
//       // console.log(response);
//       // console.log(this.cmcFullResponse[0]);
//       this.processCmcQuotes();
//     });
//   }
//
//}
// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
