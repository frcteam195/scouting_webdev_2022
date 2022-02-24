import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamGraphComponent } from './team-graph.component';

describe('TeamGraphComponent', () => {
  let component: TeamGraphComponent;
  let fixture: ComponentFixture<TeamGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
