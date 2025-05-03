import { Component, effect } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Currency } from '../shared/enum/currency';
import { OperationService } from '../services/operation.service';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../services/session.service';
import { CategoryService } from '../services/category.service';
import { signalWithoutEquals } from '../shared/util/signal-utils';
import { CategoryResponse } from '../shared/dto/category';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterOutlet,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule,
    SelectModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  newCategoryForm: FormGroup;
  currencies: Currency[] = Currency.getValues();
  operationModalVisible: boolean = false;
  categoryModalVisible: boolean = false;
  categoriesSignal = signalWithoutEquals(true);
  categories: CategoryResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private operationService: OperationService,
    private categoryService: CategoryService,
    private toast: ToastrService,
    private router: Router,
    private session: SessionService
  ) {
    this.newCategoryForm = this.fb.group({
      name: [, [Validators.required]],
    });

    effect(() => {
      this.categoriesSignal();
      this.categoryService.getCategories().subscribe({
        next: (categories) => {
          this.categories = categories;
        },
        error: (error) => {
          this.toast.error(error.error.message);
        },
      });
    });
  }

  openCategoryModal() {
    this.categoryModalVisible = true;
  }

  closeCategoryModal() {
    this.newCategoryForm.reset();
    this.categoryModalVisible = false;
  }

  saveCategory() {
    this.categoryService
      .saveCategory({
        name: this.newCategoryForm.get('name')?.value,
      })
      .subscribe({
        next: ({ message }) => {
          this.toast.success(message);
          this.closeCategoryModal();
          this.categoriesSignal.set(true);
        },
        error: (error) => {
          this.toast.error(error.error.message);
        },
      });
  }

  isFieldInvalid(field: string) {
    const control = this.newCategoryForm.get(field);
    return !control?.valid && control?.touched;
  }
}
