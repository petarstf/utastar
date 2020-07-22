import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TableService } from 'src/app/shared/services/table.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tableService: TableService,
  ) { }

  ngOnInit(): void {
    console.log(this.route);
  }

  onHome(): void {
    this.router.navigate(['']);
  }
  onNewTable(): void {
    this.tableService.newTable();
    this.router.navigate(['/table-creation/'], { relativeTo: this.route});
  }
  onOverview(): void {
    this.router.navigate(['/overview'], { relativeTo: this.route });
  }
}
