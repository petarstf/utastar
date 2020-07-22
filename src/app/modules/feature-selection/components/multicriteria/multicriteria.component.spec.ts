import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulticriteriaComponentponent } from './multicriteria.component';

describe('MulticriteriaComponentponent', () => {
  let component: MulticriteriaComponentponent;
  let fixture: ComponentFixture<MulticriteriaComponentponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulticriteriaComponentponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulticriteriaComponentponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
