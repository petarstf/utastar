import { Injectable } from '@angular/core';
import { ITable } from '../models/table';
import { BehaviorSubject } from 'rxjs';
import { Criteria } from '../models/criteria';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private table: ITable = {
    altName: 'alt/cri',
    altVals: [],
    criteria: [],
    rank: [],
  };
  tableChanged: BehaviorSubject<ITable> = new BehaviorSubject(this.getTable());
  tableDone = false;
  constructor() { }

  newTable(): void {
    this.table = {
      altName: 'alt/cri',
      altVals: [],
      criteria: [],
      rank: [],
    };
  }

  getTable(): ITable {
    return this.table;
  }

  getData(): any[] {
    let data = [];
    data.push(this.table.altVals);

    this.table.criteria.forEach(
      (c, i) => {
        data.push(c.values);
    });
    data.push(this.table.rank);
    data = data[0].map((x, i) => data.map((x) => x[i]));

    return data;
  }

  getAlternatives(): any[] {
    return this.table.altVals;
  }

  getCriteria(): any[] {
    return this.table.criteria;
  }

  getRanks(): number[] {
    return this.table.rank;
  }

  addRandomAlternative(): void {
    this.table.altVals.push({ name: 'Alternative ' + (this.table.altVals.length + 1).toString() });
    this.table.criteria.forEach(c => {
      c.values.push(this.newRand(c.min, c.max));
    });
    const temp = new Array(this.table.altVals.length);
    for(let i = 0; i < this.table.rank.length; i++) {
      temp[i] = this.table.rank[i];
    }
    this.table.rank = temp;
    console.log(this.getRanks());
    this.tableChanged.next(this.table);
  }

  newRand(min: number, max: number): number {
    const rand = Math.random();
    // console.log(Math.floor(rand * (max - min + 1) + min), min, max, rand,);
    return Math.floor(rand * (max - min + 1) + min);
  }

  deleteAlternative(alternative) {
    console.log(this.table.altVals.slice(0, alternative), this.table.altVals.slice(alternative, this.table.altVals.length));

    this.table.altVals.slice(0, alternative).concat(this.table.altVals.slice(alternative, this.table.altVals.length));
    this.tableChanged.next(this.table);
  }

  popAlternative() {
    this.table.altVals.pop();
    this.tableChanged.next(this.table);
  }

  updateAlternatives(alternatives: {name: string, min: number, max: number}[]): void {
    this.table.altName = 'alt/cri';
    this.table.altVals = alternatives;
    this.table.criteria.forEach(c => {
      if(c.values == null || c.values.length === 0) {
        c.values = new Array(this.table.altVals.length);
      }
    });
    this.table.rank = new Array(this.table.altVals.length);


    this.table.criteria.forEach(c => {
      if(c.type === 0) {
        c.a = c.max - c.min + 1;
      }

      if(c.values.length < this.table.altVals.length) {
        c.values.push(this.newRand(c.min, c.max));
      }
    });
  }

  checkValue(row: number, column: number, value: number): boolean {
    if(this.table.criteria[column].min < value || this.table.criteria[column].max > value) {
      console.log('error');
      return false;
    }
    return true;
  }

  updateCriteria(criteria: Criteria[]): void {
    this.table.criteria = criteria;
    this.table.criteria.forEach(
      c => {
        if(c.monotonicity === 0) {
          c.best = c.max;
          c.worst = c.min;
        } else {
          c.best = c.min;
          c.worst = c.max;
        }
    });

    let difference = this.table.criteria.length;
    if(this.table.altVals) {
      difference -= this.table.altVals.length;
    }

    for(let i = 0; i < difference; i++) {
      this.table.altVals.push(
        { name: 'Alternative ' + (this.table.altVals.length + 1) }
        );
    }
    this.table.altName = 'alt/cri';

    this.table.criteria.forEach(c => {
      if(c.type === 1) {
        c.a = c.max - c.min + 1;
      }
      if(c.values == null) {
        c.values = Array.from({ length: this.table.altVals.length }, () => this.newRand(c.min, c.max));
      }
    });

    this.tableChanged.next(this.table);
  }

  updateCriteriaValues(value: number, row: number, column: number): void {
    this.table.criteria[column].values[row] = value;
    this.tableChanged.next(this.table);
  }

  updateIntervals(): void {
    this.table.criteria.forEach(
      c => {
        const min = Math.min(...c.values);
        const max = Math.max(...c.values);
        const x = (max - min) / (c.a - 1);
        let starting = min;
        const interval = [];
        for(let i = 0; i < c.a; i++) {
          interval.push(starting.toFixed(2));
          starting += x;
        }
        c.interval = interval;
      }
    );
  }

  updateRankingValues(value: number, row: number) {
    this.table.rank[row] = value;
    this.tableChanged.next(this.table);
  }

  getHeader(): string[] {
    const header =[];
    header.push(this.table.altName);
    this.table.criteria.forEach(c => {
      header.push(c.name);
    });
    header.push('ranking');

    return header;
  }

}
