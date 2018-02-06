import {Component, OnInit} from '@angular/core';
import {TestService} from "./service/test.service";
import {Test} from "./models/Test";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tests: Test[];

  constructor(private testService: TestService) {
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
    // const t = document.querySelector('.activeTests');
    // console.log(t);
    // console.log(t.getAttribute('checked'));
    console.log('tests: ', this.tests);
  }
}
