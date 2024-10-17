import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../environments/environment';

@Injectable()
export class MeTubeSocket extends Socket {

  constructor() {
    
    var apiUrl = 'http://109.232.186.180:15380'
    if (environment.production){
      apiUrl = environment.url
    }

    super({ url: apiUrl });
  }
}
