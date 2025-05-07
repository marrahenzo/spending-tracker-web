import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  effect,
  OnInit,
  ViewChild,
} from '@angular/core';
import { OperationService } from '../../services/operation.service';
import {
  AmountPerCategoryView,
  OperationResponse,
} from '../../shared/dto/operation';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SessionService } from '../../services/session.service';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { NewOperationModalComponent } from '../../shared/component/new-operation-modal/new-operation-modal.component';
import { Currency } from '../../shared/enum/currency';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    DatePipe,
    TableModule,
    CurrencyPipe,
    ButtonModule,
    ConfirmPopupModule,
    NewOperationModalComponent,
    CardModule,
    ChartModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  operations: OperationResponse[] = [];

  @ViewChild('newOperationModal')
  newOperationModal!: NewOperationModalComponent;

  accountBalance: number = 0;
  amountsPerCategory: AmountPerCategoryView[] = [];
  chartData: any;

  constructor(
    private operationService: OperationService,
    private toast: ToastrService,
    private session: SessionService,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef
  ) {
    effect(() => {
      this.session.getOperationsUpdateSignal()();
      const operationsObservable = this.operationService.getOperations();
      const balanceObservable = this.operationService.getBalance();
      const amountsPerCategoryObservable =
        this.operationService.getAmountPerCategory();
      forkJoin([
        operationsObservable,
        balanceObservable,
        amountsPerCategoryObservable,
      ]).subscribe({
        next: ([operations, balance, amountsPerCategory]) => {
          this.operations = operations;
          this.accountBalance = balance;
          this.amountsPerCategory = amountsPerCategory;
          this.initChart();
        },
        error: (error) => {
          this.toast.error('An error ocurred when loading the data');
          console.log(error);
        },
      });
    });
  }

  initChart() {
    this.chartData = {
      labels: this.amountsPerCategory.map((x) =>
        x.category ? x.category : 'No Category'
      ),
      datasets: [
        {
          label: 'Amount',
          data: this.amountsPerCategory.map((x) => x.amount),
          backgroundColor: [
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#66FF66',
            '#FF66CC',
            '#33CCCC',
            '#FF9933',
            '#6699FF',
            '#99CC33',
            '#CC6699',
            '#66CCCC',
            '#FF6666',
            '#339966',
            '#CC9933',
            '#993366',
            '#66FFCC',
            '#CC3366',
            '#3366CC',
            '#FF9966',
            '#9999FF',
          ],
          hoverOffset: 4,
        },
      ],
    };
  }

  editOperation(id: number = 0) {
    this.newOperationModal.editOperation(id);
  }

  promptDeleteOperation(event: Event, id: number) {
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
