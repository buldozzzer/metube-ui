import { provideRouter, RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component';
import { EtaPipe, SpeedPipe, EncodeURIComponent, FileSizePipe } from './downloads.pipe';
import { MasterCheckboxComponent, SlaveCheckboxComponent } from './master-checkbox.component';
import { MeTubeSocket } from './metube-socket';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth.guard.service';
import { NavbarComponent } from './navbar/navbar.component';
import { SplitComponent } from './split/split.component';
import { MergeComponent } from './merge/merge.component';


export const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'split', component: SplitComponent, canActivate: [AuthGuardService]},
  { path: 'merge', component: MergeComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    NavbarComponent,
    BrowserModule,
    LoginComponent,
    HomeComponent,
    MergeComponent,
    SplitComponent,
    HttpClientModule,
    FontAwesomeModule,
    ServiceWorkerModule.register('custom-service-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [CookieService, MeTubeSocket, provideRouter(routes)],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
