import { TestBed } from '@angular/core/testing';
import { BudgetFormService } from './budget-form.service';
import { FormBuilder } from '@angular/forms';
import { BudgetService } from './budget.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('BudgetFormService', () => {
  let service: BudgetFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BudgetFormService,
        FormBuilder,
        BudgetService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
    });
    service = TestBed.inject(BudgetFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
