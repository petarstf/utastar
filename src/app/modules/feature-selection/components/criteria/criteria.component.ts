import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TableService } from 'src/app/shared/services/table.service';
import { Criteria } from 'src/app/shared/models/criteria';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit {
  form: FormGroup;
  criteria: FormArray;
  criteriaType = [{ id: 0, name: 'qualitative'}, { id: 1, name: 'quantitative'}];
  monotonicity = [{ id: 1, name: 'The lower value is best'}, { id: 0, name: 'The higher value is best'}];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tableService: TableService,

  ) { }

  ngOnInit(): void {
    this.tableService.tableDone = false;
    this.initForm();

  }

  initCriteria(): void {
    this.criteria = new FormArray([]);
    if(this.tableService.getCriteria().length > 0) {
      this.tableService.getCriteria().forEach(c => {
        this.criteria.push( new FormGroup({
          name: new FormControl(c.name, [Validators.required]),
          type: new FormControl(c.type, [Validators.required]),
          monotonicity: new FormControl(c.monotonicity, [Validators.required]),
          a: new FormControl(c.a, [Validators.required]),
          values: new FormControl(c.values, [ Validators.required ]),
          min: new FormControl(c.min, [Validators.required, Validators.max(c.max - 1)]),
          max: new FormControl(c.max, [Validators.required, Validators.min(c.min + 1)]),
        }));
      });
    } else {
      this.onAddCriteria();
      this.onAddCriteria();
      this.onAddCriteria();
    }
  }

  initForm(): void {
    this.initCriteria();

    this.form = this.fb.group({
      criteria: this.criteria
    });
  }

  onAddCriteria(): void {
    const min = Math.floor(Math.random() * 10);
    const max = Math.floor(Math.random() * 10 + min + 1);
    this.criteria.push(
      new FormGroup({
        name: new FormControl('Criterion ' + (this.criteria.length + 1).toString(), [ Validators.required ]),
        type: new FormControl(0, [ Validators.required ]),
        monotonicity: new FormControl(1, [Validators.required]),
        a: new FormControl(max - min, [Validators.required]),
        values: new FormControl(null, [ Validators.required ]),
        min: new FormControl(min, [Validators.required, Validators.max(max - 1)]),
        max: new FormControl(max, [Validators.required, Validators.min(min + 1)]),
      })
    );
  }

  onDeleteFeature(index: number) {
    this.criteria.removeAt(index);
  }

  onNext(): void {
    this.tableService.updateCriteria(this.form.value.criteria);
    this.router.navigate(['../metadata'], { relativeTo: this.route });
  }

  onNumberPointsChange(e, i: number): void {
    if(e.target.value < 3) {
      e.target.value = 3;
      this.form.get(['criteria', i, 'a']).patchValue(3);
    } else if(e.target.value > 99) {
      e.target.value = 99;
      this.form.get(['criteria', i, 'a']).patchValue(99);
    }
  }

  checkMinMax(i: number, max: boolean) {
    if(max) {
      if(this.form.get(['criteria', i, 'max']).value > this.form.get(['criteria', i, 'min']).value) {
        return true;
      }
      return false;
    }
    if(this.form.get(['criteria', i, 'max']).value < this.form.get(['criteria', i, 'min']).value) {
      return true;
    }
    return false;
  }

}
