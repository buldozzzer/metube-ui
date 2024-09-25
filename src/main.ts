import { enableProdMode } from '@angular/core';
import { AppRoutingModule } from './app/app.routes';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppRoutingModule)
  .catch((err) => console.error(err));
