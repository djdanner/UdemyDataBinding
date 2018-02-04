import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  allQuoteHistory: cmcJasonResponseItem[][] = [];

  btcQuoteHistory: cmcJasonResponseItem[] = [];
  ethQuoteHistory: cmcJasonResponseItem[] = [];
  xrpQuoteHistory: cmcJasonResponseItem[] = [];
  adaQuoteHistory: cmcJasonResponseItem[] = [];

  quoteHistoryIx: number = 0;

  audio: any;

  constructor(private http: HttpClient) { }

  @Output('quoteChangeEvent')
  quoteChangeEvent: EventEmitter<cmcJasonResponseItem[][]> = new EventEmitter<cmcJasonResponseItem[][]>();

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

    this.audio = new Audio();
    //this.audio.src = "C:/\Users/\Dan\/Documents/\___UdemyExamples/\60-Data-Binding/\cmp-databinding-start/\src/\app\/sounds/\ding-01.mp3";
    //this.audio.src = "../sounds/ding-01.mp3";
    //this.audio.src = "src/app/sounds/ding-01.mp3";
    this.audio.src ="http://resources.schoolscience.co.uk/CDA/CD/files/sound/decorativelamp.mp3";
    //this.audio.src = "ding-01.mp3";
    this.audio.load();
    //this.audio.play();
  }

  playSound(){
    this.audio.play();
  }

  // I think that all processing of the quote data must be done in the context
  // this function, because the get operation is asynchronous, so you
  // don't know when it will return the data.
  getQuotesAndProccesThem(){
    this.getCmcQuotes();
    this.getBinanceQuotes();
    this.updateQuoteHistory();
    this.quoteChangeEvent.emit(this.allQuoteHistory);
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

      // Note, this is used in the if() below, but it only works for
      // XRP and ADA b/c they have higher indexes.
      // It doesn't work for BTC, but I don't care about that.
      this.ethPriceUsd = this.cmcFullResponse[1].price_usd;

      if ( (i==0) || (i==1) || (i==2) || (i==4) ){
        // console.log(i, j);
        var tempItem = new cmcJasonResponseItem();
        // var tempItem: any; // = new cmcJasonResponseItem();

        tempItem.name               = this.cmcFullResponse[i].name;
        tempItem.symbol             = this.cmcFullResponse[i].symbol;
        tempItem.price_usd          = this.cmcFullResponse[i].price_usd;
        tempItem.percent_change_24h = this.cmcFullResponse[i].percent_change_24h;
        tempItem.last_updated       = this.cmcFullResponse[i].last_updated;

        // See note above.  This doesn't work for BTC.
        tempItem.cmcPriceInEth       = this.cmcFullResponse[i].price_usd / this.ethPriceUsd;

        this.cmcQuoteList[j] = tempItem;
        j++;
      }

      //(quote.price_usd / ethPriceUsd)
      //cmcPriceInEth
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
      this.cmcQuoteList[2].binancePriceInEth = this.binanceResponse.price;
      //console.log("this.binanceQuoteList[0]: " + this.binanceQuoteList[0]);
      this.processBinanceQuotes(2);
    });

    // ADAETH
    this.http.get(this.binanceUrls[1]).subscribe(response => {
      // console.log(response);
      // this.binanceQuoteList[1] = response;
      this.binanceResponse = response;
      this.cmcQuoteList[3].binancePriceInEth = this.binanceResponse.price;
      this.processBinanceQuotes(3);

      // Set these to some value so they don't blow-up and don't
      // mess-up the display.
      this.cmcQuoteList[0].binancePriceInEth = this.cmcQuoteList[0].cmcPriceInEth;
      this.cmcQuoteList[1].binancePriceInEth = 1;

      // Set these to some value so they don't blow-up.
      this.processBinanceQuotes(0);
      this.processBinanceQuotes(1);
    });

  }

  processBinanceQuotes(Ix: number){

    var binPriceInEth = this.cmcQuoteList[Ix].binancePriceInEth;
    var cmcPriceInEth = this.cmcQuoteList[Ix].cmcPriceInEth;

    // Determine % difference between the Binance and CMC quotes.
    if (binPriceInEth >= cmcPriceInEth){
      // Binance is over-bought, so sell.
      this.cmcQuoteList[Ix].percentBinCmcPriceDelta =
        (binPriceInEth - cmcPriceInEth) / binPriceInEth;
    } else {
      // Binance is over-sold, so buy.
      // Use negative sign to indicate over sold.
      this.cmcQuoteList[Ix].percentBinCmcPriceDelta =
        -((binPriceInEth - cmcPriceInEth) / binPriceInEth);
    }

    if ((Ix == 2) || (Ix == 3)){
      // ADA or XRP
      // console.log("AAA: " + this.cmcQuoteList[Ix].percentBinCmcPriceDelta);

      // If Skew >= X%
      if ((this.cmcQuoteList[Ix].percentBinCmcPriceDelta >= 0.06) ||
          (this.cmcQuoteList[Ix].percentBinCmcPriceDelta <= -0.06)){
            this.playSound();
      }
    }

  }

  updateQuoteHistory(){
    this.btcQuoteHistory[this.quoteHistoryIx] = this.cmcQuoteList[0];
    this.ethQuoteHistory[this.quoteHistoryIx] = this.cmcQuoteList[1];
    this.xrpQuoteHistory[this.quoteHistoryIx] = this.cmcQuoteList[2];
    this.adaQuoteHistory[this.quoteHistoryIx] = this.cmcQuoteList[4];

    this.allQuoteHistory[this.quoteHistoryIx] = this.cmcQuoteList;

    this.quoteHistoryIx++;
  }


}  // class StockquoteComponent
