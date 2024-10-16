import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class LoginSocket extends Socket {
  constructor() {
    console.log(document.location.pathname);

    var path = document.location.pathname

    if (path.endsWith('login')){
      path = path.replace('login', '') + 'socket.io';
    }
    else {
      path = 'socket.io'
    }
    super({ url: '109.232.186.180:15380', options: { path } });
  }
}
