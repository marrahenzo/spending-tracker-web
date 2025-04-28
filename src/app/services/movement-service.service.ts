import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../shared/constants';
import { LoginRequest } from '../shared/dto/login-request';
import { SignupRequest } from '../shared/dto/signup-request';
import { MovementResponse } from '../shared/dto/movement-response';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  constructor(private http: HttpClient) {}

  getMovements() {
    return this.http.get<MovementResponse[]>(`${API_URL}/movement`, {
      withCredentials: true,
    });
  }

  getMovementDetail(movementId: number) {
    return this.http.get<MovementResponse>(
      `${API_URL}/movement/${movementId}`,
      { withCredentials: true }
    );
  }
}
