import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../shared/constants';
import { SuccessDTO } from '../shared/dto/success-dto';
import { CategoryRequest, CategoryResponse } from '../shared/dto/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<CategoryResponse[]>(`${API_URL}/category`);
  }

  getCategoryDetail(categoryId: number) {
    return this.http.get<CategoryResponse>(`${API_URL}/category/${categoryId}`);
  }

  saveCategory(category: CategoryRequest) {
    return this.http.post<SuccessDTO>(`${API_URL}/category`, category);
  }
}
