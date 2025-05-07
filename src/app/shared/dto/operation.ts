import { Currency } from '../enum/currency';
import { CategoryResponse } from './category';

export interface OperationResponse {
  id: number;
  description: string;
  amount: number;
  currency: string;
  category: CategoryResponse;
  date: Date;
  user: string;
}

export interface OperationRequest {
  id: number;
  description: string;
  amount: number;
  currency: string;
  category?: number;
  date?: string;
}

export interface AmountPerCategoryView {
  category: string;
  amount: number;
}
