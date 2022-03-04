import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PitDataComponent } from './pit-data.component';

describe('PitDataComponent', () => {
  let component: PitDataComponent;
  let fixture: ComponentFixture<PitDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PitDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PitDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
