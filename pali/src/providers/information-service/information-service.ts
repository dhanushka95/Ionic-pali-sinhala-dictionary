import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

/*
  Generated class for the InformationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InformationServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello InformationServiceProvider Provider');
  }
  getInfo(search,type) {
    return this.http.post('http://localhost:5010/dictionary/get',{search:search,typeId:type},{
      headers: this.getHttpHeaders()
    })
      .map(res => {
        console.log(res);
        return res;
      });
  }
  getHttpHeaders() {
    return new HttpHeaders()
      .set('Content-Type', 'application/json');
  }
}
