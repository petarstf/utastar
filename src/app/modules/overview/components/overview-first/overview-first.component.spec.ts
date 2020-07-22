import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewFirstComponent } from './overview-first.component';

describe('OverviewFirstComponent', () => {
  let component: OverviewFirstComponent;
  let fixture: ComponentFixture<OverviewFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewFirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
