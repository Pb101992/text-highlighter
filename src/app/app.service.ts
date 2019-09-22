import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Model } from './model';

@Injectable()
export class AppService {

     
  constructor(private http: HttpClient) { }

  configUrl = 'assets/data.json';
  fullData:any;

  //gets data from json using http
  getConfig() {
  return this.http.get(this.configUrl);
}

  
}
