import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeampickComponent } from './teampick.component';

describe('TeampickComponent', () => {
  let component: TeampickComponent;
  let fixture: ComponentFixture<TeampickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeampickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeampickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
