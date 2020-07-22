import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TableService } from 'src/app/shared/services/table.service';

@Component({
  selector: 'app-alternatives',
  templateUrl: './alternatives.component.html',
  styleUrls: ['./alternatives.component.scss']
})
export class AlternativesComponent implements OnInit {
  form: FormGroup;
  alternatives: FormArray = new FormArray([]);
  minNumber: number = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tableService: TableService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.minNumber = this.tableService.getTable().criteria.length;

    this.tableService.tableChanged.subscribe(
      data => {
        const temp = new FormArray([]);
        data.altVals.forEach(alt => {
          temp.push(
            new FormGroup({
              name: new FormControl(alt.name, [Validators.required])
            })
          );
        });
      }
    );
  }

  initAlternatives(): void {
    if(this.tableService.getAlternatives()) {
      this.tableService.getTable().altVals.forEach(alt => {
        this.alternatives.push(new FormGroup({
          name: new FormControl(alt.name, [ Validators.required ]),
        }));
      });
    } else {
      this.tableService.getTable().criteria.forEach(
        cr => {
          this.onAddAlternative();
        }
      );
    }
  }

  initForm(): void {
    this.initAlternatives();

    this.form = this.fb.group({
      alternatives: this.alternatives
    });
  }

  onAddAlternative(): void {
    // this.tableService.addRandomAlternative();
    this.alternatives.push(
      new FormGroup({
        name: new FormControl('Alternative ' + (this.alternatives.length + 1).toString(), [ Validators.required ]),
      })
    );
  }

  onRemoveAlternative(index: number): void {
    this.alternatives.removeAt(index);
  }

  onAddRandomAlternative(): void {
    this.tableService.getTable().altVals.push(
      { name: 'Alternative ' + (this.alternatives.length + 1) }
    );

    if(this.alternatives.length > 0) {
      this.alternatives.push(
        new FormGroup({
          name: new FormControl('Alternative ' + (this.alternatives.length + 1), [Validators.required]),
        })
      );
    }
  }

  onNext(): void {
    this.tableService.updateAlternatives(this.form.get('alternatives').value);
    // console.log('alternatives table', this.tableService.getTable());
    this.router.navigate(['../multicriteria-table'], { relativeTo: this.route });
  }
}
