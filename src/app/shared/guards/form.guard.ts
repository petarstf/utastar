import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TableService } from '../services/table.service';

@Injectable({
  providedIn: 'root'
})
export class FormGuard implements CanActivate {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tableService: TableService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const path = next.url[0].path;
      switch (path) {
        case 'metadata':
          if(this.tableService.getCriteria() != null && this.tableService.getCriteria().length > 2) {
            return true;
          }
          this.router.navigate(['table-creation/criteria'], { relativeTo: this.route });
          return false;
        case 'alternatives':
          if(this.tableService.getCriteria() != null && this.tableService.getCriteria().length > 2) {
            return true;
          }
          this.router.navigate(['table-creation/criteria'], { relativeTo: this.route });
          return false;
        case 'multicriteria-table':
          if(this.tableService.getAlternatives() != null && this.tableService.getAlternatives().length > 0) {
            return true;
          }
          this.router.navigate(['table-creation/criteria'], { relativeTo: this.route });
          return false;
      }
  }

}
