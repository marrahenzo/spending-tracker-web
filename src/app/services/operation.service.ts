import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../shared/constants';
import { LoginRequest } from '../shared/dto/login-request';
import { SignupRequest } from '../shared/dto/signup-request';
import {
  AmountPerCategoryView,
  OperationRequest,
  OperationResponse,
} from '../shared/dto/operation';
import { SuccessDTO } from '../shared/dto/success-dto';
import { map } from 'rxjs';
import { Currency } from '../shared/enum/currency';

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  constructor(private http: HttpClient) {}

  getOperations() {
    return this.http.get<OperationResponse[]>(`${API_URL}/operation`);
  }

  getOperationDetail(operationId: number) {
    return this.http.get<OperationResponse>(
      `${API_URL}/operation/${operationId}`
    );
  }

  saveOperation(operation: OperationRequest) {
    return this.http.post<SuccessDTO>(`${API_URL}/operation`, operation);
  }

  deleteOperation(id: number) {
    return this.http.delete<SuccessDTO>(`${API_URL}/operation/${id}`);
  }

  getBalance() {
    return this.http.get<number>(`${API_URL}/balance`);
  }

  getAmountPerCategory() {
    return this.http.get<AmountPerCategoryView[]>(
      `${API_URL}/amounts-per-category`
    );
  }
}
