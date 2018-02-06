import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {TestService} from "./service/test.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {WebcrawlerSocketService} from "./service/webcrawler-socket.service";
import {DisplayInfoModule} from "./components/display-info/display-info.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    DisplayInfoModule
  ],
  providers: [TestService,
              WebcrawlerSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
