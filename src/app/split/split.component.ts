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
  selector: 'app-split',
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
  templateUrl: './split.component.html',
  styleUrl: './split.component.sass'
})
export class SplitComponent {

  customDirs$: Observable<string[]>;
  formats: Format[] = Formats;
  playlistStrictMode: boolean;
  playlistItemLimit: number;
  quality: string;
  format: string;
  apiUrl = 'http://109.232.186.180:15380';

  faScissors = faScissors

  constructor(public downloads: DownloadsService){
    if (environment.production){
      this.apiUrl = environment.url
    }
  }

  ngOnInit() {
    this.getConfiguration();
    this.customDirs$ = this.getMatchingCustomDir();
  }

  ngAfterViewInit() {
    this.downloads.doneChanged.subscribe(() => {
      let completed: number = 0, failed: number = 0;
      this.downloads.done.forEach(dl => {
        if (dl.status === 'finished')
          completed++;
      });
    });
    
  }

  @ViewChild('queueDelSelected') queueDelSelected: ElementRef;
  @ViewChild('doneDelSelected') doneDelSelected: ElementRef;
  @ViewChild('doneRetryFailed') doneRetryFailed: ElementRef;

  getMatchingCustomDir() : Observable<string[]> {
    return this.downloads.customDirsChanged.asObservable().pipe(map((output) => {
      // Keep logic consistent with app/ytdl.py
      if (this.isAudioType()) {
        console.debug("Showing audio-specific download directories");
        return output["audio_download_dir"];
      } else {
        console.debug("Showing default download directories");
        return output["download_dir"];
      }
    }));
  }

  getConfiguration() {
    this.downloads.configurationChanged.subscribe({
      next: (config) => {
        this.playlistStrictMode = config['DEFAULT_OPTION_PLAYLIST_STRICT_MODE'];
        const playlistItemLimit = config['DEFAULT_OPTION_PLAYLIST_ITEM_LIMIT'];
        if (playlistItemLimit !== '0') {
          this.playlistItemLimit = playlistItemLimit;
        }
      }
    });
  }

  isAudioType() {
    return this.quality == 'audio' || this.format == 'mp3'  || this.format == 'm4a' || this.format == 'opus' || this.format == 'wav' || this.format == 'flac';
  }

  identifyDownloadRow(index: number, row: KeyValue<string, Download>) {
    return row.key;
  }
  asIsOrder(a, b) {
    return 1;
  }
  queueSelectionChanged(checked: number) {
    this.queueDelSelected.nativeElement.disabled = checked == 0;
  }

  doneSelectionChanged(checked: number) {
    this.doneDelSelected.nativeElement.disabled = checked == 0;
  }

  buildDownloadLink(download: Download) {
    let baseDir = this.downloads.configuration["PUBLIC_HOST_URL"];
    if (download.quality == 'audio' || download.filename.endsWith('.mp3')) {
      baseDir = this.downloads.configuration["PUBLIC_HOST_AUDIO_URL"];
    }

    if (download.folder) {
      baseDir += download.folder + '/';
    }

    return baseDir + encodeURIComponent(download.filename);
  }
  split(id: string){
    console.log(id)
  }
}
