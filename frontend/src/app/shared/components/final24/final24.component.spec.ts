import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Final24Component } from './final24.component';

describe('Final24Component', () => {
  let component: Final24Component;
  let fixture: ComponentFixture<Final24Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Final24Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Final24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
