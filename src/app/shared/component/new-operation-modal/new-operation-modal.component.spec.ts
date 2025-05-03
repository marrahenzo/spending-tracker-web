import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOperationModalComponent } from './new-operation-modal.component';

describe('NewOperationModalComponent', () => {
  let component: NewOperationModalComponent;
  let fixture: ComponentFixture<NewOperationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOperationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOperationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
