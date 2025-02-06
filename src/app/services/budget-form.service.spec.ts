import { TestBed } from '@angular/core/testing';

import { BudgetFormService } from './budget-form.service';

describe('BudgetFormService', () => {
  let service: BudgetFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
