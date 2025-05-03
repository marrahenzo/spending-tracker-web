import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../shared/constants';
import { LoginRequest } from '../shared/dto/login-request';
import { SignupRequest } from '../shared/dto/signup-request';
import { OperationRequest, OperationResponse } from '../shared/dto/operation';
import { SuccessDTO } from '../shared/dto/success-dto';
import { map } from 'rxjs';
import { Currency } from '../shared/enum/currency';

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  constructor(private http: HttpClient) {}

  getOperations() {
    return this.http.get<OperationResponse[]>(`${API_URL}/operation`, {
      withCredentials: true,
    });
  }

  getOperationDetail(operationId: number) {
    return this.http.get<OperationResponse>(
      `${API_URL}/operation/${operationId}`,
      { withCredentials: true }
    );
  }

  saveOperation(operation: OperationRequest) {
    return this.http.post<SuccessDTO>(`${API_URL}/operation`, operation, {
      withCredentials: true,
    });
  }

  deleteOperation(id: number) {
    return this.http.delete<SuccessDTO>(`${API_URL}/operation/${id}`, {
      withCredentials: true,
    });
  }
}
