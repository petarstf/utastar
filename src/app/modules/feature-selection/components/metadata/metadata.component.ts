import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/shared/services/table.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { MatTableDataSource } from '@angular/material/table';
import { Criteria } from 'src/app/shared/models/criteria';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnInit {
  displayedColumns: string[] = [];
  data: any;
  metadata: MatTableDataSource<Criteria>;


  constructor(
    private tableService: TableService,
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['Cri/Attributes', 'Monotonicity', 'Type', 'Worst', 'Best', 'A'];

    this.tableService.tableChanged.subscribe(
      data => {
        this.data = this.tableService.getCriteria();
        this.metadata = new MatTableDataSource(this.data);
      }
    );
  }

  update(el: string, column: number, row: number, comment: string) {
    if (comment == null) { return; }
    if(column !== (this.tableService.getTable().criteria.length)) {
      this.tableService.updateCriteriaValues(+comment, row, column);
    } else {
      this.tableService.updateRankingValues(+comment, row);
    }
  }

  onNext(): void {
    console.log('metadata table', this.tableService.getTable());
    this.router.navigate(['../alternatives'], { relativeTo: this.route });
  }


}
