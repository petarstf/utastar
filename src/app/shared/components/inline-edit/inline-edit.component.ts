import { Component, Input, Optional, Host, OnInit } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['inline-edit.component.scss'],
})
export class InlineEditComponent implements OnInit {

  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.comment = this._value = x;
  }
  @Input() row: number;
  @Input() column: number;

  rankingCol: number;
  min: number;
  max: number;

  private _value = '';
  disabled = false;

  comment = '';

  constructor(
    @Optional() @Host() public popover: SatPopover,
    private tableService: TableService,
    ) { }

  ngOnInit(): void {
    this.rankingCol = this.tableService.getTable().criteria.length;

    if(this.tableService.getTable().criteria.length > this.column) {
      this.min = this.tableService.getTable().criteria[this.column].min;
      this.max = this.tableService.getTable().criteria[this.column].max;
    }
    if (this.popover) {
      this.popover.closed.pipe(filter(val => val == null))
        .subscribe(() => this.comment = this.value || '');
    }
  }

  onSubmit() {
    if (this.popover) {
      this.popover.close(this.comment);
    }
  }

  checkValue(): void {
    console.log(this.tableService.getRanks().length);
    if(this.column === this.rankingCol && this.comment != null) {
      if(+this.comment > this.tableService.getRanks().length || +this.comment === 0
      || isNaN(+this.comment)) {
        this.disabled = true;
        return;
      } else if(this.tableService.getRanks().every((e) => { if(e == null) { return true; } } )) {
        if(+this.comment !== 1) {
          this.disabled = true;
          return;
        }
      } else {
        let max = 0;
        this.tableService.getRanks().forEach(rank => {
          if(rank > max) {
            max = rank;
          }
        });
        if(+this.comment > max  + 1) {
          this.disabled = true;
          return;
        }
      }
    }

    if (+this.comment < this.min ||
        +this.comment > this.max ||
        isNaN(+this.comment)) {
      this.disabled = true;
      return;
    } else {
      this.disabled = false;
    }
  }

  onCancel() {
    if(this.popover) {
      this.popover.close();
    }
  }
}
