import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureSelectionLayoutComponent } from './feature-selection-layout.component';

describe('FeatureSelectionLayoutComponent', () => {
  let component: FeatureSelectionLayoutComponent;
  let fixture: ComponentFixture<FeatureSelectionLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureSelectionLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureSelectionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
