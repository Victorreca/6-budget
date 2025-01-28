import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelComponent],
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
    component.increaseNumberPages();

    expect(component.numberPages).toBe(2);
  });
  it('should return 1 if decrease number when number of pages is 1 if invokes decreaseNumberPages', () => {
    component.decreaseNumberPages();
    expect(component.numberPages).toBe(1);
  });
  it('should descrease the number of pages to 1 if the current value is 2 and decreaseNumberPages is invoked', () => {
    component.numberPages = 2;
    component.decreaseNumberPages();
    expect(component.numberPages).toBe(1);
  });
  it('should call budgetService.updatePages with the correct number of pages when increaseNumberPages is invoked', () => {
    const updatePagesSpy = spyOn(component['budgetService'], 'updatePages');
    component.increaseNumberPages();
    expect(updatePagesSpy).toHaveBeenCalledWith(2);
  });
});
