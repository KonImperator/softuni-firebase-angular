import { Component, Input, OnDestroy, OnInit, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnimeList, Pagination } from 'src/app/api/interfaces/anime';
import { WINDOW } from '../window.token';

interface Page {
  isCurrentPage: boolean;
  page: number;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() animeList: AnimeList;
  currentRoute: string = this.stripQueryParams(this.router.url);
  routeSubscription: Subscription;

  constructor(private router: Router, @Inject(WINDOW) private window: Window ){}

  ngOnInit(): void {
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.stripQueryParams(this.router.url);
        this.window.scrollTo(0, 0)
      }
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
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
    for (let i = currPage - 6; i <= currPage + 6; i++) {
      if (i >= 1 && i <= lastPage) {
        pages.push({ isCurrentPage: currPage === i, page: i });
      }
    }
    return pages;
  }
}
