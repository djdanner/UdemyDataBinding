// Angular
import { Component, OnInit } from '@angular/core';

// App
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // This is what it should be - the original
  // But this is fiving an error in the Chrome Console.
  // constructor(public messageService: MessageService) {}
  constructor() {}

  // Functions
  ngOnInit() {
  }
}
