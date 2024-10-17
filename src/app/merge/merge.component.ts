import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Download, DownloadsService } from '../downloads.service';
import { CommonModule, KeyValue } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { EtaPipe, SpeedPipe, FileSizePipe, EncodeURIComponent } from '../downloads.pipe';
import { MasterCheckboxComponent, SlaveCheckboxComponent } from '../master-checkbox.component';
import { faScissors } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Format, Formats } from '../formats';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-merge',
  standalone: true,
  imports: [
    MasterCheckboxComponent,
    SlaveCheckboxComponent,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    NavbarComponent,
    EtaPipe,
    SpeedPipe,
    FileSizePipe,
    EncodeURIComponent,
  ],
  templateUrl: './merge.component.html',
  styleUrl: './merge.component.sass'
})
export class MergeComponent {
  apiUrl = 'http://109.232.186.180:15380';


  constructor(public downloads: DownloadsService){
    if (environment.production){
      this.apiUrl = environment.url
    }
  }
}
