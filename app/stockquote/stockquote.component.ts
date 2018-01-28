import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-stockquote',
  templateUrl: './stockquote.component.html',
  styleUrls: ['./stockquote.component.css']
})
export class StockquoteComponent implements OnInit {

  urls = [
    "https://api.coinmarketcap.com/v1/ticker/bitcoin/",
    "https://api.coinmarketcap.com/v1/ticker/ethereum/"
  ];

  results: string[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getQuotes(){
    // Note that this.http is created in the Constructor()
    console.log("Clicked.");
    this.http.get(this.urls[0]).subscribe(data => {
          // Read the result field from the JSON response.
          // console.log(data.headers.get('X-Custom-Header'));
          // console.log(data.body);
          console.log(data);   // *** THIS WORKS ***
          this.results = data[0].name;
          //this.results = data[0];
        });

    console.log(this.results);

    // this.http
    //   //.get<MyJsonData>(this.urls[0], {observe: 'response'})
    //   .get(this.urls[0], {observe: 'response'})
    //   .subscribe(resp => {
    //     // Here, resp is of type HttpResponse<MyJsonData>.
    //     // You can inspect its headers:
    //     console.log(resp.headers.get('X-Custom-Header'));
    //     // And access the body directly, which is typed as MyJsonData as requested.
    //     console.log(resp.body.someField);
    //   });
  }


}
