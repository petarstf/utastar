import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureSelectionFormComponent } from './feature-selection-form.component';

describe('FeatureSelectionFormComponent', () => {
  let component: FeatureSelectionFormComponent;
  let fixture: ComponentFixture<FeatureSelectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureSelectionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureSelectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
