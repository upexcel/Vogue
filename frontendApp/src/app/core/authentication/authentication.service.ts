import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthenticationService {

  constructor() {
  }

  isAuthenticated(): boolean {
    console.log('isAuthenticated')
    return true;
  }
}
