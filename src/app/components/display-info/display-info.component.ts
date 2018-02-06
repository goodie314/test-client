import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
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
  displaySuccesses = true;
  displayFailures = false;
  successResults: TestResponseMessage[] = [];
  failureResults: TestResponseMessage[] = [];

  private sizeSet = false;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  public getDisplay(): boolean {
    return this.display;
  }

  public setDisplay(display: boolean) {
    this.display = display;
    if (display) {
      this.setDisplaySuccesses(true);
      this.adjustHeight();
    }
  }

  private adjustHeight(): void {
    if (!this.sizeSet) {
      this.changeDetector.detectChanges();
      const parent = document.querySelector('#message-container');
      const child = document.querySelector('#message-display');
      child.setAttribute('style', `height:${parent.clientHeight}px`);
      this.sizeSet = true;
    }
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setRunResults(results: TestResponseMessage[]) {
    this.runResults = results;
    this.successResults = [];
    this.failureResults = [];
    if (results) {
      this.runResults.forEach(result => {
        if (result.successMessages.length) {
          this.successResults.push(result);
        }
        if (result.errorMessages.length) {
          this.failureResults.push(result);
        }
      });
    }
  }

  public addRunResult(result: TestResponseMessage) {
    this.runResults.push(result);
    if (result.successMessages.length) {
      this.successResults.push(result);
    }
    if (result.errorMessages.length) {
      this.failureResults.push(result);
    }
  }

  public setDisplaySuccesses(display: boolean): void {
    this.displaySuccesses = display;
    if (display) {
      this.setDisplayFailures(false);
    }
  }

  public setDisplayFailures(display: boolean): void {
    this.displayFailures = display;
    if (display) {
      this.setDisplaySuccesses(false);
    }
  }
}
