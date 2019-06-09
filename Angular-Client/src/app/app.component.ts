import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl("http://localhost:5627/notify")
      .build();

    connection.start().then(function () {
      console.log('Connected!');
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("BroadcastMessage", (type: string, payload: string) => {
      this.messageService.add({ severity: type, summary: payload, detail: 'Via SignalR' });
    });
  }
}