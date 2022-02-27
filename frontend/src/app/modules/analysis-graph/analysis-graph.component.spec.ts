import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisGraphComponent } from './analysis-graph.component';

describe('AnalysisGraphComponent', () => {
  let component: AnalysisGraphComponent;
  let fixture: ComponentFixture<AnalysisGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
