import {EventEmitter, Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Test} from "../models/Test";

@Injectable()
export class WebcrawlerSocketService {

  private webSocket;
  private messageRecievedEmitter: EventEmitter<string> = new EventEmitter();

  public startCrawler(tests: Test[]) {
    this.webSocket = new WebSocket(`${environment.webcrawlerSocketAPI}/crawler`);
    this.webSocket.onMessage(this.onMessage);
  }

  public onMessage($event) {

  }
}
