import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TableService } from 'src/app/shared/services/table.service';

@Component({
  selector: 'app-overview-first',
  templateUrl: './overview-first.component.html',
  styleUrls: ['./overview-first.component.scss']
})
export class OverviewFirstComponent implements OnInit {
  @Input() data: any = null;

  displayedColumns: string[] = null;
  dataSource: any = null;
  matrixData: any = null;

  constructor(
    private tableService: TableService,
  ) { }

  ngOnInit(): void {
    let temp = [];
    this.displayedColumns = this.tableService.getHeader();
    this.dataSource = this.tableService.getData();
    console.log(this.data);
    // this.data.forEach(
    //   (d, i) => {
    //     if(i == 1) {
    //       this.displayedColumns = d.value;
    //     }
    //     if(i == 2) {
    //       d.value.forEach(
    //         (a, j) => {
    //           temp.push(a.concat(this.data[3].value[j]));
    //         }
    //       );
    //     }
    // });
    this.matrixData = temp;
    console.log(this.matrixData);
    console.log(this.displayedColumns);
  }

  checkIfString(input: any): boolean {
    return typeof(input) === 'string';
  }



}
