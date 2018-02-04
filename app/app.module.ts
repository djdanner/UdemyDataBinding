import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { ServerElementComponent } from './server-element/server-element.component';
import { StockquoteComponent } from './stockquote/stockquote.component';
import { AppRoutingModule } from './app-routing.module';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AdaHistoryComponent } from './ada-history/ada-history.component';
import { QuoteHistoryComponent } from './quote-history/quote-history.component';



@NgModule({
  declarations: [
    AppComponent,
    CockpitComponent,
    MessagesComponent,
    ServerElementComponent,
    StockquoteComponent,
    AdaHistoryComponent,
    QuoteHistoryComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
