import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewFourthComponent } from './overview-fourth.component';

describe('OverviewFourthComponent', () => {
  let component: OverviewFourthComponent;
  let fixture: ComponentFixture<OverviewFourthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewFourthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewFourthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
