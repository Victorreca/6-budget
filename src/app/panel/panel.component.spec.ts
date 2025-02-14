import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComponent } from './panel.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { BudgetFormService } from '../services/budget-form.service';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelComponent],
      providers: [
        BudgetFormService,
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
    }).compileComponents();

    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return 1', () => {
    expect(component.numberPages).toBe(1);
  });
  it('should increase the number of pages to 2 if invokes increaseNumberPages', () => {
    component.changeNumber('numberPages', 'increase');

    expect(component.numberPages).toBe(2);
  });
  it('should return 1 if decrease number when number of pages is 1 if invokes decreaseNumberPages', () => {
    component.changeNumber('numberPages', 'decrease');
    expect(component.numberPages).toBe(1);
  });
  it('should descrease the number of pages to 1 if the current value is 2 and decreaseNumberPages is invoked', () => {
    component.numberPages = 2;
    component.changeNumber('numberPages', 'decrease');
    expect(component.numberPages).toBe(1);
  });
});
