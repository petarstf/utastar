import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSecondComponent } from './overview-second.component';

describe('OverviewSecondComponent', () => {
  let component: OverviewSecondComponent;
  let fixture: ComponentFixture<OverviewSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
