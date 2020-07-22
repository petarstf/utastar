import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/shared/services/table.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-multicriteria',
  templateUrl: './multicriteria.component.html',
  styleUrls: ['./multicriteria.component.scss']
})
export class MulticriteriaComponent implements OnInit {
  data: any;
  displayedColumns: string[] = [];
  dataSource: any;
  allFilled = false;

  criteriaLength: number;
  altLength: number;

  clickedRow: number;
  clickedColumn: number;

  constructor(
    private tableService: TableService,
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.tableService.tableChanged.subscribe(
      data => {
        this.getData();
        this.data = this.tableService.getData();
        this.criteriaLength = this.tableService.getTable().criteria.length;
        this.altLength = this.tableService.getAlternatives().length;
      }
    );

    this.displayedColumns = this.tableService.getHeader();
  }

  getData(): any {
    this.dataSource = this.tableService.getData();
  }

  update(el: string, column: number, row: number, comment: string) {
    this.clickedColumn = column;
    this.clickedRow = row;
    if (comment == null) { return; }
    if(column !== (this.tableService.getTable().criteria.length)) {
      this.tableService.updateCriteriaValues(+comment, row, column);
    } else {
      this.tableService.updateRankingValues(+comment, row);
    }
    this.checkValues();
  }

  checkValues(): void {
    const criteria = this.tableService.getCriteria();
    const ranks = this.tableService.getRanks();
    criteria.forEach(
      (c, i) => {
        if(c.values.includes(undefined) || ranks.includes(undefined)) {
          this.allFilled = false;
          return;
        } else if((i === (criteria.length - 1)) && ranks.length > 0) {
          this.allFilled = true;
        }
      }
    );
  }

  onNext(): void {
    this.tableService.updateIntervals();
    // console.log(this.tableService.getTable());
    this.tableService.tableDone = true;
    this.router.navigate(['../../overview'], { relativeTo: this.route });
  }

  onAddRandomAlternative(): void {
    this.tableService.addRandomAlternative();
    this.checkValues();
  }

  popAlternative(): void {
    this.tableService.popAlternative();
    this.checkValues();
  }

}
