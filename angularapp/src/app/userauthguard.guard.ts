import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(): boolean {
  const role = localStorage.getItem('userRole'); // Get role from localStorage
  const isAuthenticated = !!localStorage.getItem('token') && role === 'User';
 
  if (!isAuthenticated) {
  this.router.navigate(['/unauthorized']); // Redirect if not authenticated as admin
      return false;
    }
    return true;
  }
  
}