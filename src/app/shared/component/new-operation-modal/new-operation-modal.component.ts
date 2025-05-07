import {
  Component,
  effect,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { OperationService } from '../../../services/operation.service';
import { CategoryService } from '../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { Currency } from '../../enum/currency';
import { signalWithoutEquals } from '../../util/signal-utils';
import { CategoryResponse } from '../../dto/category';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-new-operation-modal',
  imports: [
    ButtonModule,
    DialogModule,
    FloatLabelModule,
    ReactiveFormsModule,
    SelectModule,
    IftaLabelModule,
    InputTextModule,
  ],
  templateUrl: './new-operation-modal.component.html',
  styleUrl: './new-operation-modal.component.scss',
})
export class NewOperationModalComponent {
  newOperationForm: FormGroup;
  currencies: Currency[] = Currency.getValues();
  categoriesSignal = signalWithoutEquals(true);
  categories: CategoryResponse[] = [];

  operationModalVisible: boolean = false;
  currentOperationId: number = 0;

  constructor(
    private fb: FormBuilder,
    private operationService: OperationService,
    private categoryService: CategoryService,
    private toast: ToastrService,
    private router: Router,
    private session: SessionService
  ) {
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

    this.newOperationForm = this.fb.group({
      id: [0, Validators.required],
      amount: [0, [Validators.required]],
      currency: [Currency.ARG_PESOS.name, [Validators.required]],
      category: [undefined],
      description: [''],
    });
  }

  editOperation(id: number) {
    if (id === 0) {
      this.newOperationForm.reset();
      this.openOperationModal();
      return;
    }

    this.operationService.getOperationDetail(id).subscribe({
      next: ({ id, amount, currency, category, description }) => {
        this.newOperationForm.patchValue({
          id,
          amount,
          currency,
          category: category?.id || undefined,
          description,
        });
        this.openOperationModal();
      },
      error: (error) => {
        this.toast.error(
          'An error ocurred when obtaining the operation details'
        );
        this.closeOperationModal();
      },
    });
  }

  openOperationModal() {
    this.operationModalVisible = true;
  }

  closeOperationModal() {
    this.newOperationForm.reset();
    this.operationModalVisible = false;
  }

  saveOperation() {
    this.operationService
      .saveOperation({
        id: this.newOperationForm.get('id')?.value,
        amount: this.newOperationForm.get('amount')?.value,
        description: this.newOperationForm.get('description')?.value,
        currency: this.newOperationForm.get('currency')?.value,
        category: this.newOperationForm.get('category')?.value,
      })
      .subscribe({
        next: ({ message }) => {
          this.toast.success(message);
          this.closeOperationModal();
          this.session.setOperationsUpdateSignal();
        },
        error: (error) => {
          this.toast.error(error.error.message);
        },
      });
  }

  isFieldInvalid(field: string) {
    const control = this.newOperationForm.get(field);
    return !control?.valid && control?.touched;
  }
}
