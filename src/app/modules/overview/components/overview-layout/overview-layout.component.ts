import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { ResponseElement } from 'src/app/shared/models/responseElement';
import { TableService } from 'src/app/shared/services/table.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-overview-layout',
  templateUrl: './overview-layout.component.html',
  styleUrls: ['./overview-layout.component.scss']
})
export class OverviewLayoutComponent implements OnInit, OnDestroy {
  data: ResponseElement[] = null;
  topResults: string[] = [
    'number of alternatives',
    'number of criteria',
    'multicriteria matrix',
    'user ranking',
    'the intervals',
  ];
  utilitiesIndices: number[] = [15, 16, 17, 18, 19];
  topElements: ResponseElement[] = [];
  textResponse = null;
  utilities: ResponseElement[] = [];
  weights: ResponseElement[] = [];
  alternatives: string[] = [];
  alts: string[];
  crits: string[];
  criteria: string[] = [];
  loading = true;

  tableDone = false;

  marginalLabels: any[];
  marginals: number[];

  timer;


  constructor(
    private httpService: HttpService,
    private tableService: TableService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.tableDone = this.tableService.tableDone;
    if(this.tableDone) {
      this.getData();
      this.alts = this.tableService.getAlternatives().map(el => el.name);
      this.crits = this.tableService.getCriteria().map(c => c.name);
    } else {
      this.timer = setTimeout(() => {
        this.router.navigate(['../table-creation/criteria']);
      }, 5000);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  getData(): void {
    this.textResponse = this.tableService.getTable();
    this.httpService.postTable(this.tableService.getTable()).subscribe(
      data => {
        console.log('response', data);
        this.data = data;
        this.getCriteria();
        this.getTopResults();
        this.getUtilities();
        this.getWeights();
        this.getMarginals();
      },
      err => { console.log(err); },
      () => {
        this.loading = false;
      }
    );
  }

  getMarginals(): void {

    let marginals;
    this.data.forEach(
      (element) => {
        if(element.title != null && element.title.trim().toLowerCase().includes('marginal utility')) {
          marginals = element.value;
        }
      }
    );
    let start = 0;
    const marginalValues = [];
    const marginalLabels = [];
    // console.log(marginals);
    this.tableService.getCriteria().forEach(c => {
      marginalValues.push(marginals[1].slice(start, start + c.interval.length));
      marginalLabels.push(marginals[0].slice(start, start + c.interval.length));
      start += c.interval.length;
    });

    // console.log('MarginalValues:', marginalValues);
    this.marginals = marginalValues;
    this.marginalLabels = marginalLabels;
  }

  getTopResults(): void {
    this.data.forEach(element => {
      if(element.title != null && this.topResults.includes(element.title.toLowerCase())) {
        this.topElements.push(element);
      }
    });
  }

  getUtilities(): void {
    this.data.forEach(
      (element, i) =>  {
        if(element.title != null && element.title.includes('U[g(')) {
          this.utilities.push(element);
        }
      }
    );
  }

  getWeights(): void {
    this.data.forEach(
      element => {
        if(element.title != null && element.title.includes('u(g)')) {
          this.weights.push(element);
        }
      }
    );
  }

  getAlternatives(): void {
    this.data[0].value.forEach(v => {
      this.alternatives.push(v);
    });
  }

  getCriteria(): void {
    this.data[1].value.forEach(v => {
      this.criteria.push(v);
    });
  }

  getMarginalUtility(criteriaIndex: number, criteriaA: number): void {
    this.data.forEach(
      (element, i) => {
        if(element.title != null && element.title.trim().toLowerCase().includes('marginalutility')) {
          return [element.value[0][criteriaA], element.value[1][criteriaA]];
        }
      }
    );
  }

}
