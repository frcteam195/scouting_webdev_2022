import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelTwoComponent } from './level-two.component';

describe('LevelTwoComponent', () => {
  let component: LevelTwoComponent;
  let fixture: ComponentFixture<LevelTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
