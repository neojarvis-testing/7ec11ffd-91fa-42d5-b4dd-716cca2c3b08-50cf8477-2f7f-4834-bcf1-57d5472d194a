import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = localStorage.getItem('token');
    const url = request.url;

    // Skip adding the token for these endpoints
    if (
      url.includes('/register') ||
      url.includes('/login') ||
      url.includes('/check-username') ||
      url.includes('/check-email') ||
      url.includes('/check-mobile') ||
      url.includes('/send-otp') ||
      url.includes('/verify-otp')
    ) {
      return next.handle(request);
    }
    
    // Clone the request and attach the token if available
    let authReq = request;
    if (authToken) {
      authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    // Proceed with the request
    return next.handle(authReq);
  }
}
