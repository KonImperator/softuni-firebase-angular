import { Component, Input, OnDestroy, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AnimeList, Pagination } from 'src/app/api/interfaces/anime';
import { WINDOW } from '../window.token';

interface Page {
  isCurrentPage: boolean;
  params: any;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() animeList: AnimeList;
  currentRoute: string = this.stripQueryParams(this.router.url);
  queryParams: any;
  pageDistance: number = 3;
  unsubscribe: Subject<void> = new Subject();

  constructor(private route: ActivatedRoute, private router: Router, @Inject(WINDOW) private window: Window ){}

  ngOnInit(): void {
    this.router.events
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.stripQueryParams(this.router.url);
        this.window.scrollTo(0, 0);
      }
    })

    this.route.queryParams
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((params) => { this.queryParams = params });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getPageParams(type: 'next' | 'prev' | 'first' | 'last' | 'current', page?: number) {
    const outputs = {
      'first': {...this.queryParams, p: 1},
      'next': {...this.queryParams, p: this.animeList.pagination.current_page + 1},
      'prev': {...this.queryParams, p: this.animeList.pagination.current_page - 1},
      'last': {...this.queryParams, p: this.animeList.pagination.last_visible_page},
      'current': {...this.queryParams, p: page}
    }
    return outputs[type]
  }

  stripQueryParams(route: string) {
    if (route.includes('?')){
      return route.split('?')[0];
    }
    return route;
  }

  generatePages(pagination: Pagination): Page[] {
    const currPage = pagination.current_page;
    const lastPage = pagination.last_visible_page;
    
    const pages = [];

    for (let i = currPage - this.pageDistance; i <= currPage + this.pageDistance; i++) {
      if (i >= 1 && i <= lastPage) {
        pages.push({ isCurrentPage: currPage === i, params: this.getPageParams('current', i) });
      }
    }
    return pages;
  }
}
