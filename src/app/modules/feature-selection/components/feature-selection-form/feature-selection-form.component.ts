import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-feature-selection-form',
  templateUrl: './feature-selection-form.component.html',
  styleUrls: ['./feature-selection-form.component.scss']
})
export class FeatureSelectionFormComponent implements OnInit {
  featureForm: FormGroup;
  featureTypes: string[] = ['Qualitative', 'Quantative'];
  features;


  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.features = this.featureForm.value.features;
  }

  initForm(): void {
    this.featureForm = this.fb.group({
      features: new FormArray([
        new FormGroup({
          featureName: new FormControl(null, [ Validators.required ]),
          featureType: new FormControl(null, [ Validators.required ]),
        })
      ])
    });
  }

  onAddFeature(): void {
    (this.featureForm.get('features') as FormArray).push(
      new FormGroup({
        featureName: new FormControl(null, [ Validators.required ]),
        featureType: new FormControl(null, [ Validators.required ]),
      })
    );
  }

  onSubmit(): void {

  }
}
