import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisTableComponent } from './analysis-table.component';

describe('AnalysisTableComponent', () => {
  let component: AnalysisTableComponent;
  let fixture: ComponentFixture<AnalysisTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
