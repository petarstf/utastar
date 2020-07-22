import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewThirdComponent } from './overview-third.component';

describe('OverviewThirdComponent', () => {
  let component: OverviewThirdComponent;
  let fixture: ComponentFixture<OverviewThirdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewThirdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
