import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    // Verificar el estado inicial
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    this.isLoggedInSubject.next(isLoggedIn);
  }

  login() {
    sessionStorage.setItem('isLoggedIn', 'true');
    this.isLoggedInSubject.next(true);
  }

  logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUser');
    this.isLoggedInSubject.next(false);
  }
} 