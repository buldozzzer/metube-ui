import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service'
import { NavbarComponent } from '../navbar/navbar.component';
import { DownloadsService } from '../downloads.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    ReactiveFormsModule,
    FormsModule,
    RouterModule, 
    NavbarComponent,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {

  username: string
  password: string
  
  constructor(public router: Router, public authService: AuthService, public downloads: DownloadsService){
  }

  protected loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })


  logIn(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value)
      .subscribe((data: any) => {
        if(this.authService.isAuthenticated()){
          this.router.navigate(['/home']);
        }
      });
    }
  }
}