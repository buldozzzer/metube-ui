import { ActivatedRouteSnapshot, CanActivateFn , Router, RouterStateSnapshot } from  '@angular/router' ; 
import { AuthService } from  './auth.service' ; 
import {inject} from  "@angular/core" ; 

export const AuthGuardService = (
) => {
    let authService = inject(AuthService)
    const isAuthenticated = authService.isAuthenticated()  
    let router = inject(Router) 
    if (isAuthenticated) { 
        return true; 
    } 
    else { 
        router.navigate(['/']);
        return false;
    }
}