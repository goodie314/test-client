import {Component, OnInit, ViewChild} from '@angular/core';
import {TestService} from "./service/test.service";
import {Test} from "./models/test";
import {StartCrawlerMessage} from "./models/start-crawler-message";
import {WebcrawlerSocketService} from "./service/webcrawler-socket.service";
import {TestResponseMessage} from "./models/test-response-message";
import {DisplayInfoComponent} from "./components/display-info/display-info.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(DisplayInfoComponent)
  private displayInfoComponent: DisplayInfoComponent;
  tests: Test[];
  url: string;
  private infoMap: {[checkName: string]: TestResponseMessage[]} = {};

  constructor(private testService: TestService,
              private webcrawlerSockerService: WebcrawlerSocketService) {
  }

  ngOnInit(): void {
    this.testService.getTests().subscribe(tests => {
      this.tests = tests.filter(test => {
        return test.checkName !== '';
      });
      this.tests.forEach(test => {
        test.active = true;
      });
      console.log('tests: ', this.tests);
    });
  }

  public runTests(): void {
    console.log('run tests');
    this.infoMap = {};
    const startCrawlerMessage: StartCrawlerMessage = {
      url: this.url,
      tests: []
    };
    startCrawlerMessage.tests = this.tests
      .filter(test => test.active)
      .map(test => test.checkName);
    console.log('start crawler: ', startCrawlerMessage);
    this.webcrawlerSockerService.startCrawler(startCrawlerMessage)
      .subscribe((response: TestResponseMessage) => {
        console.log('response: ', response);
        if (!this.infoMap[response.checkName]) {
          this.infoMap[response.checkName] = [];
        }
        this.infoMap[response.checkName].push(response);
        if (this.displayInfoComponent.getDisplay()) {
          this.displayInfoComponent.setRunResults(this.infoMap[this.displayInfoComponent.getName()]);
        }
    });
  }

  public openInfo(test: Test): void {
    if (this.displayInfoComponent.getDisplay()) {
      this.displayInfoComponent.setDisplay(false);
    } else {
      this.displayInfoComponent.setName(test.checkName);
      this.displayInfoComponent.setRunResults(this.infoMap[test.checkName]);
      this.displayInfoComponent.setDisplay(true);
    }
  }
}
