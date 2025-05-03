import { Component, ComponentRef, effect, ViewChild } from '@angular/core';
import { OperationService } from '../../services/operation.service';
import { OperationResponse } from '../../shared/dto/operation';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SessionService } from '../../services/session.service';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { NewOperationModalComponent } from '../../shared/component/new-operation-modal/new-operation-modal.component';
import { Currency } from '../../shared/enum/currency';

@Component({
  selector: 'app-home',
  imports: [
    DatePipe,
    TableModule,
    CurrencyPipe,
    ButtonModule,
    ConfirmPopupModule,
    NewOperationModalComponent,
  ],
  providers: [ConfirmationService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  operations: OperationResponse[] = [];
  operationModalVisible: boolean = false;
  currentOperationId: number = 0;

  @ViewChild('newOperationModal')
  newOperationModal!: NewOperationModalComponent;

  constructor(
    private operationService: OperationService,
    private toast: ToastrService,
    private session: SessionService,
    private confirmationService: ConfirmationService
  ) {
    effect(() => {
      this.session.getOperationsUpdateSignal()();
      this.operationService.getOperations().subscribe({
        next: (operations) => {
          this.operations = operations;
        },
        error: () => {
          this.toast.error('An error ocurred when finding the operations');
        },
      });
    });
  }

  editOperation(id: number = 0) {
    this.newOperationModal.editOperation(id);
  }

  promptDeleteOperation(event: Event, id: number) {
    console.log(event.target);
    this.confirmationService.confirm({
      position: 'left',
      message: 'Are you sure you want to delete this operation?',
      accept: () => {
        this.deleteOperation(id);
      },
      target: event.target as EventTarget,
      dismissableMask: true,
      acceptButtonStyleClass: 'btn-light',
      rejectButtonStyleClass: 'secondary',
    });
  }

  deleteOperation(id: number) {
    this.operationService.deleteOperation(id).subscribe({
      next: ({ message }) => {
        this.toast.success(message);
        this.session.setOperationsUpdateSignal();
      },
      error: (error) => {
        this.toast.success(error.error.message);
      },
    });
  }

  getCurrencyDisplayName(currency: string) {
    return Currency.getByName(currency).displayName;
  }
}
