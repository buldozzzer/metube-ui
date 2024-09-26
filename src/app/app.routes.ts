import { provideRouter, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { EtaPipe, SpeedPipe, EncodeURIComponent, FileSizePipe } from './downloads.pipe';
import { MasterCheckboxComponent, SlaveCheckboxComponent } from './master-checkbox.component';
import { MeTubeSocket } from './metube-socket';
import { NgSelectModule } from '@ng-select/ng-select';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './login/auth-guard.service';
import { AuthService } from './login/auth.service';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
    { path: 'login', pathMatch: 'full', component: LoginComponent }
    
];

@NgModule({
    declarations: [
        AppComponent,
        EtaPipe,
        SpeedPipe,
        FileSizePipe,
        EncodeURIComponent,
        MasterCheckboxComponent,
        SlaveCheckboxComponent,
      ],
    imports: [
        RouterModule.forRoot(routes),
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
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }), 
        provideHttpClient(), 
        CookieService, 
        MeTubeSocket,
        provideRouter(routes),
    ],
    exports: [RouterModule],
    bootstrap: [AppComponent]
  })
  export class AppRoutingModule { }