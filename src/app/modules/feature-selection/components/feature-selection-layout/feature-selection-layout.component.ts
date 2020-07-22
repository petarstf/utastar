import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TableService } from 'src/app/shared/services/table.service';

@Component({
  selector: 'app-feature-selection-layout',
  templateUrl: './feature-selection-layout.component.html',
  styleUrls: ['./feature-selection-layout.component.scss']
})
export class FeatureSelectionLayoutComponent implements OnInit {
  steps: string[] = ['criteria', 'metadata', 'alternatives', 'multicriteria-table'];
  buttons: string[] = [];
  url: string = this.steps[0];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tableService: TableService,
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(
      e => {
        if(e instanceof NavigationEnd) {
          this.url = (e.urlAfterRedirects.split('/')[e.urlAfterRedirects.split('/').length-1]);
        }
      }
    )
  }

  checkPage(i: number): string {
    if(this.url === this.steps[i]) {
      return 'primary';
    }
    return '';
  }

  onTab(index: number): void {
    this.router.navigate([this.steps[index]], { relativeTo: this.route });
  }

  checkIfFilled(index: number): boolean {
    switch (index) {
      case 0:
        return false;
      case 1:
        if(this.tableService.getCriteria() != null && this.tableService.getCriteria().length > 0) {
          return false;
        }
        return true;
      case 2:
        if(this.tableService.getAlternatives() != null && this.tableService.getAlternatives().length > 0) {
          return false;
        }
        return true;
      case 3:
        if(this.tableService.getCriteria() != null && this.tableService.getCriteria().length > 0 &&
        this.tableService.getAlternatives() != null && this.tableService.getAlternatives().length > 0) {
          return false;
        }
        return true;
      default:
        break;
    }
  }
}
