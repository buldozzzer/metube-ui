import { Component, inject } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {
  authService = inject(AuthService);
  router = inject(Router);
  public logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
