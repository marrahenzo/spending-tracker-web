import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../shared/constants';
import { LoginRequest } from '../shared/dto/login-request';
import { SignupRequest } from '../shared/dto/signup-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(request: LoginRequest) {
    return this.http.post(`${API_URL}/auth/login`, request);
  }

  signup(request: SignupRequest) {
    return this.http.post(`${API_URL}/auth/signup`, request);
  }
}
