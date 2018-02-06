import {EventEmitter, Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Test} from "../models/test";
import {StartCrawlerMessage} from "../models/start-crawler-message";
import {TestResponseMessage} from "../models/test-response-message";

@Injectable()
export class WebcrawlerSocketService {

  private webSocket;
  private messageRecievedEmitter: EventEmitter<TestResponseMessage>;

  public startCrawler(startCrawlerMessage: StartCrawlerMessage): EventEmitter<TestResponseMessage> {
    this.webSocket = new WebSocket(`${environment.webcrawlerSocketAPI}/crawler`);
    this.webSocket.onopen = () => {
      this.webSocket.send(JSON.stringify(startCrawlerMessage));
    };
    this.webSocket.onmessage = this.onMessage.bind(this);
    this.webSocket.onclose = this.onClose;
    this.messageRecievedEmitter = new EventEmitter();
    return this.messageRecievedEmitter;
  }

  public onMessage($event): void {
    this.messageRecievedEmitter.emit(JSON.parse($event.data));
  }

  public onClose($event) {
    console.log('closed');
  }
}
