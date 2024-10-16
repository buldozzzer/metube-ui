import { Component } from '@angular/core';
import { Theme, Themes } from '../theme';
import { CookieService } from 'ngx-cookie-service';
import { faTrashAlt, faCheckCircle, faTimesCircle, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faRedoAlt, faSun, faMoon, faCircleHalfStroke, faCheck, faExternalLinkAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  standalone: true,
  imports: [FontAwesomeModule]
})
export class NavbarComponent {
  title = 'navbar';
  themes: Theme[] = Themes;
  activeTheme: Theme;
  format: string;

  faTrashAlt = faTrashAlt;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faRedoAlt = faRedoAlt;
  faSun = faSun;
  faMoon = faMoon;
  faCheck = faCheck;
  faCircleHalfStroke = faCircleHalfStroke;
  faDownload = faDownload;
  faExternalLinkAlt = faExternalLinkAlt;

  constructor(private cookieService: CookieService) {
    this.format = cookieService.get('metube_format') || 'any';
    this.activeTheme = this.getPreferredTheme(cookieService);
  }

  ngOnInit() {
    this.setTheme(this.activeTheme);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.activeTheme.id === 'auto') {
         this.setTheme(this.activeTheme);
      }
    });
  }
  setTheme(theme: Theme) {
    this.activeTheme = theme;
    if (theme.id === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme.id);
    }
  }

  getPreferredTheme(cookieService: CookieService): Theme {
    let theme = 'auto';
    if (cookieService.check('metube_theme')) {
      theme = cookieService.get('metube_theme');
    }

    return this.themes.find(x => x.id === theme) ?? this.themes[2];
  }

  themeChanged(theme: Theme) {
    this.cookieService.set('metube_theme', theme.id, { expires: 3650 });
    this.setTheme(theme);
  }
}