import {Component} from "@angular/core";
import {TestResponseMessage} from "../../models/test-response-message";
@Component({
  selector: 'display-info',
  templateUrl: './display-info.component.html',
  styleUrls: ['./display-info.component.css']
})

export class DisplayInfoComponent {
  display = false;
  name = '';
  runResults: TestResponseMessage[] = [];

  public getDisplay(): boolean {
    return this.display;
  }

  public setDisplay(display: boolean) {
    this.display = display;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setRunResults(results: TestResponseMessage[]) {
    this.runResults = results;
  }

  public addRunResult(result: TestResponseMessage) {
    this.runResults.push(result);
  }
}
