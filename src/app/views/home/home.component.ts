import { Component } from '@angular/core';
import { MovementService } from '../../services/movement-service.service';
import { MovementResponse } from '../../shared/dto/movement-response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  movements: MovementResponse[] = [];

  constructor(
    private movementService: MovementService,
    private toast: ToastrService
  ) {
    movementService.getMovements().subscribe({
      next: (movements) => {
        this.movements = movements;
      },
      error: () => {
        this.toast.error('There was an error when finding the movements');
      },
    });
  }
}
