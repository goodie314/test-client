import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import {Test} from "../models/test";

@Injectable()
export class TestService {

  constructor(private http: HttpClient) {
  }

  public getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${environment.webcrawlerAPI}/tests`);
  }
}
