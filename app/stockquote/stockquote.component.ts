import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { cmcJasonResponseItem } from '../shared/cmc-jason-response-item';

interface cmcResponseInterface {
  response: cmcJasonResponseItem[];
}

interface cmcResponseObject {
   id:      string;
   name:    string;
   symbol:  string;
   rank:    string;
   price_usd:  string;
   price_btc:  string;
   _24h_volume_usd:  string;  // I added an underscore - you can't begin a symbol with a number
   market_cap_usd:  string;
   available_supply:  string;
   total_supply:  string;
   percent_change_1h:  string;
   percent_change_24h:  string;
   percent_change_7d:  string;
   last_updated:  string;
}

@Component({
  selector: 'app-stockquote',
  templateUrl: './stockquote.component.html',
  styleUrls: ['./stockquote.component.css']
})
export class StockquoteComponent implements OnInit {

  cmcUrls = [
    "https://api.coinmarketcap.com/v1/ticker/bitcoin/",
    "https://api.coinmarketcap.com/v1/ticker/ethereum/"
  ];

  results: string[];
  btcQuote:  cmcResponseObject;  // ??? do I need a "new"
  symbol: string;

  btcSymbol: string;

  btc_id:      string;
  btc_name:    string;
  btc_symbol:  string;
  btc_rank:    string;
  btc_price_usd:  string;
  btc_price_btc:  string;
  btc_24h_volume_usd:  string;  // I added an underscore - you can't begin a symbol with a number
  btc_market_cap_usd:  string;
  btc_available_supply:  string;
  btc_total_supply:  string;
  btc_percent_change_1h:  string;
  btc_percent_change_24h:  string;
  btc_percent_change_7d:  string;
  btc_last_updated:  string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getQuotes();
  }

  getQuotes(){
    // Note that this.http is created in the Constructor()
    console.log("Clicked.");
    this.http.get(this.cmcUrls[0]).subscribe(response => {
          // Read the specified field from the JSON response.
          // console.log(response.headers.get('X-Custom-Header'));
          // console.log(response.body);
          console.log(response);   // *** THIS WORKS ***
          this.results = response[0].name;
          // this.btcQuote.name=response[0].name;
          // this.btcQuote.symbol = response[0].symbol;
          this.btcSymbol = response[0].symbol;
          this.symbol = response[0].symbol;

          this.btc_name = response[0].name;
          this.btc_symbol = response[0].symbol;
          this.btc_price_usd = response[0].price_usd;
          this.btc_percent_change_24h = response[0].percent_change_24h;

          //this.results = response[0];
        });

    //console.log(this.results);
  }
}

// This WORKS 2 !!!
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
//     "https://api.coinmarketcap.com/v1/ticker/bitcoin/",
//     "https://api.coinmarketcap.com/v1/ticker/ethereum/"
//   ];
//
//   results: string[];
//   btcQuote:  cmcResponseObject;  // ??? do I need a "new"
//   symbol: string;
//
//   btcSymbol: string;
//
//   btc_id:      string;
//   btc_name:    string;
//   btc_symbol:  string;
//   btc_rank:    string;
//   btc_price_usd:  string;
//   btc_price_btc:  string;
//   btc_24h_volume_usd:  string;  // I added an underscore - you can't begin a symbol with a number
//   btc_market_cap_usd:  string;
//   btc_available_supply:  string;
//   btc_total_supply:  string;
//   btc_percent_change_1h:  string;
//   btc_percent_change_24h:  string;
//   btc_percent_change_7d:  string;
//   btc_last_updated:  string;
//
//   constructor(private http: HttpClient) { }
//
//   ngOnInit() {
//   }
//
//   getQuotes(){
//     // Note that this.http is created in the Constructor()
//     console.log("Clicked.");
//     this.http.get(this.cmcUrls[0]).subscribe(response => {
//           // Read the specified field from the JSON response.
//           // console.log(response.headers.get('X-Custom-Header'));
//           // console.log(response.body);
//           console.log(response);   // *** THIS WORKS ***
//           this.results = response[0].name;
//           // this.btcQuote.name=response[0].name;
//           // this.btcQuote.symbol = response[0].symbol;
//           this.btcSymbol = response[0].symbol;
//           this.symbol = response[0].symbol;
//
//           this.btc_name = response[0].name;
//           this.btc_symbol = response[0].symbol;
//           this.btc_price_usd = response[0].price_usd;
//           this.btc_percent_change_24h = response[0].percent_change_24h;
//
//           //this.results = response[0];
//         });
//
//     //console.log(this.results);
//   }
// }
// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww


// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// ***  This DOES NOT WORK!!!  ***
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// import { Component, OnInit } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClient } from '@angular/common/http';
//
// import { cmcJasonResponseItem } from '../shared/cmc-jason-response-item';
//
//
// // interface cmcResponseInterface {
// //   response: cmcJasonResponseItem[];
// // }
//
// interface cmcResponseInterface {
//   cmcResponse: Array<cmcResponseObject>;
// }
//
// interface cmcResponseObject {
//      id:      string;
//      name:    string;
//      symbol:  string;
//      rank:    string;
//      price_usd:  string;
//      price_btc:  string;
//      _24h_volume_usd:  string;  // I added an underscore - you can't begin a symbol with a number
//      market_cap_usd:  string;
//      available_supply:  string;
//      total_supply:  string;
//      percent_change_1h:  string;
//      percent_change_24h:  string;
//      percent_change_7d:  string;
//      last_updated:  string;
// }
//
// // interface cmcResponseObject {
// //     id: string;
// //     name: string;
// //     symbol: string;
// //     rank: string;
// //     price_usd: string;
// //     price_btc: string;
// //     24h_volume_usd: string;
// //     market_cap_usd: string;
// //     available_supply: string;
// //     total_supply: string;
// //     percent_change_1h: string;
// //     percent_change_24h: string;
// //     percent_change_7d: string;
// //     last_updated: string;
// // }
//
// @Component({
//   selector: 'app-stockquote',
//   templateUrl: './stockquote.component.html',
//   styleUrls: ['./stockquote.component.css']
// })
// export class StockquoteComponent implements OnInit {
//
//
//   cmcUrls = [
//     "https://api.coinmarketcap.com/v1/ticker/bitcoin/",
//     "https://api.coinmarketcap.com/v1/ticker/ethereum/"
//   ];
//
// //  results: string[];
//   results: cmcResponseObject[];
//
//   testData : string;
//
//
//   constructor(private http: HttpClient) { }
//
//   ngOnInit() {
//   }
//
//   getQuotes(){
//     // Note that this.http is created in the Constructor()
//     console.log("Clicked.");
//     //this.http.get<cmcResponseInterface>(this.cmcUrls[0]).subscribe(response => {
//     this.http.get(this.cmcUrls[0]).subscribe(response => {
//           // Read the specified field from the JSON response.
//           // console.log(response.headers.get('X-Custom-Header'));
//           // console.log(response.body);
//           //console.log(response);   // *** THIS WORKS ***
//           //this.results = response;
//           this.results = response[0].name;
//         });
//
//     console.log(this.results);
//
//     //this.testData = this.results[0].name;
//
//     // this.http
//     //   //.get<MyJsonData>(this.urls[0], {observe: 'response'})
//     //   .get(this.urls[0], {observe: 'response'})
//     //   .subscribe(resp => {
//     //     // Here, resp is of type HttpResponse<MyJsonData>.
//     //     // You can inspect its headers:
//     //     console.log(resp.headers.get('X-Custom-Header'));
//     //     // And access the body directly, which is typed as MyJsonData as requested.
//     //     console.log(resp.body.someField);
//     //   });
//   }
// }

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// This works
//
// import { Component, OnInit } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClient } from '@angular/common/http';
//
// import { cmcJasonResponseItem } from '../shared/cmc-jason-response-item';
//
//
// interface cmcResponseInterface {
//   response: cmcJasonResponseItem[];
// }
//
// @Component({
//   selector: 'app-stockquote',
//   templateUrl: './stockquote.component.html',
//   styleUrls: ['./stockquote.component.css']
// })
// export class StockquoteComponent implements OnInit {
//
//
//   cmcUrls = [
//     "https://api.coinmarketcap.com/v1/ticker/bitcoin/",
//     "https://api.coinmarketcap.com/v1/ticker/ethereum/"
//   ];
//
//   results: string[];
//
//
//
//   constructor(private http: HttpClient) { }
//
//   ngOnInit() {
//   }
//
//   getQuotes(){
//     // Note that this.http is created in the Constructor()
//     console.log("Clicked.");
//     this.http.get(this.cmcUrls[0]).subscribe(response => {
//           // Read the specified field from the JSON response.
//           // console.log(response.headers.get('X-Custom-Header'));
//           // console.log(response.body);
//           console.log(response);   // *** THIS WORKS ***
//           this.results = response[0].name;
//           //this.results = response[0];
//         });
//
//     console.log(this.results);
//
//     // this.http
//     //   //.get<MyJsonData>(this.urls[0], {observe: 'response'})
//     //   .get(this.urls[0], {observe: 'response'})
//     //   .subscribe(resp => {
//     //     // Here, resp is of type HttpResponse<MyJsonData>.
//     //     // You can inspect its headers:
//     //     console.log(resp.headers.get('X-Custom-Header'));
//     //     // And access the body directly, which is typed as MyJsonData as requested.
//     //     console.log(resp.body.someField);
//     //   });
//   }
// }
