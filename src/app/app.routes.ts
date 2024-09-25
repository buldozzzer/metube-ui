import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { EtaPipe, SpeedPipe, EncodeURIComponent, FileSizePipe } from './downloads.pipe';
import { MasterCheckboxComponent, SlaveCheckboxComponent } from './master-checkbox.component';
import { MeTubeSocket } from './metube-socket';
import { NgSelectModule } from '@ng-select/ng-select';
import { ServiceWorkerModule } from '@angular/service-worker';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    
];

@NgModule({
    declarations: [
        AppComponent,
        EtaPipe,
        SpeedPipe,
        FileSizePipe,
        EncodeURIComponent,
        MasterCheckboxComponent,
        SlaveCheckboxComponent
      ],
    imports: [RouterModule.forRoot(routes),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        FontAwesomeModule,
        NgSelectModule,
        ServiceWorkerModule.register('custom-service-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
    })
    ],
    providers: [provideHttpClient(), CookieService, MeTubeSocket],
    exports: [RouterModule],
    bootstrap: [AppComponent]
  })
  export class AppRoutingModule { }